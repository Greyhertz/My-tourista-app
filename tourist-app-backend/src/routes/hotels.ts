import { Hono } from 'hono';

const router = new Hono();

router.get('/', async c => {
  const lat = c.req.query('lat');
  const lon = c.req.query('lon');
  const limit = c.req.query('limit') || '10';

  if (!lat || !lon) return c.json({ error: 'lat & lon required' }, 400);

  const key = process.env.GEOAPIFY_API_KEY;
  if (!key) return c.json({ error: 'Geoapify key not configured' }, 500);

  const url = `https://api.geoapify.com/v2/places?apiKey=${key}&categories=accommodation.hotel&limit=${limit}&filter=place:nearby(${lat},${lon},5000)`;

  const res = await fetch(url);
  const data = await res.json();

  const hotels = data.features?.map((f: any) => ({
    id: f.properties.place_id,
    name: f.properties.name,
    address: f.properties.formatted,
    lat: f.properties.lat,
    lon: f.properties.lon,
    rating: f.properties.rate,
  }));

  return c.json(hotels || []);
});

export default router;
