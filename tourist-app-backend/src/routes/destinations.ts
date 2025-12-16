// src/routes/destinations.ts
import { Hono } from 'hono';
import { getGeoCoordinates } from '../utils/geo.ts';

const router = new Hono();

router.get('/', async c => {
  const q = c.req.query('query');
  const radiusParam = c.req.query('radius'); // optional radius in meters
  const categoriesParam = c.req.query('categories'); // optional comma-separated categories

  if (!q) return c.json({ error: 'query required' }, 400);

  try {
    const [lat, lon] = await getGeoCoordinates(q);

    const radius = radiusParam ? Number(radiusParam) : 10000;

    // If frontend sent categories, use them, otherwise default to hotels/hostels
    const categories = categoriesParam
      ? categoriesParam
      : [
          'accommodation.hotel',
          'accommodation.motel',
          'accommodation.hostel',
          'accommodation.guest_house',
        ].join(',');

    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) {
      const txt = await res.text();
      return c.json({ error: 'External API error', details: txt }, 502);
    }

    const data = await res.json();
    const results = (data.features || []).map((f: any) => ({
      id: f.properties.place_id || f.properties.osm_id,
      name: f.properties.name,
      address: f.properties.formatted,
      lat: f.properties.lat,
      lon: f.properties.lon,
      raw: f.properties,
    }));

    return c.json({
      query: q,
      coordinates: { lat, lon },
      radius,
      categories,
      count: results.length,
      results,
    });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

export default router;
