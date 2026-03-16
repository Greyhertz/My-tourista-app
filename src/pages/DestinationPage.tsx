import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Star, Search, X, Clock, TrendingUp, Trash2, AlertCircle } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface FeaturedDest {
  id: string; name: string; country: string; imageUrl: string; rating?: number | string;
}

interface Suggestion {
  id: string; name: string; location: string; formatted: string;
  lat: number; lon: number; type: string;
}

interface RecentSearch { label: string; destId: string; savedAt: number; }

// ─── Helper: unwrap api response regardless of shape ─────────────────────────
// Handles BOTH:
//   api.get returns body directly  → res = { success, data: [...] }
//   api.get is axios-style          → res = { data: { success, data: [...] } }
function unwrap<T>(res: any, key: string): T[] {
  // Try direct body
  if (res?.[key] !== undefined) return res[key] ?? [];
  // Try axios-style (res.data is the body)
  if (res?.data?.[key] !== undefined) return res.data[key] ?? [];
  return [];
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

const LS_KEY = 'trav_recents_v3';
const readRecents  = (): RecentSearch[] => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } };
const pushRecent   = (e: RecentSearch)  => { const l = readRecents().filter(r => r.destId !== e.destId); localStorage.setItem(LS_KEY, JSON.stringify([e, ...l].slice(0, 8))); };
const clearRecents = ()                 => localStorage.removeItem(LS_KEY);

// ─── Page ─────────────────────────────────────────────────────────────────────

