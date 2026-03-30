import { cache, TTL } from './cache';
import { getDestinationImage, getDestinationGallery } from './unsplash';
import { getWikiSummary, extractHighlights } from './wikipedia';

const API_KEY = process.env.GEOAPIFY_API_KEY!;
const GEO_BASE = 'https://api.geoapify.com';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AutocompleteSuggestion {
  placeId:   string;
  name:      string;
  formatted: string;
  city:      string | null;
  country:   string | null;
  lat:       number;
  lon:       number;
  type:      string;
}

export interface SearchResult {
  placeId:     string;
  name:        string;
  formatted:   string;
  country:     string;
  countryCode: string;
  lat:         number;
  lon:         number;
  type:        string;
}

export interface AmenityPlace {
  name:           string;
  address:        string;
  lat:            number;
  lon:            number;
  categories:     string[];
  website?:       string;
  phone?:         string;
  openNow?:       boolean | null;
  openingHours?:  string;
  wheelchair:     boolean;
  internetAccess: boolean;
  fee?:           boolean;
  distance?:      number;
}

export interface AmenitiesResult {
  food:          { restaurants: AmenityPlace[]; cafes: AmenityPlace[]; bars: AmenityPlace[] };
  accommodation: AmenityPlace[];
  healthcare:    AmenityPlace[];
  nature:        AmenityPlace[];
  tourism:       { attractions: AmenityPlace[]; museums: AmenityPlace[]; viewpoints: AmenityPlace[] };
  sports:        AmenityPlace[];
  shopping:      AmenityPlace[];
  entertainment: AmenityPlace[];
  transport:     AmenityPlace[];
  services:      AmenityPlace[];
  wheelchairAccessible: AmenityPlace[];
  wifiSpots:     AmenityPlace[];
}

// ─── Featured pool (50 cities) ────────────────────────────────────────────────

