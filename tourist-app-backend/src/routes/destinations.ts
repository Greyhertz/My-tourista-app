import { Hono } from 'hono';
import { optionalAuth } from '../middleware/auth';
import { db } from '../db/index';
import { destinations, hotels } from '../db/schema';
import { eq } from 'drizzle-orm';
import {
  searchPlaces,
  getPlaceDetailsRich,
  getNearbyPlaces,
  getAllAmenities,
  getFeaturedDestinationsWithImages,
  clearCache,
  type PlaceSearchResult,
  type FeaturedDestination,
} from '../services/geoapify';

const destinationsRouter = new Hono();

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatSuggestions(results: PlaceSearchResult[]) {
  return results.map((r) => ({
    id:        r.id,
    name:      r.name,
    location:  [r.city, r.state, r.country].filter(Boolean).join(', '),
    formatted: r.formatted,
    lat:       r.lat,
    lon:       r.lon,
    type:      r.type,
  }));
}

function getNextRotationTime(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.toISOString();
}

function getCategoriesForType(type: string): string[] {
  const map: Record<string, string[]> = {
    restaurants: ['catering.restaurant', 'catering.cafe', 'catering.fast_food'],
    hotels:      ['accommodation.hotel', 'accommodation.hostel'],
    attractions: ['tourism.attraction', 'tourism.sights.museum', 'leisure.park'],
    shopping:    ['commercial.shopping_mall', 'commercial.supermarket'],
    transport:   ['public_transport.bus', 'public_transport.train'],
    healthcare:  ['healthcare.hospital', 'healthcare.clinic', 'healthcare.pharmacy'],
    all:         ['catering.restaurant', 'accommodation.hotel', 'tourism.attraction', 'leisure.park'],
  };
  return map[type] ?? map.all;
}

/** Returns coords if id is geo_LAT_LON, otherwise null (DB id) */
function parseGeoId(id: string): { lat: number; lon: number } | null {
  const m = id.match(/^geo_(-?\d+\.?\d*)_(-?\d+\.?\d*)$/);
  if (!m) return null;
  return { lat: parseFloat(m[1]), lon: parseFloat(m[2]) };
}

// ─── GET /destinations/debug ─────────────────────────────────────────────────
// Hit this in your browser: http://localhost:PORT/destinations/debug
// You should see env var status and a sample featured destination.
destinationsRouter.get('/debug', async (c) => {
  const geoKey     = process.env.GEOAPIFY_API_KEY;
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;

  // Try fetching one featured city to verify the full pipeline
  let sampleFeatured: any = null;
  let featuredError: string | null = null;
  try {
    const results = await getFeaturedDestinationsWithImages(1);
    sampleFeatured = results[0] ?? null;
  } catch (e: any) {
    featuredError = e?.message ?? String(e);
  }

  return c.json({
    status: 'ok',
    env: {
      GEOAPIFY_API_KEY:    geoKey     ? `set (${geoKey.slice(0, 6)}...)` : 'MISSING ← set this in .env',
      UNSPLASH_ACCESS_KEY: unsplashKey ? `set (${unsplashKey.slice(0, 6)}...)` : 'MISSING ← set this in .env',
    },
    sampleFeatured,
    featuredError,
    instructions: [
      '1. Copy all service files to server/src/services/',
      '2. Copy destinations.ts to server/src/routes/',
      '3. In your main app: app.route("/destinations", destinationsRouter)',
      '4. Add GEOAPIFY_API_KEY and UNSPLASH_ACCESS_KEY to .env',
    ],
  });
});

// ─── GET /destinations/featured ──────────────────────────────────────────────
destinationsRouter.get('/featured', optionalAuth, async (c) => {
  try {
    const featured = await getFeaturedDestinationsWithImages(9);
    return c.json({ success: true, data: featured, rotatesAt: getNextRotationTime() });
  } catch (error) {
    console.error('[featured]', error);
    return c.json({ success: false, error: 'Failed to fetch featured destinations' }, 500);
  }
});

// ─── GET /destinations/autocomplete?q= ───────────────────────────────────────
destinationsRouter.get('/autocomplete', optionalAuth, async (c) => {
  const q     = (c.req.query('q') || '').trim();
  const limit = parseInt(c.req.query('limit') || '8');

  if (q.length < 1) return c.json({ success: true, suggestions: [] });

  try {
    const results     = await searchPlaces(q, limit);
    const suggestions = formatSuggestions(results);
    return c.json({ success: true, suggestions });
  } catch (error) {
    console.error('[autocomplete]', error);
    return c.json({ success: false, suggestions: [] });
  }
});

// ─── GET /destinations/search?q= ─────────────────────────────────────────────
destinationsRouter.get('/search', optionalAuth, async (c) => {
  const query = (c.req.query('q') || '').trim();
  const limit = parseInt(c.req.query('limit') || '8');

  if (!query) return c.json({ success: false, error: 'Query required' }, 400);

  try {
    const raw = await searchPlaces(query, limit);
    const results = await Promise.all(
      raw.slice(0, 6).map(async (place) => ({
        ...place,
        details: await getPlaceDetailsRich(place.lat, place.lon).catch(() => null),
      }))
    );
    return c.json({ success: true, count: results.length, results });
  } catch (error) {
    console.error('[search]', error);
    return c.json({ success: false, error: 'Search failed' }, 500);
  }
});

