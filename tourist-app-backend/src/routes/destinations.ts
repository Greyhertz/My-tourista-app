import { Hono } from 'hono';
import { optionalAuth } from '../middleware/auth';
import { db } from '../db/index';
import { destinations, hotels } from '../db/schema';
import { eq } from 'drizzle-orm';
import { searchPlaces, getPlaceDetailsRich,
  getNearbyPlaces,
  getFeaturedDestinationsWithImages,
  clearCache,
  PlaceSearchResult,
  FeaturedDestination, } from '../services/geoapify';

const router = new Hono();

// ============ FEATURED DESTINATIONS ============
// Get rotating featured destinations (different every 24 hours)
destinationsRouter.get('/featured', optionalAuth, async (c) => {
  try {
    const featured = await getFeaturedDestinationsWithImages(6);
    return c.json({
      success: true,
      data: featured,
      rotatesAt: getNextRotationTime(),
    });
  } catch (error) {
    console.error('Featured destinations error:', error);
    return c.json(
      { success: false, error: 'Failed to fetch featured destinations' },
      500
    );
  }
});

// ============ SEARCH & AUTOCOMPLETE ============
// Live autocomplete as user types
destinationsRouter.get('/autocomplete', optionalAuth, async (c) => {
  const q = c.req.query('q') || '';
  const limit = parseInt(c.req.query('limit') || '10');

  if (q.length < 2) {
    return c.json({ success: true, suggestions: [] });
  }

  try {
    const suggestions = await searchPlaces(q, limit);
    return c.json({
      success: true,
      suggestions: formatSuggestions(suggestions),
    });
  } catch (error) {
    console.error('Autocomplete error:', error);
    return c.json(
      { success: false, error: 'Autocomplete failed' },
      500
    );
  }
});

// Search destinations (hit enter)
destinationsRouter.get('/search', optionalAuth, async (c) => {
  const query = c.req.query('q') || '';
  const limit = parseInt(c.req.query('limit') || '12');

  if (!query) {
    return c.json({
      success: false,
      error: 'Query parameter required',
    }, 400);
  }

  try {
    const results = await searchPlaces(query, limit);

    // Fetch details for each result
    const withDetails = await Promise.all(
      results.slice(0, 6).map(async (place) => ({
        ...place,
        details: await getPlaceDetailsRich(place.lat, place.lon),
      }))
    );

    return c.json({
      success: true,
      count: withDetails.length,
      results: withDetails,
    });
  } catch (error) {
    console.error('Search error:', error);
    return c.json(
      { success: false, error: 'Search failed' },
      500
    );
  }
});

// ============ DESTINATION DETAILS ============
// Get rich details for a specific destination
destinationsRouter.get('/details', optionalAuth, async (c) => {
  const lat = parseFloat(c.req.query('lat') || '');
  const lon = parseFloat(c.req.query('lon') || '');

  if (!lat || !lon) {
    return c.json(
      { success: false, error: 'lat and lon required' },
      400
    );
  }

  try {
    const details = await getPlaceDetailsRich(lat, lon);

    if (!details) {
      return c.json(
        { success: false, error: 'Location not found' },
        404
      );
    }

    return c.json({
      success: true,
      destination: details,
    });
  } catch (error) {
    console.error('Details error:', error);
    return c.json(
      { success: false, error: 'Failed to fetch details' },
      500
    );
  }
});

// ============ NEARBY AMENITIES ============
// Get nearby places - restaurants, hotels, attractions, etc.
destinationsRouter.get('/nearby', optionalAuth, async (c) => {
  const lat = parseFloat(c.req.query('lat') || '');
  const lon = parseFloat(c.req.query('lon') || '');
  const radius = parseInt(c.req.query('radius') || '5000');
  const type = c.req.query('type') || 'all'; // all, restaurants, hotels, attractions, etc.

  if (!lat || !lon) {
    return c.json(
      { success: false, error: 'lat and lon required' },
      400
    );
  }

  try {
    const categories = getCategoriesForType(type);
    const nearby = await getNearbyPlaces(lat, lon, radius, categories);

    return c.json({
      success: true,
      count: nearby.length,
      radius,
      type,
      results: nearby,
    });
  } catch (error) {
    console.error('Nearby error:', error);
    return c.json(
      { success: false, error: 'Failed to fetch nearby places' },
      500
    );
  }
});

