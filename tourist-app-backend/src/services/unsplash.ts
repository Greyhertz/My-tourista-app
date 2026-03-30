import { cache, TTL } from "./cache";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY!;
const BASE = 'https://api.unsplash.com';

const FALLBACK = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80';

export interface UnsplashPhoto {
  url: string;       // regular ~1080px
  thumb: string;     // 200px thumb
  full: string;      // full-res
  credit: string;    // photographer name
  creditUrl: string; // photographer profile
  color: string;     // dominant hex color
  blurHash: string;
}

async function fetchUnsplash(query: string, perPage = 1): Promise<UnsplashPhoto[]> {
  const key = `unsplash:${query}:${perPage}`;
  const cached = cache.get<UnsplashPhoto[]>(key);
  if (cached) return cached;

  try {
    const url = new URL(`${BASE}/search/photos`);
    url.searchParams.set('query', query);
    url.searchParams.set('per_page', String(perPage));
    url.searchParams.set('orientation', 'landscape');
    url.searchParams.set('content_filter', 'high');

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    });

    if (!res.ok) throw new Error(`Unsplash ${res.status}`);

    const data = await res.json();
    const photos: UnsplashPhoto[] = (data.results || []).map((p: any) => ({
      url:        p.urls?.regular  || FALLBACK,
      thumb:      p.urls?.thumb    || FALLBACK,
      full:       p.urls?.full     || FALLBACK,
      credit:     p.user?.name    || 'Unknown',
      creditUrl:  p.user?.links?.html || 'https://unsplash.com',
      color:      p.color          || '#1a1a2e',
      blurHash:   p.blur_hash      || '',
    }));

    cache.set(key, photos, TTL.IMAGE);
    return photos;
  } catch (err) {
    console.error('[Unsplash] error:', err);
    return [];
  }
}

/**
 * Get a single representative image for a destination.
 * Falls back gracefully through progressively broader queries.
 */
export async function getDestinationImage(
  name: string,
  country: string,
  type: string = 'landmark travel'
): Promise<UnsplashPhoto> {
  const queries = [
    `${name} ${country} ${type}`,
    `${name} ${type}`,
    `${country} travel`,
    'travel destination scenic',
  ];

  for (const q of queries) {
    const results = await fetchUnsplash(q, 3);
    if (results.length > 0) {
      // Deterministic selection based on name (not random, so caching is stable)
      const idx = name.charCodeAt(0) % results.length;
      return results[idx];
    }
  }

  return {
    url: FALLBACK, thumb: FALLBACK, full: FALLBACK,
    credit: 'Unsplash', creditUrl: 'https://unsplash.com',
    color: '#1a1a2e', blurHash: '',
  };
}

/**
 * Fetch multiple images for a gallery (used in destination detail).
 */
export async function getDestinationGallery(
  name: string,
  country: string,
  count = 6
): Promise<UnsplashPhoto[]> {
  const key = `gallery:${name}:${country}`;
  const cached = cache.get<UnsplashPhoto[]>(key);
  if (cached) return cached;

  const results = await fetchUnsplash(`${name} ${country} travel`, count);
  cache.set(key, results, TTL.IMAGE);
  return results;
}