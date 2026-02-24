// // src/routes/destinations.ts
// import { Hono } from 'hono';
// import { getGeoCoordinates } from '../utils/geo.ts';

// const router = new Hono();

// router.get('/', async c => {
//   const q = c.req.query('query');
//   const radiusParam = c.req.query('radius'); // optional radius in meters
//   const categoriesParam = c.req.query('categories'); // optional comma-separated categories

//   if (!q) return c.json({ error: 'query required' }, 400);

//   try {
//     const [lat, lon] = await getGeoCoordinates(q);

//     const radius = radiusParam ? Number(radiusParam) : 10000;

//     // If frontend sent categories, use them, otherwise default to hotels/hostels
//     const categories = categoriesParam
//       ? categoriesParam
//       : [
//           'accommodation.hotel',
//           'accommodation.motel',
//           'accommodation.hostel',
//           'accommodation.guest_house',
//         ].join(',');

//     const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`;

//     const res = await fetch(url);
//     if (!res.ok) {
//       const txt = await res.text();
//       return c.json({ error: 'External API error', details: txt }, 502);
//     }

//     const data = await res.json();
//     const results = (data.features || []).map((f: any) => ({
//       id: f.properties.place_id || f.properties.osm_id,
//       name: f.properties.name,
//       address: f.properties.formatted,
//       lat: f.properties.lat,
//       lon: f.properties.lon,
//       raw: f.properties,
//     }));

//     return c.json({
//       query: q,
//       coordinates: { lat, lon },
//       radius,
//       categories,
//       count: results.length,
//       results,
//     });
//   } catch (err: any) {
//     return c.json({ error: err.message }, 500);
//   }
// });

// export default router;


import { Hono } from 'hono';
import { optionalAuth } from '../middleware/auth';
import { db } from '../db/index';
import { destinations, hotels } from '../db/schema';
import { eq } from 'drizzle-orm';

const destinationsRouter = new Hono();

// List all destinations
destinationsRouter.get('/', optionalAuth, async (c) => {
  try {
    const allDestinations = await db
      .select()
      .from(destinations)
      .orderBy(destinations.reviewCount);

    return c.json({ destinations: allDestinations });
  } catch (error) {
    console.error('Fetch destinations error:', error);
    return c.json({ error: 'Failed to fetch destinations' }, 500);
  }
});

// Get single destination with hotels
destinationsRouter.get('/:id', optionalAuth, async (c) => {
  const destinationId = c.req.param('id');

  try {
    const [destination] = await db
      .select()
      .from(destinations)
      .where(eq(destinations.id, destinationId))
      .limit(1);

    if (!destination) {
      return c.json({ error: 'Destination not found' }, 404);
    }

    const destinationHotels = await db
      .select()
      .from(hotels)
      .where(eq(hotels.destinationId, destinationId));

    return c.json({
      destination: {
        ...destination,
        highlights: JSON.parse(destination.highlights),
      },
      hotels: destinationHotels.map(h => ({
        ...h,
        images: JSON.parse(h.images),
        amenities: JSON.parse(h.amenities),
      })),
    });
  } catch (error) {
    console.error('Fetch destination error:', error);
    return c.json({ error: 'Failed to fetch destination' }, 500);
  }
});

export default destinationsRouter;