export const FEATURED_POOL = [
  { name: 'Paris',          country: 'France',       lat: 48.8566,  lon:   2.3522 },
  { name: 'New York City',  country: 'USA',          lat: 40.7128,  lon: -74.0060 },
  { name: 'Tokyo',          country: 'Japan',        lat: 35.6762,  lon: 139.6503 },
  { name: 'London',         country: 'UK',           lat: 51.5074,  lon:  -0.1278 },
  { name: 'Dubai',          country: 'UAE',          lat: 25.2048,  lon:  55.2708 },
  { name: 'Sydney',         country: 'Australia',    lat: -33.8688, lon: 151.2093 },
  { name: 'Rome',           country: 'Italy',        lat: 41.9028,  lon:  12.4964 },
  { name: 'Barcelona',      country: 'Spain',        lat: 41.3851,  lon:   2.1734 },
  { name: 'Amsterdam',      country: 'Netherlands',  lat: 52.3676,  lon:   4.9041 },
  { name: 'Bangkok',        country: 'Thailand',     lat: 13.7563,  lon: 100.5018 },
  { name: 'Singapore',      country: 'Singapore',    lat:  1.3521,  lon: 103.8198 },
  { name: 'Istanbul',       country: 'Turkey',       lat: 41.0082,  lon:  28.9784 },
  { name: 'Prague',         country: 'Czechia',      lat: 50.0755,  lon:  14.4378 },
  { name: 'Vienna',         country: 'Austria',      lat: 48.2082,  lon:  16.3738 },
  { name: 'Bali',           country: 'Indonesia',    lat: -8.4095,  lon: 115.1889 },
  { name: 'Marrakech',      country: 'Morocco',      lat: 31.6295,  lon:  -7.9811 },
  { name: 'Cairo',          country: 'Egypt',        lat: 30.0444,  lon:  31.2357 },
  { name: 'Cape Town',      country: 'South Africa', lat: -33.9249, lon:  18.4241 },
  { name: 'Rio de Janeiro', country: 'Brazil',       lat: -22.9068, lon: -43.1729 },
  { name: 'Mexico City',    country: 'Mexico',       lat: 19.4326,  lon: -99.1332 },
  { name: 'Toronto',        country: 'Canada',       lat: 43.6532,  lon: -79.3832 },
  { name: 'Seoul',          country: 'South Korea',  lat: 37.5665,  lon: 126.9780 },
  { name: 'Maldives',       country: 'Maldives',     lat:  3.2028,  lon:  73.2207 },
  { name: 'Santorini',      country: 'Greece',       lat: 36.3932,  lon:  25.4615 },
  { name: 'Kyoto',          country: 'Japan',        lat: 35.0116,  lon: 135.7681 },
  { name: 'Venice',         country: 'Italy',        lat: 45.4408,  lon:  12.3155 },
  { name: 'Lisbon',         country: 'Portugal',     lat: 38.7223,  lon:  -9.1393 },
  { name: 'Copenhagen',     country: 'Denmark',      lat: 55.6761,  lon:  12.5683 },
  { name: 'Lagos',          country: 'Nigeria',      lat:  6.5244,  lon:   3.3792 },
  { name: 'Nairobi',        country: 'Kenya',        lat: -1.2921,  lon:  36.8219 },
  { name: 'Mumbai',         country: 'India',        lat: 19.0760,  lon:  72.8777 },
  { name: 'Buenos Aires',   country: 'Argentina',    lat: -34.6037, lon: -58.3816 },
  { name: 'Havana',         country: 'Cuba',         lat: 23.1136,  lon: -82.3666 },
  { name: 'Reykjavik',      country: 'Iceland',      lat: 64.1466,  lon: -21.9426 },
  { name: 'Dubrovnik',      country: 'Croatia',      lat: 42.6507,  lon:  18.0944 },
  { name: 'Hanoi',          country: 'Vietnam',      lat: 21.0278,  lon: 105.8342 },
  { name: 'Chiang Mai',     country: 'Thailand',     lat: 18.7883,  lon:  98.9853 },
  { name: 'Tbilisi',        country: 'Georgia',      lat: 41.6938,  lon:  44.8015 },
  { name: 'Tallinn',        country: 'Estonia',      lat: 59.4370,  lon:  24.7536 },
  { name: 'Accra',          country: 'Ghana',        lat:  5.6037,  lon:  -0.1870 },
  { name: 'Cartagena',      country: 'Colombia',     lat: 10.3910,  lon: -75.4794 },
  { name: 'Zanzibar',       country: 'Tanzania',     lat: -6.1659,  lon:  39.2026 },
  { name: 'Kathmandu',      country: 'Nepal',        lat: 27.7172,  lon:  85.3240 },
  { name: 'Petra',          country: 'Jordan',       lat: 30.3285,  lon:  35.4444 },
  { name: 'Queenstown',     country: 'New Zealand',  lat: -45.0312, lon: 168.6626 },
  { name: 'Casablanca',     country: 'Morocco',      lat: 33.5731,  lon:  -7.5898 },
  { name: 'Dublin',         country: 'Ireland',      lat: 53.3498,  lon:  -6.2603 },
  { name: 'Machu Picchu',   country: 'Peru',         lat: -13.1631, lon: -72.5450 },
  { name: 'Luang Prabang',  country: 'Laos',         lat: 19.8563,  lon: 102.1351 },
  { name: 'Bogota',         country: 'Colombia',     lat:  4.7110,  lon: -74.0721 },
];

