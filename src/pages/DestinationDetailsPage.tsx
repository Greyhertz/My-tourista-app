import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/use-cart';
import { AuthGateDialog } from '@/components/auth/AuthGateDialog';
import { ReviewForm } from '@/components/review-form';
import { ReviewsList } from '@/components/review-list';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MapPin, Star, ArrowLeft, Globe, ExternalLink,
  Utensils, Building2, Landmark, Leaf, Heart, Trophy,
  ShoppingBag, Film, Train, Wifi, Accessibility,
  ChevronDown, ChevronUp, Phone, Clock, DollarSign,
} from 'lucide-react';

// ─── null-safe array helper ───────────────────────────────────────────────────
function arr<T>(x: T[] | undefined | null): T[] {
  return Array.isArray(x) ? x : [];
}

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Place {
  name: string; address: string; lat: number; lon: number;
  website?: string | null; phone?: string | null;
  openNow?: boolean | null; openingHours?: string | null;
  wheelchair: boolean; internetAccess: boolean;
  fee?: boolean; distance?: number | null;
}

interface Hotel {
  id: string; name: string; description: string;
  pricePerNight: number; imageUrl: string;
  amenities: string[]; rating: number; reviewCount: number;
}

interface GalleryPhoto { url: string; thumb: string; credit: string; creditUrl: string; }

interface Destination {
  id: string; name: string; country: string;
  description: string; wikiUrl?: string | null;
  imageUrl: string; gallery?: GalleryPhoto[];
  highlights?: string[]; rating?: number; reviewCount?: number;
  lat: number; lon: number;
  // DB fields
  latitude?: number; longitude?: number;
}

interface Amenities {
  food:          { restaurants: Place[]; cafes: Place[]; bars: Place[] };
  accommodation: Place[];
  healthcare:    Place[];
  nature:        Place[];
  tourism:       { attractions: Place[]; museums: Place[]; viewpoints: Place[] };
  sports:        Place[];
  shopping:      Place[];
  entertainment: Place[];
  transport:     Place[];
  services:      Place[];
  wheelchairAccessible: Place[];
  wifiSpots:     Place[];
}

// ─── PlaceCard ─────────────────────────────────────────────────────────────────

