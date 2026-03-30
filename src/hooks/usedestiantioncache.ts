/**
 * useDestinationCache
 *
 * Two-layer client cache:
 *   1. React Query in-memory cache (fastest, cleared on tab close)
 *   2. localStorage persistent cache (survives across sessions)
 *
 * When a user has searched a destination before, we show it instantly
 * from localStorage and optionally refresh in the background.
 */

import { useCallback } from 'react';

const LS_KEY = 'travel_destination_cache';
const MAX_ENTRIES = 30;

export interface CachedDestination {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  lat: number;
  lon: number;
  cachedAt: number; // unix ms
}

function readCache(): Record<string, CachedDestination> {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeCache(data: Record<string, CachedDestination>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    // storage quota exceeded — evict oldest half
    const entries = Object.entries(data).sort((a, b) => a[1].cachedAt - b[1].cachedAt);
    const trimmed = Object.fromEntries(entries.slice(entries.length / 2));
    try { localStorage.setItem(LS_KEY, JSON.stringify(trimmed)); } catch { /* give up */ }
  }
}

export function useDestinationCache() {
  /** Save a destination to localStorage after the user visits it */
  const saveDestination = useCallback((dest: Omit<CachedDestination, 'cachedAt'>) => {
    const store = readCache();

    // Evict oldest if over limit
    const entries = Object.values(store).sort((a, b) => b.cachedAt - a.cachedAt);
    if (entries.length >= MAX_ENTRIES) {
      const toDelete = entries.slice(MAX_ENTRIES - 1);
      for (const e of toDelete) delete store[e.id];
    }

    store[dest.id] = { ...dest, cachedAt: Date.now() };
    writeCache(store);
  }, []);

  /** Get a single cached destination by ID */
  const getCachedDestination = useCallback((id: string): CachedDestination | null => {
    return readCache()[id] ?? null;
  }, []);

  /** Get all cached destinations (recently visited / searched) */
  const getRecentDestinations = useCallback((): CachedDestination[] => {
    const store = readCache();
    return Object.values(store).sort((a, b) => b.cachedAt - a.cachedAt);
  }, []);

  /** Check if a destination has been cached (no need to show loader) */
  const isCached = useCallback((id: string): boolean => {
    return !!readCache()[id];
  }, []);

  /** Remove a specific destination */
  const removeDestination = useCallback((id: string) => {
    const store = readCache();
    delete store[id];
    writeCache(store);
  }, []);

  /** Clear entire cache */
  const clearCache = useCallback(() => {
    localStorage.removeItem(LS_KEY);
  }, []);

  return {
    saveDestination,
    getCachedDestination,
    getRecentDestinations,
    isCached,
    removeDestination,
    clearCache,
  };
}