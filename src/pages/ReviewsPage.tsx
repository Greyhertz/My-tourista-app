import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Star, Trash2, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface Review {
  id: string;
  propertyId: string;
  propertyName: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
}

export function MyReviewsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['my-reviews'],
    queryFn: async () => {
      const res = await api.get<{ reviews: Review[] }>('/reviews/my-reviews');
      return res.reviews;
    },
    enabled: !!user && !user.isAnonymous,
  });

  const deleteMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      return api.delete(`/reviews/${reviewId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-reviews'] });
      toast({ title: 'Review deleted successfully' });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to delete review',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (!user || user.isAnonymous) {
    navigate('/signin');
    return null;
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading reviews...</div>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">No reviews yet</h2>
        <p className="text-muted-foreground mb-6">
          Start exploring destinations and share your experiences
        </p>
        <Button onClick={() => navigate('/destinations')}>
          Browse Destinations
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Reviews</h1>
        <p className="text-muted-foreground">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{review.propertyName}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this review?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your review for{' '}
                        <strong>{review.propertyName}</strong>. This action cannot be
                        undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(review.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete Review
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">{review.title}</h3>
              <p className="text-sm text-muted-foreground">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}