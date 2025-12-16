// testGeo.ts
import fetch from 'node-fetch';

const GEOAPIFY_API_KEY = 'YOUR_API_KEY_HERE'; // replace with your key
const locationQuery = 'Paris';

export async function getGeoCoordinates(
  query: string
): Promise<[number, number]> {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    query
  )}&format=json&apiKey=${GEOAPIFY_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  console.log('🌍 Geoapify data:', data);

  if (!data.results?.length) throw new Error('Location not found');
  const { lat, lon } = data.results[0];
  return [lat, lon];
}

// Run test
getGeoCoordinates(locationQuery)
  .then(([lat, lon]) =>
    console.log(`Coordinates for ${locationQuery}:`, lat, lon)
  )
  .catch(err => console.error(err));