/** Date-seeded shuffle — same 9 cities for all users today, different tomorrow */
export function getDailyFeatured(count = 9): typeof FEATURED_POOL {
  const today = new Date().toISOString().split('T')[0];
  let seed = today.split('-').reduce((acc, p) => acc + parseInt(p, 10) * 31, 7);
  const pool = [...FEATURED_POOL];
  for (let i = pool.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

// ─── ID encoding: name+country embedded — NO reverse geocoding needed ─────────

export function encodeDestId(lat: number, lon: number, name: string, country: string): string {
  const safe = (s: string) => encodeURIComponent(s.replace(/\s+/g, '+'));
  return `geo_${lat.toFixed(4)}_${lon.toFixed(4)}_${safe(name)}_${safe(country)}`;
}

export function decodeDestId(id: string): { lat: number; lon: number; name: string; country: string } | null {
  // geo_LAT_LON_EncodedName_EncodedCountry
  const match = id.match(/^geo_(-?[\d.]+)_(-?[\d.]+)_(.+)_([^_]+)$/);
  if (!match) return null;
  return {
    lat:     parseFloat(match[1]),
    lon:     parseFloat(match[2]),
    name:    decodeURIComponent(match[3].replace(/\+/g, ' ')),
    country: decodeURIComponent(match[4].replace(/\+/g, ' ')),
  };
}

// ─── Autocomplete — fires from first character ────────────────────────────────

export async function autocomplete(query: string, limit = 8): Promise<AutocompleteSuggestion[]> {
  if (!query || query.trim().length < 1) return [];

  const key = `ac:${query.toLowerCase().trim()}`;
  const hit = cache.get<AutocompleteSuggestion[]>(key);
  if (hit) return hit;

  try {
    const url = new URL(`${GEO_BASE}/v1/geocode/autocomplete`);
    url.searchParams.set('text', query);
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('format', 'json');
    url.searchParams.set('apiKey', API_KEY);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Autocomplete ${res.status}`);

    const data = await res.json();
    const results: AutocompleteSuggestion[] = (data.results || [])
      .filter((r: any) => r.lat && r.lon)
      .map((r: any) => ({
        placeId:   r.place_id || '',
        name:      r.name || r.city || r.county || r.country || r.formatted?.split(',')[0] || query,
        formatted: r.formatted || '',
        city:      r.city    || null,
        country:   r.country || null,
        lat:       r.lat,
        lon:       r.lon,
        type:      r.result_type || 'place',
      }));

    cache.set(key, results, TTL.AUTOCOMPLETE);
    return results;
  } catch (err) {
    console.error('[autocomplete]', err);
    return [];
  }
}

// ─── Reverse geocode — lat/lon → name + country ──────────────────────────────

export async function reverseGeocode(lat: number, lon: number): Promise<{
  name: string | null;
  city: string | null;
  county: string | null;
  country: string | null;
  formatted: string | null;
} | null> {
  const key = `reverse:${lat.toFixed(4)}:${lon.toFixed(4)}`;
  const hit = cache.get<any>(key);
  if (hit) return hit;

  try {
    const url = new URL(`${GEO_BASE}/v1/geocode/reverse`);
    url.searchParams.set('lat', String(lat));
    url.searchParams.set('lon', String(lon));
    url.searchParams.set('format', 'json');
    url.searchParams.set('apiKey', API_KEY);

    const res = await fetch(url.toString());
    if (!res.ok) return null;

    const data = await res.json();
    const r = data.results?.[0];
    if (!r) return null;

    const result = {
      name:      r.name    || r.city    || r.county || r.formatted?.split(',')[0] || null,
      city:      r.city    || null,
      county:    r.county  || null,
      country:   r.country || null,
      formatted: r.formatted || null,
    };
    cache.set(key, result, TTL.DESTINATION);
    return result;
  } catch (err) {
    console.error('[reverseGeocode]', err);
    return null;
  }
}

// ─── Search (on Enter) ────────────────────────────────────────────────────────

export async function searchDestinations(query: string, limit = 8): Promise<SearchResult[]> {
  const key = `search:${query.toLowerCase().trim()}`;
  const hit = cache.get<SearchResult[]>(key);
  if (hit) return hit;

  try {
    const url = new URL(`${GEO_BASE}/v1/geocode/search`);
    url.searchParams.set('text', query);
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('format', 'json');
    url.searchParams.set('apiKey', API_KEY);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Search ${res.status}`);

    const data = await res.json();
    const results: SearchResult[] = (data.results || [])
      .filter((r: any) => r.lat && r.lon)
      .map((r: any) => ({
        placeId:     r.place_id || '',
        name:        r.name || r.city || r.county || r.formatted?.split(',')[0] || query,
        formatted:   r.formatted || '',
        country:     r.country || '',
        countryCode: (r.country_code || '').toUpperCase(),
        lat:         r.lat,
        lon:         r.lon,
        type:        r.result_type || 'place',
      }));

    cache.set(key, results, TTL.SEARCH);
    return results;
  } catch (err) {
    console.error('[search]', err);
    return [];
  }
}

// ─── Places API v2 — verified Geoapify category taxonomy ─────────────────────
// IMPORTANT: filter format is circle:LON,LAT,RADIUS (longitude FIRST)

const CAT = {
  restaurant:   'catering.restaurant',
  cafe:         'catering.cafe',
  bar:          'catering.bar',
  fastFood:     'catering.fast_food',
  hotel:        'accommodation.hotel',
  hostel:       'accommodation.hostel',
  guestHouse:   'accommodation.guest_house',
  resort:       'accommodation.resort',
  motel:        'accommodation.motel',
  hospital:     'healthcare.hospital',
  pharmacy:     'healthcare.pharmacy',
  clinic:       'healthcare.clinic',
  park:         'leisure.park',
  beach:        'natural.beach',
  garden:       'leisure.garden',
  attraction:   'tourism.attraction',
  museum:       'tourism.sights.museum',
  viewpoint:    'tourism.sights.viewpoint',
  monument:     'tourism.sights.monument',
  castle:       'tourism.sights.castle',
  ruins:        'tourism.sights.ruins',
  zoo:          'entertainment.zoo',
  aquarium:     'entertainment.aquarium',
  themePark:    'entertainment.theme_park',
  stadium:      'sport.stadium',
  sportsCentre: 'sport.sports_centre',
  gym:          'sport.fitness',
  pool:         'sport.swimming_pool',
  mall:         'commercial.shopping_mall',
  supermarket:  'commercial.supermarket',
  market:       'commercial.marketplace',
  cinema:       'entertainment.cinema',
  nightclub:    'entertainment.nightclub',
  theatre:      'entertainment.theatre',
  artGallery:   'entertainment.art_gallery',
  casino:       'entertainment.casino',
  airport:      'airport',
  trainStation: 'public_transport.train',
  busStation:   'public_transport.bus',
  subway:       'public_transport.subway',
  ferry:        'public_transport.ferry',
  bank:         'service.financial.bank',
  atm:          'service.financial.atm',
  postOffice:   'service.post_office',
  police:       'service.police',
  embassy:      'service.embassy',
};

function mapPlace(f: any): AmenityPlace {
  const p = f.properties ?? f;
  return {
    name:           p.name || 'Unnamed',
    address:        p.formatted || p.address_line2 || '',
    lat:            p.lat ?? f.geometry?.coordinates?.[1],
    lon:            p.lon ?? f.geometry?.coordinates?.[0],
    categories:     p.categories || [],
    website:        p.website || undefined,
    phone:          p.contact?.phone || p.datasource?.raw?.phone || undefined,
    openNow:        typeof p.opening_hours === 'object'
                      ? (p.opening_hours?.open_now ?? null)
                      : null,
    openingHours:   typeof p.opening_hours === 'string' ? p.opening_hours : undefined,
    wheelchair:     p.facilities?.wheelchair === 'yes' || p.wheelchair === 'yes'
                    || (p.datasource?.raw?.wheelchair === 'yes'),
    internetAccess: p.facilities?.internet_access === 'yes'
                    || (p.datasource?.raw?.internet_access === 'yes'),
    fee:            p.fee === 'yes' || p.datasource?.raw?.fee === 'yes',
    distance:       p.distance ?? undefined,
  };
}

async function fetchCategory(
  lat: number,
  lon: number,
  categories: string,
  limit = 15,
  radiusM = 10000,
): Promise<AmenityPlace[]> {
  const url = new URL(`${GEO_BASE}/v2/places`);
  url.searchParams.set('categories', categories);
  // *** CRITICAL: Geoapify circle filter is LON,LAT (not lat,lon) ***
  url.searchParams.set('filter', `circle:${lon},${lat},${radiusM}`);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('apiKey', API_KEY);

  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(`[places] ${categories} → HTTP ${res.status}`);
    return [];
  }

  const data = await res.json();
  if (!data.features?.length) return [];

  return data.features.map(mapPlace).filter(
    (p: AmenityPlace) => p.lat && p.lon
  );
}

