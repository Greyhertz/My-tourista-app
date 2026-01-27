// src/utils/geo.ts
import fetch from 'node-fetch';

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY; // read from env

if (!GEOAPIFY_API_KEY) {
  throw new Error('Geoapify API key not configured in environment variables');
}

export async function getGeoCoordinates(
  query: string
): Promise<[number, number]> {
  if (!query) throw new Error('Query is required');

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    query
  )}&format=json&apiKey=${GEOAPIFY_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Geoapify API error: ${txt}`);
  }

  const data = await res.json();
  if (!data.results?.length) throw new Error('Location not found');

  const { lat, lon } = data.results[0];
  return [lat, lon];
}