// ─── GET /destinations/nearby?lat=&lon=&radius=&type= ────────────────────────
destinationsRouter.get('/nearby', optionalAuth, async (c) => {
  const lat    = parseFloat(c.req.query('lat') || '');
  const lon    = parseFloat(c.req.query('lon') || '');
  const radius = parseInt(c.req.query('radius') || '5000');
  const type   = c.req.query('type') || 'all';

  if (isNaN(lat) || isNaN(lon)) {
    return c.json({ success: false, error: 'lat and lon required' }, 400);
  }

  try {
    const categories = getCategoriesForType(type);
    const nearby     = await getNearbyPlaces(lat, lon, radius, categories);
    return c.json({ success: true, count: nearby.length, radius, type, results: nearby });
  } catch (error) {
    console.error('[nearby]', error);
    return c.json({ success: false, error: 'Failed to fetch nearby places' }, 500);
  }
});

// ─── GET /destinations/details?lat=&lon= ─────────────────────────────────────
destinationsRouter.get('/details', optionalAuth, async (c) => {
  const lat = parseFloat(c.req.query('lat') || '');
  const lon = parseFloat(c.req.query('lon') || '');

  if (isNaN(lat) || isNaN(lon)) {
    return c.json({ success: false, error: 'lat and lon required' }, 400);
  }

  try {
    const details = await getPlaceDetailsRich(lat, lon);
    if (!details) return c.json({ success: false, error: 'Location not found' }, 404);
    return c.json({ success: true, destination: details });
  } catch (error) {
    console.error('[details]', error);
    return c.json({ success: false, error: 'Failed to fetch details' }, 500);
  }
});

// ─── GET /destinations (DB list) ─────────────────────────────────────────────
destinationsRouter.get('/', optionalAuth, async (c) => {
  try {
    const all    = await db.select().from(destinations);
    const parsed = all.map((d) => ({
      ...d,
      highlights: typeof d.highlights === 'string' ? JSON.parse(d.highlights) : d.highlights,
    }));
    return c.json({ success: true, count: parsed.length, destinations: parsed });
  } catch (error) {
    console.error('[list]', error);
    return c.json({ success: false, error: 'Failed to fetch destinations' }, 500);
  }
});

// ─── GET /destinations/:id ────────────────────────────────────────────────────
destinationsRouter.get('/:id', optionalAuth, async (c) => {
  const id     = c.req.param('id');
  const coords = parseGeoId(id);

  // Case 1: geo_LAT_LON — live Geoapify destination (wiki + unsplash + all amenities)
  if (coords) {
    try {
      const { lat, lon } = coords;
      // getPlaceDetailsRich now calls Wikipedia + Unsplash internally
      // getAllAmenities fetches all 14 category groups in parallel
      const [details, amenities] = await Promise.all([
        getPlaceDetailsRich(lat, lon),
        getAllAmenities(lat, lon, 10000),
      ]);

      if (!details) return c.json({ success: false, error: 'Location not found' }, 404);

      return c.json({
        success:     true,
        destination: { ...details, id },
        hotels:      [],
        amenities,
      });
    } catch (err) {
      console.error('[/:id geo]', err);
      return c.json({ success: false, error: 'Failed to load destination' }, 500);
    }
  }

  // Case 2: DB destination
  try {
    const [destination] = await db
      .select()
      .from(destinations)
      .where(eq(destinations.id, id));

    if (!destination) {
      return c.json({ success: false, error: 'Destination not found' }, 404);
    }

    const [destinationHotels, amenities] = await Promise.all([
      db.select().from(hotels).where(eq(hotels.destinationId, id)),
      getAllAmenities(destination.longitude, destination.latitude, 10000),
    ]);

    return c.json({
      success:     true,
      destination: {
        ...destination,
        highlights: typeof destination.highlights === 'string'
          ? JSON.parse(destination.highlights)
          : destination.highlights,
      },
      hotels: destinationHotels.map((h) => ({
        ...h,
        images:    typeof h.images    === 'string' ? JSON.parse(h.images)    : h.images,
        amenities: typeof h.amenities === 'string' ? JSON.parse(h.amenities) : h.amenities,
      })),
      amenities,
    });
  } catch (error) {
    console.error('[/:id db]', error);
    return c.json({ success: false, error: 'Failed to fetch destination' }, 500);
  }
});

// ─── POST /destinations/admin/cache-clear ────────────────────────────────────
destinationsRouter.post('/admin/cache-clear', optionalAuth, async (c) => {
  try {
    clearCache();
    return c.json({ success: true, message: 'Cache cleared' });
  } catch {
    return c.json({ success: false, error: 'Failed to clear cache' }, 500);
  }
});

export default destinationsRouter;