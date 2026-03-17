import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Star, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ReviewFormProps {
  propertyId: string;
  propertyName: string;
}

export function ReviewForm({ propertyId, propertyName }: ReviewFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createReviewMutation = useMutation({
    mutationFn: async () => {
      return api.post('/reviews', {
        propertyId,
        propertyName,
        rating,
        title,
        content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', propertyId] });
      toast({ title: 'Review posted successfully!' });
      setOpen(false);
      setRating(0);
      setTitle('');
      setContent('');
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to post review',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const isVerified = user && user.emailVerified;
  const canSubmit = rating > 0 && title.trim() && content.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      createReviewMutation.mutate();
    }
  };

  if (!isVerified) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please verify your email to write reviews.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Write a Review</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience at {propertyName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground self-center">
                  {rating} star{rating !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Review Title *</Label>
            <Input
              id="title"
              placeholder="Sum up your experience"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              required
            />
            <p className="text-xs text-muted-foreground">
              {title.length}/100 characters
            </p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Your Review *</Label>
            <Textarea
              id="content"
              placeholder="Tell us about your stay..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              maxLength={1000}
              required
            />
            <p className="text-xs text-muted-foreground">
              {content.length}/1000 characters
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit || createReviewMutation.isPending}
            >
              {createReviewMutation.isPending ? 'Posting...' : 'Post Review'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}