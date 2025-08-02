const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function fetchMultipleImages(query: string): Promise<string[]> {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=4&client_id=${UNSPLASH_ACCESS_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results) return [];

  return data.results.map((img: any) => img.urls?.regular).filter(Boolean);
}

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

export async function fetchImage(query: string) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_KEY}`
  );
  const data = await res.json();
  return data.results?.[0]?.urls?.regular || '';
}

