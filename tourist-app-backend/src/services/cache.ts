/**
 * In-memory TTL cache for backend services.
 * Avoids hammering Geoapify / Unsplash / Wikipedia on repeat requests.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class InMemoryCache {
  private store = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, ttlMs: number): void {
    this.store.set(key, { data, expiresAt: Date.now() + ttlMs });
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.data as T;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  /** Remove all expired entries — run on an interval */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) this.store.delete(key);
    }
  }

  size(): number {
    return this.store.size;
  }
}

export const cache = new InMemoryCache();

// Sweep every 15 minutes
setInterval(() => cache.cleanup(), 15 * 60 * 1000);

/** Shared TTL constants (ms) */
export const TTL = {
  FEATURED:     24 * 60 * 60 * 1000, // 24 h  — daily rotating destinations
  AUTOCOMPLETE:  5 * 60 * 1000,      //  5 min — search suggestions
  SEARCH:       30 * 60 * 1000,      // 30 min — search results
  DESTINATION:   1 * 60 * 60 * 1000, //  1 h   — detail page
  AMENITIES:     2 * 60 * 60 * 1000, //  2 h   — nearby POIs
  IMAGE:        24 * 60 * 60 * 1000, // 24 h   — Unsplash images
  WIKIPEDIA:    24 * 60 * 60 * 1000, // 24 h   — descriptions
} as const;