// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Trash2 } from 'lucide-react';

// export default function SavedTrips() {
//   const [savedTrips, setSavedTrips] = useState<any[]>([]);

//   useEffect(() => {
//     const storedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
//     setSavedTrips(storedTrips);
//   }, []);

//   const handleDelete = (id: string) => {
//     const updated = savedTrips.filter(trip => trip.id !== id);
//     localStorage.setItem('savedTrips', JSON.stringify(updated));
//     setSavedTrips(updated);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <h1 className="text-3xl font-bold mb-4">Your Saved Trips</h1>

//       {savedTrips.length === 0 ? (
//         <p className="text-muted-foreground">No trips saved yet.</p>
//       ) : (
//         savedTrips.map(trip => (
//           <Card key={trip.id} className="border-2 hover:border-primary/40">
//             <CardHeader>
//               <CardTitle>{trip.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground mb-3">{trip.tagline}</p>
//               <div className="flex justify-between">
//                 <Button
//                   variant="destructive"
//                   onClick={() => handleDelete(trip.id)}
//                 >
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </div>
//   );
// }

// src/pages/SavedTripsPage.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getSavedTrips,
  deleteTrip,
  updateTripDates,
  type SavedTrip,
} from '@/lib/tripStorage';
import {
  Trash2,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  ArrowRight,
  Edit,
  Check,
  Sparkles,
  Trash,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle, 
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function SavedTrips() {
  const navigate = useNavigate();
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = () => {
    const trips = getSavedTrips();
    setSavedTrips(trips);
  };
    
  const handleDelete = (tripId: string) => {
    deleteTrip(tripId);
    loadTrips();
  };

  const handleExplore = (trip: SavedTrip) => {
    navigate(`/destination/${trip.destinationName.toLowerCase()}`, {
      state: {
        hotels: [],
        images: [],
        location: {
          city: trip.destinationName,
          country: trip.country,
          description: trip.vibeDescription,
        },
      },
    });
  };

  if (savedTrips.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-12">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">No Saved Trips Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start planning your dream vacation and save destinations you love!
            </p>
            <Button size="lg" onClick={() => navigate('/find-destination')}>
              Find Destinations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <h1 className="text-4xl font-bold mb-2">My Saved Trips</h1>
          <p className="text-muted-foreground text-lg">
            {savedTrips.length}{' '}
            {savedTrips.length === 1 ? 'destination' : 'destinations'} saved
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="space-y-6">
          {savedTrips.map(trip => (
            <Card
              key={trip.id}
              className="border-2 hover:border-primary/50 transition-all"
            >
              <CardHeader className="bg-muted/30 border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-1">
                      {trip.destinationName}, {trip.country}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {trip.tagline}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="text-lg px-4 py-2">
                      {trip.score}% Match
                    </Badge>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-center text-2xl">
                            Delete This Trip?
                          </DialogTitle>
                          <DialogDescription className="text-center text-base pt-2">
                            Delete trip to visit{' '}
                            {trip.destinationName.split(',')[0]}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-3 pt-4">
                          <DialogClose>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                handleDelete(trip.id);
                                toast('deleted successfully');
                              }}
                              className="w-full"
                            >
                              <Trash className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </DialogClose>

                          <DialogClose className="">
                            <Button variant={'outline'} className="w-full">
                              close
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                {/* Trip Dates if confirmed */}
                {trip.tripDates && trip.tripDates.confirmed && (
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <Calendar className="w-4 h-4" />
                      Travel Dates Confirmed
                    </div>
                    <p className="text-sm">
                      {format(
                        new Date(trip.tripDates.startDate),
                        'MMMM dd, yyyy'
                      )}{' '}
                      -{' '}
                      {format(
                        new Date(trip.tripDates.endDate),
                        'MMMM dd, yyyy'
                      )}
                    </p>
                  </div>
                )}

                <p className="text-muted-foreground">
                  {trip.personalizedMessage}
                </p>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Highlights
                    </h4>
                    <ul className="space-y-2">
                      {trip.highlights.slice(0, 4).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      Best For
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trip.bestFor.slice(0, 4).map((item, i) => (
                        <Badge key={i} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">
                        Estimated Daily Cost
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        ${trip.estimatedBudget.perDay}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Saved on {format(new Date(trip.savedAt), 'MMM dd, yyyy')}
                  </div>
                  <Button size="lg" onClick={() => handleExplore(trip)}>
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
