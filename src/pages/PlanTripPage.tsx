import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {
  MapPin,
  Calendar,
  Activity,
  DollarSign,
  Clock,
  Star,
  Mountain,
  Utensils,
  Camera,
  Sparkles,
  Check,
  ArrowLeft,
  Users,
  Download,
  Share2,
  Edit,
  Trash2,
  Plus,
  Save,
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { GeneratedItinerary } from '@/lib/trip-ai-engine';

export default function PlanTripPage() {
  const { state } = useLocation();
  const { city } = useParams();
  const navigate = useNavigate();

  if (!state || !state.itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-muted">
              <Calendar className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl">No Trip Plan Found</CardTitle>
            <CardDescription>
              Please generate a trip plan from the destination page first.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                It seems you accessed this page directly without generating a
                trip plan. Please go back to the destination page to create your
                personalized itinerary.
              </AlertDescription>
            </Alert>
            <Button
              variant="link"
              className="w-full"
              onClick={() => navigate(`/destination/${city}`)}
            >
              Back to Destination Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { itinerary, preferences} = state as {
    itinerary: GeneratedItinerary;
    preferences: any;
    destination: any;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b top-0 mt-20 bg-background/95 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(`/destination/${city}`)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Destination
            </Button>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Trip
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm">
                <Check className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">
              Your {itinerary.destination} Adventure
            </h1>
          </div>
          <p className="text-muted-foreground text-lg ml-15">
            {format(itinerary.days[0].date, 'MMM dd')} -{' '}
            {format(
              itinerary.days[itinerary.days.length - 1].date,
              'MMM dd, yyyy'
            )}
          </p>
        </div>

        {/* Personalized Message */}
        <Card className="border-2 border-primary/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Your Personalized Journey
                </h3>
                <p className="text-muted-foreground">
                  {itinerary.personalizedMessage}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trip Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">
                  {itinerary.days.length}
                </div>
                <div className="text-sm text-muted-foreground">Days</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">
                  {itinerary.days.reduce(
                    (sum, day) => sum + day.activities.length,
                    0
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Activities</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">
                  {preferences.travelers}
                </div>
                <div className="text-sm text-muted-foreground">Travelers</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">${itinerary.totalCost}</div>
                <div className="text-sm text-muted-foreground">Total Cost</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Itinerary */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Itinerary</h2>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>

          {itinerary.days.map(day => (
            <Card
              key={day.id}
              className="border-2 hover:border-primary/30 transition-all"
            >
              <CardHeader className="bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {day.day}
                    </div>
                    <div>
                      <CardTitle className="text-xl">Day {day.day}</CardTitle>
                      <CardDescription>
                        {format(day.date, 'EEEE, MMMM dd, yyyy')}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm px-4 py-2">
                    ${day.totalCost}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  {day.summary}
                </p>

                <div className="space-y-4">
                  { day.activities.map((activity, actIndex) => (
                
                    <div key={activity.id} className="relative">
                      <div className="flex gap-4 p-4 rounded-lg border-2 hover:border-primary/50 transition-all bg-card group">
                        <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          {activity.type === 'dining' ? (
                            <Utensils className="w-5 h-5 text-primary" />
                          ) : activity.category === 'nature' ? (
                            <Mountain className="w-5 h-5 text-primary" />
                          ) : activity.category === 'culture' ? (
                            <Camera className="w-5 h-5 text-primary" />
                          ) : activity.category === 'wellness' ? (
                            <Sparkles className="w-5 h-5 text-primary" />
                          ) : (
                            <Activity className="w-5 h-5 text-primary" />
                          )}
                        </div>
                     
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-lg">
                                {activity.title}
                              </h4>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {activity.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {activity.location.name}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {activity.duration} min
                                </Badge>
                                {activity.rating && (
                                  <span className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                                    {activity.rating.toFixed(1)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-xl font-bold text-primary">
                                ${activity.price}
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="opacity-0 group-hover:opacity-100"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">
                            {activity.description}
                          </p>

                          {activity.tips && activity.tips.length > 0 && (
                            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="text-xs font-semibold mb-1">
                                Tips:
                              </div>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {activity.tips.slice(0, 2).map((tip, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-1"
                                  >
                                    <span className="text-primary">•</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {actIndex < day.activities.length - 1 && (
                        <div className="ml-6 h-4 w-0.5 bg-border my-1" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Travel Tips & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-3">
              {itinerary.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
