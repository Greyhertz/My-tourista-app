import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface Review {
  id: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
}

interface ReviewsListProps {
  propertyId: string;
}

export function ReviewsList({ propertyId }: ReviewsListProps) {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews', propertyId],
    queryFn: async () => {
      const res = await api.get<{ reviews: Review[] }>(`/reviews/property/${propertyId}`);
      return res.reviews;
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No reviews yet. Be the first to review!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>
                  {review.userId.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{review.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {review.content}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}