// ─── Exported types that destinations.ts expects ─────────────────────────────

/** Unified place result used by both autocomplete and full search */
export interface PlaceSearchResult {
  id:        string;
  name:      string;
  city:      string | null;
  state:     string | null;
  country:   string | null;
  formatted: string;
  lat:       number;
  lon:       number;
  type:      string;
}

export interface FeaturedDestination {
  id:       string;
  name:     string;
  country:  string;
  lat:      number;
  lon:      number;
  imageUrl: string;
  rating:   string;
}

// ─── searchPlaces — used by /autocomplete and /search ────────────────────────
// Wraps the existing `autocomplete` function and maps to PlaceSearchResult.

export async function searchPlaces(query: string, limit = 10): Promise<PlaceSearchResult[]> {
  if (!query.trim()) return [];
  const raw = await autocomplete(query, limit);
  return raw.map((r) => ({
    id:        `geo_${r.lat.toFixed(4)}_${r.lon.toFixed(4)}`,
    name:      r.name,
    city:      r.city,
    state:     null,
    country:   r.country,
    formatted: r.formatted,
    lat:       r.lat,
    lon:       r.lon,
    type:      r.type,
  }));
}

// ─── getPlaceDetailsRich — used by /details and /:id ─────────────────────────
// Reverse geocodes → Wikipedia description → Unsplash image + gallery

