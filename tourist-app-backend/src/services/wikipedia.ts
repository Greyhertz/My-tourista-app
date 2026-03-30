import { cache, TTL } from './cache';

export interface WikiSummary {
  title: string;
  extract: string;        // Plain text description
  extractHtml: string;    // HTML version
  thumbnail?: string;     // Wikipedia's own thumbnail (fallback image)
  coordinates?: { lat: number; lon: number };
  pageUrl: string;
}

/**
 * Fetch a Wikipedia summary for a place name.
 * Uses the REST v1 summary endpoint — no auth required.
 */
export async function getWikiSummary(placeName: string): Promise<WikiSummary | null> {
  const key = `wiki:${placeName.toLowerCase().replace(/\s+/g, '_')}`;
  const cached = cache.get<WikiSummary>(key);
  if (cached) return cached;

  // Try progressively simplified titles
  const titles = [
    placeName,
    placeName.split(',')[0].trim(),
    placeName.split(' ')[0],
  ];

  for (const title of titles) {
    try {
      const encoded = encodeURIComponent(title.replace(/\s+/g, '_'));
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`,
        { headers: { 'User-Agent': 'TravelApp/1.0 (educational project)' } }
      );

      if (!res.ok) continue;

      const data = await res.json();
      if (data.type === 'disambiguation') continue; // skip disambiguation pages

      const summary: WikiSummary = {
        title:       data.title,
        extract:     data.extract     || '',
        extractHtml: data.extract_html || '',
        thumbnail:   data.thumbnail?.source,
        coordinates: data.coordinates
          ? { lat: data.coordinates.lat, lon: data.coordinates.lon }
          : undefined,
        pageUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encoded}`,
      };

      cache.set(key, summary, TTL.WIKIPEDIA);
      return summary;
    } catch (err) {
      continue;
    }
  }

  return null;
}

/** Generate a short highlights array from a Wikipedia extract */
export function extractHighlights(extract: string, name: string): string[] {
  if (!extract) return [name, 'Tourism', 'Travel', 'Culture', 'Sightseeing'];

  // Pull sentences, score for tourism keywords, take top 5 as "highlights"
  const tourismKeywords = [
    'museum', 'cathedral', 'temple', 'palace', 'beach', 'mountain', 'park',
    'market', 'tower', 'bridge', 'river', 'lake', 'castle', 'historic',
    'festival', 'cuisine', 'architecture', 'culture', 'art', 'heritage',
    'national park', 'island', 'waterfall', 'stadium', 'monument',
  ];

  const highlights = new Set<string>();

  for (const kw of tourismKeywords) {
    if (extract.toLowerCase().includes(kw)) {
      highlights.add(kw.charAt(0).toUpperCase() + kw.slice(1));
    }
    if (highlights.size >= 8) break;
  }

  // Always include the city/place itself
  highlights.add(name);

  return Array.from(highlights).slice(0, 8);
}