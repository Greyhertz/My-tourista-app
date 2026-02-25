import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/use-cart';
import { AuthGateDialog } from '@/components/core/AuthGateDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowLeft } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  imageUrl: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
}

export function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addToCart, isAdding } = useCart();
  const [showAuthGate, setShowAuthGate] = useState(false);

  interface Destination {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    country: string;
    rating: number;
    reviewCount: number;
    highlights: string[];
  }

  interface DestinationQueryResult {
    destination: Destination;
    hotels: Hotel[];
  }

  const { data, isLoading } = useQuery<DestinationQueryResult>({
    queryKey: ['destination', id],
    queryFn: async () => {
      const res = await api.get(`/destinations/${id}`);
      return res;
    },
    enabled: !!id,
  });

//   const { data, isLoading } = useQuery<DestinationQueryResult>({
//   queryKey: ['destination', id],
//   queryFn: async () => {
//     const res = await api.get(`/destinations/${id}`);
//     return res;  // ✅ Changed from res.data
//   },
//   enabled: !!id,
// }); 

  const handleAddToCart = (hotel: Hotel) => {
    if (!user) {
      setShowAuthGate(true);
      return;
    }

    if (!data?.destination) return;

    addToCart({
      itemType: 'hotel',
      itemId: hotel.id,
      itemName: hotel.name,
      itemImage: hotel.imageUrl,
      destinationId: data.destination.id,
      destinationName: data.destination.name,
      checkIn: null,
      checkOut: null,
      guests: 1,
      pricePerNight: hotel.pricePerNight,
      totalPrice: hotel.pricePerNight,
      metadata: null,
    });
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!data?.destination) {
    return <div className="container mx-auto px-4 py-8">Destination not found</div>;
  }

  const { destination, hotels } = data as unknown as DestinationQueryResult;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <Link to="/destinations">
              <Button variant="ghost" className="text-white mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to destinations
              </Button>
            </Link>
            <h1 className="text-5xl font-bold mb-2">{destination.name}</h1>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {destination.country}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {destination.rating} ({destination.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
          <p className="text-muted-foreground">{destination.description}</p>
        </div>

        {/* Highlights */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Highlights</h3>
          <div className="flex flex-wrap gap-2">
            {destination.highlights.map((highlight: string) => (
              <Badge key={highlight} variant="secondary">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hotels */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Where to Stay</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel: Hotel) => (
              <Card key={hotel.id}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{hotel.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {hotel.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{hotel.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {hotel.reviewCount} reviews
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        ${(hotel.pricePerNight / 100).toFixed(0)}
                      </p>
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
      </div>

      <AuthGateDialog open={showAuthGate} onOpenChange={setShowAuthGate} />
    </div>
  );
}