function PlaceCard({ p }: { p: Place }) {
  const [exp, setExp] = useState(false);
  const dist = p.distance
    ? p.distance < 1000 ? `${Math.round(p.distance)}m` : `${(p.distance / 1000).toFixed(1)}km`
    : null;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm truncate">{p.name}</p>
            {p.address && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                <MapPin className="inline h-2.5 w-2.5 mr-0.5" />{p.address}
              </p>
            )}
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1">
            {dist && <span className="text-xs text-muted-foreground">{dist}</span>}
            {p.fee && (
              <Badge variant="secondary" className="text-[10px] h-4 gap-0.5">
                <DollarSign className="h-2.5 w-2.5" />Paid
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          {p.wheelchair     && <Accessibility className="h-3.5 w-3.5 text-cyan-500" title="Wheelchair accessible" />}
          {p.internetAccess && <Wifi className="h-3.5 w-3.5 text-blue-500" title="WiFi available" />}
          {p.openNow === true  && <span className="text-[10px] font-medium text-emerald-500">Open now</span>}
          {p.openNow === false && <span className="text-[10px] font-medium text-red-400">Closed</span>}
        </div>

        {(p.website || p.phone || p.openingHours) && (
          <>
            <button onClick={() => setExp(v => !v)}
              className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              {exp ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {exp ? 'Less' : 'Details'}
            </button>
            {exp && (
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                {p.phone && <a href={`tel:${p.phone}`} className="flex items-center gap-1 hover:text-foreground"><Phone className="h-3 w-3" />{p.phone}</a>}
                {p.openingHours && <p className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.openingHours}</p>}
                {p.website && (
                  <a href={p.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-foreground truncate">
                    <Globe className="h-3 w-3 shrink-0" />
                    <span className="truncate">{p.website.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ─── PlaceList ─────────────────────────────────────────────────────────────────

function PlaceList({ title, places }: { title: string; places: Place[] }) {
  const [showAll, setShowAll] = useState(false);
  const list = arr(places);
  if (!list.length) return (
    <p className="text-center py-6 text-sm text-muted-foreground">No {title.toLowerCase()} found nearby</p>
  );
  const shown = showAll ? list : list.slice(0, 6);
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide font-semibold">
        {title} ({list.length})
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {shown.map((p, i) => <PlaceCard key={i} p={p} />)}
      </div>
      {list.length > 6 && (
        <button onClick={() => setShowAll(v => !v)} className="mt-3 text-xs text-primary hover:underline">
          {showAll ? 'Show less' : `Show all ${list.length}`}
        </button>
      )}
    </div>
  );
}

// ─── Gallery ───────────────────────────────────────────────────────────────────

function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState(0);
  const list = arr(photos);
  if (!list.length) return null;
  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden aspect-video mb-3 bg-muted">
        <img src={list[active]?.url} alt="" className="w-full h-full object-cover" />
        {list[active]?.creditUrl && (
          <a href={list[active].creditUrl} target="_blank" rel="noopener noreferrer"
            className="absolute bottom-2 right-2 text-[10px] text-white/60 hover:text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
            © {list[active].credit} / Unsplash
          </a>
        )}
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((p, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`shrink-0 h-16 w-24 rounded-lg overflow-hidden ring-2 transition-all ${
                i === active ? 'ring-primary' : 'ring-transparent opacity-50 hover:opacity-100'
              }`}>
              <img src={p.thumb || p.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addToCart, isAdding } = useCart();
  const [showAuthGate, setShowAuthGate] = useState(false);

  // Backend returns { success, destination, hotels, amenities }
  const { data, isLoading, isError, error, refetch } = useQuery<{
    success: boolean;
    destination: Destination;
    hotels: Hotel[];
    amenities: Amenities;
  }>({
    queryKey: ['destination', id],
    queryFn: async () => {
      if (!window.navigator.onLine) throw new Error('No internet connection');
      const res = await api.get<{ success: boolean; destination: Destination; hotels: Hotel[]; amenities: Amenities }>(
        `/destinations/${id}`
      );
      if (!res?.destination) throw new Error('Destination not found in response');
      return res;
    },
    enabled:    !!id,
    staleTime:  60 * 60 * 1000,
    retry:      2,
    retryDelay: 1500,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-96 w-full rounded-none" />
        <div className="container mx-auto px-4 py-8 space-y-4 max-w-5xl">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data?.destination) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <p className="text-5xl mb-4">⚠️</p>
        <h2 className="text-xl font-bold text-destructive mb-2">Something went wrong</h2>
        <p className="text-sm text-muted-foreground mb-6">{(error as Error)?.message || 'Could not load destination'}</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => refetch()}>Try Again</Button>
          <Button variant="outline" asChild><Link to="/destinations">← Back</Link></Button>
        </div>
      </div>
    );
  }

  const { destination: d, hotels, amenities: a = {} as Amenities } = data;

  // Null-safe destructuring of every amenity group
  const food          = a.food          ?? { restaurants: [], cafes: [], bars: [] };
  const restaurants   = arr(food.restaurants);
  const cafes         = arr(food.cafes);
  const bars          = arr(food.bars);
  const accommodation = arr(a.accommodation);
  const healthcare    = arr(a.healthcare);
  const nature        = arr(a.nature);
  const tourism       = a.tourism        ?? { attractions: [], museums: [], viewpoints: [] };
  const attractions   = arr(tourism.attractions);
  const museums       = arr(tourism.museums);
  const viewpoints    = arr(tourism.viewpoints);
  const sports        = arr(a.sports);
  const shopping      = arr(a.shopping);
  const entertainment = arr(a.entertainment);
  const transport     = arr(a.transport);
  const accessible    = arr(a.wheelchairAccessible);
  const wifi          = arr(a.wifiSpots);

  const totalFood   = restaurants.length + cafes.length;
  const totalSights = attractions.length + museums.length;

  function handleAddToCart(hotel: Hotel) {
    if (!user) { setShowAuthGate(true); return; }
    addToCart({
      itemType: 'hotel', itemId: hotel.id, itemName: hotel.name,
      itemImage: hotel.imageUrl, destinationId: d.id, destinationName: d.name,
      checkIn: null, checkOut: null, guests: 1,
      pricePerNight: hotel.pricePerNight, totalPrice: hotel.pricePerNight, metadata: null,
    });
  }

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <img src={d.imageUrl} alt={d.name} className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-5xl">
            <Link to="/destinations">
              <Button variant="ghost" className="text-white hover:bg-white/20 mb-4 -ml-3">
                <ArrowLeft className="mr-2 h-4 w-4" />Back to destinations
              </Button>
            </Link>
            <div className="flex gap-2 mb-2">
              {accessible.length > 2 && <Badge className="bg-cyan-500/90 text-white border-0 gap-1"><Accessibility className="h-3 w-3" />Accessible</Badge>}
              {wifi.length > 0        && <Badge className="bg-blue-500/90 text-white border-0 gap-1"><Wifi className="h-3 w-3" />WiFi Spots</Badge>}
            </div>
            <h1 className="text-5xl font-bold mb-2">{d.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{d.country}</span>
              {d.rating != null && (
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {typeof d.rating === 'number' ? d.rating.toFixed(1) : d.rating}
                  {(d.reviewCount ?? 0) > 0 && <span className="text-white/70">({d.reviewCount} reviews)</span>}
                </span>
              )}
              {d.wikiUrl && (
                <a href={d.wikiUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
                  <Globe className="h-3.5 w-3.5" />Wikipedia<ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-10">

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { Icon: Utensils,  label: 'Food & Drink',  value: totalFood },
            { Icon: Building2, label: 'Hotels',         value: accommodation.length },
            { Icon: Landmark,  label: 'Attractions',    value: totalSights },
            { Icon: Leaf,      label: 'Nature',         value: nature.length },
          ].map(({ Icon, label, value }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-3 pt-4 pb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold leading-none">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">About {d.name}</h2>
          <p className="text-muted-foreground leading-relaxed">{d.description}</p>
        </div>

        {/* Highlights */}
        {arr(d.highlights).length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {arr(d.highlights).map((h: string) => <Badge key={h} variant="secondary">{h}</Badge>)}
            </div>
          </div>
        )}

        {/* Gallery */}
        {arr(d.gallery).length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Gallery</h3>
            <Gallery photos={arr(d.gallery)} />
          </div>
        )}

        <Separator />

        {/* Plan Your Visit — full amenities tabs */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Plan Your Visit</h2>
          <p className="text-sm text-muted-foreground mb-6">Live places within 10 km</p>

          <Tabs defaultValue="food">
            <div className="overflow-x-auto -mx-4 px-4 mb-6">
              <TabsList className="inline-flex h-auto gap-1 flex-nowrap">
                <TabsTrigger value="food"          className="gap-1 text-xs whitespace-nowrap"><Utensils     className="h-3 w-3" />Food ({totalFood})</TabsTrigger>
                <TabsTrigger value="accommodation" className="gap-1 text-xs whitespace-nowrap"><Building2    className="h-3 w-3" />Hotels ({accommodation.length})</TabsTrigger>
                <TabsTrigger value="tourism"       className="gap-1 text-xs whitespace-nowrap"><Landmark     className="h-3 w-3" />Sights ({totalSights})</TabsTrigger>
                <TabsTrigger value="nature"        className="gap-1 text-xs whitespace-nowrap"><Leaf         className="h-3 w-3" />Nature ({nature.length})</TabsTrigger>
                <TabsTrigger value="healthcare"    className="gap-1 text-xs whitespace-nowrap"><Heart        className="h-3 w-3" />Health ({healthcare.length})</TabsTrigger>
                <TabsTrigger value="sports"        className="gap-1 text-xs whitespace-nowrap"><Trophy       className="h-3 w-3" />Sports ({sports.length})</TabsTrigger>
                <TabsTrigger value="shopping"      className="gap-1 text-xs whitespace-nowrap"><ShoppingBag  className="h-3 w-3" />Shop ({shopping.length})</TabsTrigger>
                <TabsTrigger value="entertainment" className="gap-1 text-xs whitespace-nowrap"><Film         className="h-3 w-3" />Fun ({entertainment.length})</TabsTrigger>
                <TabsTrigger value="transport"     className="gap-1 text-xs whitespace-nowrap"><Train        className="h-3 w-3" />Transit ({transport.length})</TabsTrigger>
                <TabsTrigger value="accessible"    className="gap-1 text-xs whitespace-nowrap"><Accessibility className="h-3 w-3" />Access ({accessible.length})</TabsTrigger>
                <TabsTrigger value="wifi"          className="gap-1 text-xs whitespace-nowrap"><Wifi         className="h-3 w-3" />WiFi ({wifi.length})</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="food">
              <div className="space-y-6">
                <PlaceList title="Restaurants"       places={restaurants} />
                <PlaceList title="Cafés"             places={cafes} />
                <PlaceList title="Bars & Nightlife"  places={bars} />
              </div>
            </TabsContent>
            <TabsContent value="accommodation"><PlaceList title="Hotels & Stays"                  places={accommodation} /></TabsContent>
            <TabsContent value="tourism">
              <div className="space-y-6">
                <PlaceList title="Top Attractions"      places={attractions} />
                <PlaceList title="Museums & Galleries"  places={museums} />
                <PlaceList title="Viewpoints"           places={viewpoints} />
              </div>
            </TabsContent>
            <TabsContent value="nature">       <PlaceList title="Parks, Beaches & Gardens"        places={nature} /></TabsContent>
            <TabsContent value="healthcare">   <PlaceList title="Hospitals, Clinics & Pharmacies" places={healthcare} /></TabsContent>
            <TabsContent value="sports">       <PlaceList title="Stadiums & Sports Centres"       places={sports} /></TabsContent>
            <TabsContent value="shopping">     <PlaceList title="Malls, Markets & Shops"          places={shopping} /></TabsContent>
            <TabsContent value="entertainment"><PlaceList title="Cinemas, Theatres & Casinos"     places={entertainment} /></TabsContent>
            <TabsContent value="transport">    <PlaceList title="Getting Around"                  places={transport} /></TabsContent>
            <TabsContent value="accessible">   <PlaceList title="Wheelchair Accessible Places"    places={accessible} /></TabsContent>
            <TabsContent value="wifi">         <PlaceList title="WiFi & Internet Access"          places={wifi} /></TabsContent>
          </Tabs>
        </div>

        {/* Hotels from DB */}
        {arr(hotels).length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-2xl font-bold mb-4">Where to Stay</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {arr(hotels).map((hotel) => (
                  <Card key={hotel.id}>
                    <div className="aspect-video overflow-hidden">
                      <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{hotel.name}</CardTitle>
                          <CardDescription className="mt-2">{hotel.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{hotel.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{hotel.reviewCount} reviews</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {arr(hotel.amenities).slice(0, 4).map(a => (
                          <Badge key={a} variant="outline" className="text-xs">{a}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold">${(hotel.pricePerNight / 100).toFixed(0)}</p>
                          <p className="text-xs text-muted-foreground">per night</p>
                        </div>
                        <Button onClick={() => handleAddToCart(hotel)} disabled={isAdding}>
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Reviews</h3>
            <ReviewForm propertyId={d.id} propertyName={d.name} />
          </div>
          <ReviewsList propertyId={d.id} />
        </div>

      </div>

      <AuthGateDialog open={showAuthGate} onOpenChange={setShowAuthGate} />
    </div>
  );
}