// ============ DATABASE OPERATIONS ============
// List all destinations from database (with caching)
destinationsRouter.get('/', optionalAuth, async (c) => {
  try {
    const allDestinations = await db.select().from(destinations);

    const parsed = allDestinations.map((d) => ({
      ...d,
      highlights: typeof d.highlights === 'string' 
        ? JSON.parse(d.highlights) 
        : d.highlights,
    }));

    return c.json({
      success: true,
      count: parsed.length,
      destinations: parsed,
    });
  } catch (error) {
    console.error('List destinations error:', error);
    return c.json(
      { success: false, error: 'Failed to fetch destinations' },
      500
    );
  }
});

// Get single destination with hotels and amenities
destinationsRouter.get('/:id', optionalAuth, async (c) => {
  const id = c.req.param('id');

  try {
    const [destination] = await db
      .select()
      .from(destinations)
      .where(eq(destinations.id, id));

    if (!destination) {
      return c.json(
        { success: false, error: 'Destination not found' },
        404
      );
    }

    // Get hotels from database
    const destinationHotels = await db
      .select()
      .from(hotels)
      .where(eq(hotels.destinationId, id));

    // Get nearby places from Geoapify (enriched data)
    const nearbyRestaurants = await getNearbyPlaces(
      destination.latitude,
      destination.longitude,
      3000,
      ['catering.restaurant', 'catering.cafe']
    );

    const nearbyAttractions = await getNearbyPlaces(
      destination.latitude,
      destination.longitude,
      5000,
      ['tourism.attraction', 'leisure.park']
    );

    return c.json({
      success: true,
      destination: {
        ...destination,
        highlights: typeof destination.highlights === 'string'
          ? JSON.parse(destination.highlights)
          : destination.highlights,
      },
      hotels: destinationHotels.map((h) => ({
        ...h,
        images: typeof h.images === 'string' 
          ? JSON.parse(h.images) 
          : h.images,
        amenities: typeof h.amenities === 'string'
          ? JSON.parse(h.amenities)
          : h.amenities,
      })),
      nearby: {
        restaurants: nearbyRestaurants.slice(0, 8),
        attractions: nearbyAttractions.slice(0, 8),
      },
    });
  } catch (error) {
    console.error('Get destination error:', error);
    return c.json(
      { success: false, error: 'Failed to fetch destination' },
      500
    );
  }
});

// ============ ADMIN: CACHE MANAGEMENT ============
destinationsRouter.post('/admin/cache-clear', optionalAuth, async (c) => {
  // Optional: Add auth check here
  try {
    clearCache();
    return c.json({ success: true, message: 'Cache cleared' });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to clear cache' }, 500);
  }
});

// ============ HELPERS ============
function getCategoriesForType(type: string): string[] {
  const categoryMap: { [key: string]: string[] } = {
    restaurants: ['catering.restaurant', 'catering.cafe', 'catering.fast_food'],
    hotels: ['accommodation.hotel', 'accommodation.hostel'],
    attractions: ['tourism.attraction', 'tourism.museum', 'leisure.park'],
    shopping: ['shop.supermarket', 'shop.mall'],
    transport: ['public_transport.bus_stop', 'public_transport.train_station'],
    healthcare: ['healthcare.doctor', 'healthcare.hospital'],
    all: [
      'catering.restaurant',
      'accommodation.hotel',
      'tourism.attraction',
      'leisure.park',
    ],
  };

  return categoryMap[type] || categoryMap.all;
}

function formatSuggestions(results: PlaceSearchResult[]) {
  return results.map((r) => ({
    id: r.id,
    name: r.name,
    location: [r.city, r.state, r.country].filter(Boolean).join(', '),
    formatted: r.formatted,
    lat: r.lat,
    lon: r.lon,
    type: r.type,
  }));
}

function getNextRotationTime(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.toISOString();
}

export default destinationsRouter;