export async function getPlaceDetailsRich(lat: number, lon: number): Promise<{
  id:          string;
  name:        string;
  country:     string;
  description: string;
  wikiUrl:     string | null;
  imageUrl:    string;
  gallery:     Array<{ url: string; thumb: string; credit: string; creditUrl: string }>;
  lat:         number;
  lon:         number;
  highlights:  string[];
  rating:      number;
  reviewCount: number;
} | null> {
  const key = `rich:${lat.toFixed(4)}:${lon.toFixed(4)}`;
  const hit  = cache.get<any>(key);
  if (hit) return hit;

  try {
    const geo = await reverseGeocode(lat, lon);
    if (!geo) return null;

    const name    = geo.name    || geo.city    || 'This Destination';
    const country = geo.country || '';

    // Run Wikipedia + Unsplash in parallel
    const [wiki, image, gallery] = await Promise.all([
      getWikiSummary(name).catch(() => null),
      getDestinationImage(name, country).catch(() => null),
      getDestinationGallery(name, country, 6).catch(() => []),
    ]);

    const highlights = extractHighlights(wiki?.extract || '', name);

    const result = {
      id:          `geo_${lat.toFixed(4)}_${lon.toFixed(4)}`,
      name,
      country,
      description: wiki?.extract || `${name} is a fascinating destination${country ? ` in ${country}` : ''}.`,
      wikiUrl:     wiki?.pageUrl || null,
      imageUrl:    image?.url    || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
      gallery:     gallery.map(g => ({ url: g.url, thumb: g.thumb, credit: g.credit, creditUrl: g.creditUrl })),
      lat,
      lon,
      highlights,
      rating:      4.2,
      reviewCount: 0,
    };

    cache.set(key, result, TTL.DESTINATION);
    return result;
  } catch {
    return null;
  }
}

// ─── getNearbyPlaces — used by /nearby and /:id ───────────────────────────────
// Flexible single-call category fetcher returning AmenityPlace[].

export async function getNearbyPlaces(
  lat: number,
  lon: number,
  radius = 5000,
  categories: string[] = ['catering.restaurant', 'tourism.attraction'],
): Promise<AmenityPlace[]> {
  const cats = categories.join(',');
  return fetchCategory(lat, lon, cats, 15, radius);
}

// ─── getFeaturedDestinationsWithImages ────────────────────────────────────────
// Used by /featured. Picks today's cities and attaches imageUrls.
// Imports getDestinationImage lazily to avoid circular deps.

export async function getFeaturedDestinationsWithImages(count = 9): Promise<FeaturedDestination[]> {
  const today    = new Date().toISOString().split('T')[0];
  const cacheKey = `featured_images:${today}:${count}`;
  const hit      = cache.get<FeaturedDestination[]>(cacheKey);
  if (hit) return hit;

  const pool = getDailyFeatured(count);

  const results = await Promise.all(
    pool.map(async (dest) => {
      const img = await getDestinationImage(dest.name, dest.country).catch(() => ({
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
      }));
      return {
        id:       `geo_${dest.lat.toFixed(4)}_${dest.lon.toFixed(4)}`,
        name:     dest.name,
        country:  dest.country,
        lat:      dest.lat,
        lon:      dest.lon,
        imageUrl: img.url,
        rating:   (3.5 + Math.abs(Math.sin(dest.lat * dest.lon)) * 1.5).toFixed(1),
      } as FeaturedDestination;
    })
  );

  cache.set(cacheKey, results, TTL.FEATURED);
  return results;
}

