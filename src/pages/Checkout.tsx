import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/use-cart';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { DateRangePicker } from '@/components/core/DateRangePicker';
import { Calendar, Users, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BookingDates {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
}

export function CheckoutPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookingDates, setBookingDates] = useState<Record<string, BookingDates>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const createBookingsMutation = useMutation({
    mutationFn: async () => {
      // Only book items that have complete dates
      const validItems = items.filter(
        item => bookingDates[item.id]?.checkIn && bookingDates[item.id]?.checkOut
      );

      const bookings = validItems.map(item => {
        const dates = bookingDates[item.id];
        const nights = differenceInDays(dates.checkOut!, dates.checkIn!);
        const totalPrice = (item.pricePerNight || 0) * nights;

        return {
          hotelId: item.itemId,
          hotelName: item.itemName,
          checkIn: dates.checkIn!.toISOString(),
          checkOut: dates.checkOut!.toISOString(),
          guests: item.guests || 1,
          totalPrice,
        };
      });

      const promises = bookings.map(booking => api.post('/bookings', booking));
      return Promise.all(promises);
    },
    onSuccess: () => {
      clearCart();
      setShowConfirmDialog(false);
      toast({
        title: 'Bookings confirmed!',
        description: 'Your reservations have been confirmed.',
      },
        { dismiss: true },
        
      );
      navigate('/bookings');
    },
    onError: (error: any) => {
      setShowConfirmDialog(false);
      toast({
        title: 'Booking failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const updateDates = (itemId: string, checkIn: Date | undefined, checkOut: Date | undefined) => {
    setBookingDates(prev => ({
      ...prev,
      [itemId]: { checkIn, checkOut },
    }));
  };

  const calculateNights = (itemId: string) => {
    const dates = bookingDates[itemId];
    if (!dates?.checkIn || !dates?.checkOut) return 0;
    return differenceInDays(dates.checkOut, dates.checkIn);
  };

  const calculateItemTotal = (item: any) => {
    const nights = calculateNights(item.id);
    if (nights === 0) return 0;
    return (item.pricePerNight || 0) * nights;
  };

  const itemsWithDates = items.filter(
    item => bookingDates[item.id]?.checkIn && bookingDates[item.id]?.checkOut
  );

  const itemsWithoutDates = items.filter(
    item => !bookingDates[item.id]?.checkIn || !bookingDates[item.id]?.checkOut
  );

  const grandTotal = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const totalNights = items.reduce((sum, item) => sum + calculateNights(item.id), 0);

  const canProceed = itemsWithDates.length > 0;

  const handleConfirmClick = () => {
    if (canProceed) {
      setShowConfirmDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-muted-foreground">Review your selections and confirm dates</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Booking Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => {
              const nights = calculateNights(item.id);
              const itemTotal = calculateItemTotal(item);
              const dates = bookingDates[item.id];
              const hasValidDates = dates?.checkIn && dates?.checkOut;

              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="bg-slate-50">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.itemImage}
                            alt={item.itemName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-1">{item.itemName}</CardTitle>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.destinationName}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Users className="h-3 w-3" />
                            {item.guests} guest{item.guests > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge variant="secondary">Item {index + 1}</Badge>
                        {hasValidDates && (
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Ready
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <DateRangePicker
                      checkIn={dates?.checkIn}
                      checkOut={dates?.checkOut}
                      onCheckInChange={(date) => updateDates(item.id, date, dates?.checkOut)}
                      onCheckOutChange={(date) => updateDates(item.id, dates?.checkIn, date)}
                    />

                    {nights > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {nights} night{nights > 1 ? 's' : ''}
                          </span>
                          <span className="font-medium">
                            ${((item.pricePerNight || 0) / 100).toFixed(0)} × {nights}
                          </span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Subtotal</span>
                          <span className="text-lg font-bold text-blue-600">
                            ${(itemTotal / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}

                    {!hasValidDates && (
                      <Alert className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Select dates to include this in your booking
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ready to Book</span>
                    <span className="font-medium text-green-600">
                      {itemsWithDates.length} of {items.length}
                    </span>
                  </div>
                  {itemsWithoutDates.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Without Dates</span>
                      <span className="font-medium text-orange-600">
                        {itemsWithoutDates.length}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Nights</span>
                    <span className="font-medium">{totalNights}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Guests</span>
                    <span className="font-medium">
                      {items.reduce((sum, item) => sum + (item.guests || 0), 0)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${(grandTotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Fees</span>
                    <span className="text-muted-foreground">At property</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${(grandTotal / 100).toFixed(2)}
                  </span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleConfirmClick}
                  disabled={!canProceed}
                >
                  Confirm {itemsWithDates.length} Booking{itemsWithDates.length !== 1 ? 's' : ''}
                </Button>

                {!canProceed && (
                  <p className="text-xs text-center text-muted-foreground">
                    Select dates for at least one item
                  </p>
                )}

                {itemsWithoutDates.length > 0 && canProceed && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      {itemsWithoutDates.length} item{itemsWithoutDates.length !== 1 ? 's' : ''} will remain in cart
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Booking</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>You're about to book {itemsWithDates.length} accommodation{itemsWithDates.length !== 1 ? 's' : ''}:</p>
              <div className="space-y-2">
                {itemsWithDates.map(item => {
                  const dates = bookingDates[item.id];
                  const nights = calculateNights(item.id);
                  return (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-lg text-sm">
                      <p className="font-semibold text-slate-900">{item.itemName}</p>
                      <p className="text-slate-600">
                        {dates?.checkIn && format(dates.checkIn, 'MMM dd')} - {dates?.checkOut && format(dates.checkOut, 'MMM dd, yyyy')} ({nights} night{nights !== 1 ? 's' : ''})
                      </p>
                      <p className="text-slate-900 font-medium mt-1">
                        ${(calculateItemTotal(item) / 100).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
              <p className="font-semibold text-slate-900 pt-2">
                Total: ${(grandTotal / 100).toFixed(2)}
              </p>
              <p className="text-xs text-slate-600">
                By confirming, you agree to the booking terms and conditions.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => createBookingsMutation.mutate()}
              disabled={createBookingsMutation.isPending}
            >
              {createBookingsMutation.isPending ? 'Processing...' : 'Confirm Booking'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}