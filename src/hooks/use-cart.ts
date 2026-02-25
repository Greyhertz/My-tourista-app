import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  itemType: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  destinationId: string;
  destinationName: string;
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  pricePerNight: number | null;
  totalPrice: number;
  createdAt: string;
  metadata: string | null;
}

export function useCart() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get cart items
  const { data: items = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await api.get<{ items: CartItem[] }>('/cart');
      return res.items;
    },
    enabled: !!user && !user.isAnonymous,
  });

  // Add to cart mutation
  const addMutation = useMutation({
    mutationFn: async (item: Omit<CartItem, 'id' | 'createdAt'>) => {
      return api.post('/cart', item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({ title: 'Added to cart!' });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to add to cart',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Remove from cart mutation
  const removeMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return api.delete(`/cart/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({ title: 'Removed from cart' });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to remove',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Clear cart mutation
  const clearMutation = useMutation({
    mutationFn: async () => {
      return api.delete('/cart');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({ title: 'Cart cleared' });
    },
  });

  return {
    items,
    isLoading,
    addToCart: addMutation.mutate,
    removeFromCart: removeMutation.mutate,
    clearCart: clearMutation.mutate,
    isAdding: addMutation.isPending,
  };
}