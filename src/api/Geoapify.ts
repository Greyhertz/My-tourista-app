// src/api/Geoapify.ts (extend existing file)

// const GEOAPIFY_API_KEY = import.meta.env.local.VITE_GEOAPIFY_API_KEY;
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function getGeoCoordinates(
  query:string
): Promise<[number, number]> {
  // Use the same API key variable for consistency
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    query
  )}&format=json&apiKey=${GEOAPIFY_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  console.log('🌍 Geoapify data:', data);
  console.log('API key:', import.meta.env.VITE_GEOAPIFY_API_KEY);


  if (!data.results?.length) throw new Error('Location not found');
  const { lat, lon } = data.results[0];
  return [lat, lon];
}

// src/api/Geoapify.ts (extend existing file)
 


export async function reverseGeocode(lat: number, lon: number) {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.features && data.features.length > 0) {
    const props = data.features[0].properties;
    return {
      city: props.city || props.town || props.village || "Unknown City",
      state: props.state || "Unknown State",
      country: props.country || "Unknown Country"
    };
  }

  return null;
}


// Get hotels nearby given coordinates
export async function fetchNearbyHotels(lat: number, lon: number) {
  const categories = [
    'accommodation.hotel',
    'accommodation.motel',
    'accommodation.hostel',
    'accommodation.guest_house',
    // 'tourism',
    // 'tourism.sights',
    // 'tourism.attraction',
  ].join(',');

  const radius = 10000; // 2 km

  // Note: Geoapify expects longitude first, then latitude in the filter
  const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${GEOAPIFY_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.features || [];
}
// export async function fetchDestinations(
//   lat: number,
//   lon: number,
// ) {
//   const categories = [
//     'tourism.attraction',
//     'tourism.museum',
//     'tourism.art_gallery',
//     'tourism.zoo',
//     'tourism.nature_reserve',
//     'tourism.landmark',
//   ].join(',');

//   const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=40&apiKey=${GEOAPIFY_API_KEY}`;

//   const res = await fetch(url);
//   const data = await res.json();

//   return data.features || [];
// } 