export function DestinationsPage() {
  const navigate = useNavigate();

  const [input,     setInput]     = useState('');
  const [open,      setOpen]      = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [recents,   setRecents]   = useState<RecentSearch[]>(readRecents);

  const inputRef = useRef<HTMLInputElement>(null);

  // ── Featured ─────────────────────────────────────────────────────────────────
  // Backend: GET /destinations/featured → { success, data: FeaturedDest[] }
  const {
    data: featured = [],
    isLoading: featuredLoading,
    isError: featuredError,
  } = useQuery<FeaturedDest[]>({
    queryKey: ['destinations-featured'],
    queryFn: async () => {
      const res = await api.get('/destinations/featured');
      // unwrap handles both api.get shapes
      return unwrap<FeaturedDest>(res, 'data');
    },
    staleTime: 24 * 60 * 60 * 1000,
  });

  // ── Autocomplete ─────────────────────────────────────────────────────────────
  // Backend: GET /destinations/autocomplete?q= → { success, suggestions: Suggestion[] }
  const { data: suggestions = [], isFetching: sugLoading } = useQuery<Suggestion[]>({
    queryKey: ['autocomplete', input],
    queryFn: async () => {
      const res = await api.get(`/destinations/autocomplete?q=${encodeURIComponent(input.trim())}`);
      return unwrap<Suggestion>(res, 'suggestions');
    },
    enabled: input.trim().length >= 1,
    staleTime: 3 * 60 * 1000,
  });

  // ── Helpers ───────────────────────────────────────────────────────────────────

  function goTo(id: string, label: string) {
    pushRecent({ destId: id, label, savedAt: Date.now() });
    setRecents(readRecents());
    setOpen(false);
    navigate(`/destinations/${id}`);
  }

  function pickSuggestion(s: Suggestion) {
    const geoId = s.id.startsWith('geo_') ? s.id : `geo_${s.lat.toFixed(4)}_${s.lon.toFixed(4)}`;
    setInput(s.name);
    goTo(geoId, s.name);
  }

  function commitSearch() {
    const q = input.trim();
    if (!q) return;
    if (suggestions.length > 0) {
      pickSuggestion(suggestions[activeIdx >= 0 ? activeIdx : 0]);
    } else {
      pushRecent({ destId: `q_${q}`, label: q, savedAt: Date.now() });
      setRecents(readRecents());
      setOpen(false);
      navigate(`/destinations/search?q=${encodeURIComponent(q)}`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown')  { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)); }
    else if (e.key === 'Enter')     { e.preventDefault(); commitSearch(); }
    else if (e.key === 'Escape')    { setOpen(false); }
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-primary" />
          Explore Destinations
        </h1>
        <p className="text-muted-foreground">Search any city, landmark, stadium, beach, or national park</p>
      </div>

      {/* ── Search ── */}
      <div className="relative mb-10 max-w-2xl">
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            placeholder="Paris, Eiffel Tower, Wembley, Bali…"
            onChange={e => { setInput(e.target.value); setActiveIdx(-1); setOpen(e.target.value.trim().length > 0); }}
            onFocus={() => { if (input.trim()) setOpen(true); }}
            onBlur={() => setOpen(false)}
            onKeyDown={handleKeyDown}
            className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-24 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {input && (
            <button onMouseDown={e => e.preventDefault()}
              onClick={() => { setInput(''); setOpen(false); inputRef.current?.focus(); }}
              className="absolute right-[4.5rem] text-muted-foreground hover:text-foreground p-1">
              <X className="h-4 w-4" />
            </button>
          )}
          <button onMouseDown={e => e.preventDefault()} onClick={commitSearch} disabled={!input.trim()}
            className="absolute right-1 top-1 bottom-1 px-4 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors">
            Search
          </button>
        </div>

        {/* Dropdown — onMouseDown preventDefault prevents blur-before-click */}
        {open && input.trim().length >= 1 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden">
            {sugLoading && suggestions.length === 0 ? (
              <div className="p-3 space-y-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex items-center gap-3 px-1">
                    <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                    <div className="flex-1 space-y-1.5"><Skeleton className="h-3 w-2/5" /><Skeleton className="h-2.5 w-3/5" /></div>
                  </div>
                ))}
              </div>
            ) : suggestions.length === 0 ? (
              <div className="px-4 py-4 text-sm text-muted-foreground">
                No suggestions for <span className="font-semibold text-foreground">"{input}"</span> — press Enter to search
              </div>
            ) : (
              <>
                {suggestions.map((s, i) => (
                  <button key={i} onMouseDown={e => e.preventDefault()} onClick={() => pickSuggestion(s)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`w-full text-left px-4 py-3 border-b last:border-b-0 flex items-start gap-3 transition-colors ${i === activeIdx ? 'bg-muted' : 'hover:bg-muted/60'}`}>
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{s.location || s.formatted}</p>
                    </div>
                    {s.type && <Badge variant="secondary" className="text-[10px] capitalize shrink-0">{s.type}</Badge>}
                  </button>
                ))}
                <div className="px-4 py-2 text-[11px] text-muted-foreground bg-muted/30 flex gap-3">
                  <span>↑↓ navigate</span><span>·</span><span>Enter to pick</span><span>·</span><span>Esc to close</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ── Recents ── */}
      {recents.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              <Clock className="h-3.5 w-3.5" /> Recent
            </h2>
            <button onClick={() => { clearRecents(); setRecents([]); }}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 className="h-3 w-3" /> Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recents.map((r, i) => (
              <button key={i}
                onClick={() => r.destId.startsWith('q_')
                  ? navigate(`/destinations/search?q=${encodeURIComponent(r.label)}`)
                  : navigate(`/destinations/${r.destId}`)
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-card text-sm hover:border-primary/50 transition-all group">
                <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                <span className="group-hover:text-primary transition-colors">{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Featured grid ── */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Featured Today</h2>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Refreshes daily</span>
      </div>

      {featuredError ? (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold text-sm">Could not load featured destinations</p>
            <p className="text-xs mt-0.5 opacity-80">
              Check that your backend is running and{' '}
              <code className="font-mono">GEOAPIFY_API_KEY</code> +{' '}
              <code className="font-mono">UNSPLASH_ACCESS_KEY</code> are set in .env
            </p>
          </div>
        </div>
      ) : featuredLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : featured.length === 0 ? (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted border">
          <AlertCircle className="h-5 w-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="font-semibold text-sm">No featured destinations returned</p>
            <p className="text-xs mt-0.5 text-muted-foreground">
              Open <code className="font-mono">/destinations/debug</code> in your browser to diagnose
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((dest) => (
            <Link key={dest.id} to={`/destinations/${dest.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800'; }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{dest.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                    <MapPin className="h-3 w-3" />{dest.country}
                  </p>
                  {dest.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {typeof dest.rating === 'number' ? dest.rating.toFixed(1) : dest.rating}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}