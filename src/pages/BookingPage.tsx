import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
import { Calendar, MapPin, Users, Trash2, Package } from 'lucide-react';
import { format } from 'date-fns';

interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export function BookingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await api.get<{ bookings: Booking[] }>('/bookings');
      return res.bookings;
    },
    enabled: !!user && !user.isAnonymous,
  });

  const cancelMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      return api.delete(`/bookings/${bookingId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({ title: 'Booking cancelled successfully' });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to cancel',
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
    return <div className="container mx-auto px-4 py-8">Loading bookings...</div>;
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">No bookings yet</h2>
        <p className="text-muted-foreground mb-6">
          Start exploring destinations and book your next adventure
        </p>
        <Button onClick={() => navigate('/destinations')}>
          Browse Destinations
        </Button>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">
          Manage your reservations and travel plans
        </p>
      </div>

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Trips</h2>
          <div className="grid gap-4">
            {upcomingBookings.map((booking) => {
              const checkInDate = new Date(booking.checkIn);
              const checkOutDate = new Date(booking.checkOut);
              const nights = Math.ceil(
                (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-1">
                          {booking.hotelName}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(checkInDate, 'MMM dd')} - {format(checkOutDate, 'MMM dd, yyyy')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-600">
                        Confirmed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {nights} night{nights !== 1 ? 's' : ''}
                        </p>
                        <p className="text-2xl font-bold">
                          ${(booking.totalPrice / 100).toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Booked {format(new Date(booking.createdAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel Booking
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel your reservation at{' '}
                              <strong>{booking.hotelName}</strong>?
                              <br />
                              <br />
                              Check-in: {format(checkInDate, 'MMMM dd, yyyy')}
                              <br />
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => cancelMutation.mutate(booking.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Cancel Booking
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Cancelled Bookings */}
      {cancelledBookings.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Cancelled</h2>
          <div className="grid gap-4">
            {cancelledBookings.map((booking) => {
              const checkInDate = new Date(booking.checkIn);
              const checkOutDate = new Date(booking.checkOut);

              return (
                <Card key={booking.id} className="opacity-60">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{booking.hotelName}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {format(checkInDate, 'MMM dd')} - {format(checkOutDate, 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <Badge variant="secondary">Cancelled</Badge>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}