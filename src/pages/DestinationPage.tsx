import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { MapPin, Star, DollarSign } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  priceLevel: number;
}

export function DestinationsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const res = await api.get<{ destinations: Destination[] }>('/destinations');
      return res.destinations;
    },
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading destinations...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-600">Failed to load destinations</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Explore Destinations</h1>
        <p className="text-muted-foreground">Discover your next adventure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((destination) => (
          <Link key={destination.id} to={`/destinations/${destination.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className="aspect-video overflow-hidden">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{destination.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {destination.country}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{destination.rating}</span>
                    <span className="text-muted-foreground">({destination.reviewCount})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {destination.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-muted-foreground">
                  {Array.from({ length: destination.priceLevel }).map((_, i) => (
                    <DollarSign key={i} className="h-4 w-4" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}