// ─── clearCache — used by /admin/cache-clear ─────────────────────────────────

export function clearCache(): void {
  // Delegates to the cache module's full wipe — TTL sweep handles the rest
  cache.cleanup();
}

/**
 * Fetch all amenity categories in parallel for a destination.
 * Uses 10 km radius (adjustable). All results cached 2 hours.
 */
export async function getAllAmenities(lat: number, lon: number, radiusM = 10000): Promise<AmenitiesResult> {
  const key = `amenities:${lat.toFixed(3)}:${lon.toFixed(3)}:${radiusM}`;
  const hit = cache.get<AmenitiesResult>(key);
  if (hit) return hit;

  const [
    restaurants, cafes, bars,
    hotels,
    healthcare,
    nature,
    attractions, museums, viewpoints,
    sports,
    shopping,
    entertainment,
    transport,
    services,
  ] = await Promise.allSettled([
    fetchCategory(lat, lon, `${CAT.restaurant},${CAT.fastFood}`,                                            15, radiusM),
    fetchCategory(lat, lon, CAT.cafe,                                                                       10, radiusM),
    fetchCategory(lat, lon, `${CAT.bar},${CAT.nightclub}`,                                                  10, radiusM),
    fetchCategory(lat, lon, `${CAT.hotel},${CAT.hostel},${CAT.guestHouse},${CAT.resort},${CAT.motel}`,      15, radiusM),
    fetchCategory(lat, lon, `${CAT.hospital},${CAT.pharmacy},${CAT.clinic}`,                                10, radiusM),
    fetchCategory(lat, lon, `${CAT.park},${CAT.beach},${CAT.garden}`,                                       10, radiusM),
    fetchCategory(lat, lon, `${CAT.attraction},${CAT.monument},${CAT.castle},${CAT.ruins}`,                 15, radiusM),
    fetchCategory(lat, lon, `${CAT.museum},${CAT.artGallery},${CAT.zoo},${CAT.aquarium}`,                   10, radiusM),
    fetchCategory(lat, lon, `${CAT.viewpoint},${CAT.themePark}`,                                             8, radiusM),
    fetchCategory(lat, lon, `${CAT.stadium},${CAT.sportsCentre},${CAT.gym},${CAT.pool}`,                    10, radiusM),
    fetchCategory(lat, lon, `${CAT.mall},${CAT.supermarket},${CAT.market}`,                                 10, radiusM),
    fetchCategory(lat, lon, `${CAT.cinema},${CAT.theatre},${CAT.casino}`,                                    8, radiusM),
    // wider radius for airports/transit
    fetchCategory(lat, lon, `${CAT.airport},${CAT.trainStation},${CAT.busStation},${CAT.subway},${CAT.ferry}`, 10, radiusM * 3),
    fetchCategory(lat, lon, `${CAT.bank},${CAT.atm},${CAT.postOffice},${CAT.police},${CAT.embassy}`,         8, radiusM),
  ]);

  const ok = <T>(r: PromiseSettledResult<T[]>): T[] =>
    r.status === 'fulfilled' ? r.value : [];

  // Derive cross-category accessibility/wifi lists from all results
  const allPlaces = [
    ...ok(restaurants), ...ok(cafes), ...ok(bars),
    ...ok(hotels), ...ok(attractions), ...ok(museums),
    ...ok(sports), ...ok(shopping), ...ok(entertainment),
  ];

  const result: AmenitiesResult = {
    food:          { restaurants: ok(restaurants), cafes: ok(cafes), bars: ok(bars) },
    accommodation: ok(hotels),
    healthcare:    ok(healthcare),
    nature:        ok(nature),
    tourism:       { attractions: ok(attractions), museums: ok(museums), viewpoints: ok(viewpoints) },
    sports:        ok(sports),
    shopping:      ok(shopping),
    entertainment: ok(entertainment),
    transport:     ok(transport),
    services:      ok(services),
    wheelchairAccessible: allPlaces.filter(p => p.wheelchair),
    wifiSpots:            allPlaces.filter(p => p.internetAccess),
  };

  cache.set(key, result, TTL.AMENITIES);
  return result;
}