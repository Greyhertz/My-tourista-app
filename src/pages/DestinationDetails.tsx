import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react';
// import { generateItinerary, type GeneratedItinerary } from './trip-ai-engine';
import { generateItinerary, type GeneratedItinerary } from '@/lib/trip-ai-engine';
import {
  MapPin,
  Globe,
  Calendar,
  Plane,
  Hotel,
  Camera,
  Heart,
  Sparkles,
  Users,
  DollarSign,
  Clock,
  Star,
  TrendingUp,
  Coffee,
  Sunset,
  Mountain,
  Utensils,
  Activity,
  Moon,
  Sun,
  Zap,
  Plus,
  ArrowRight,
  Check,
  CalendarIcon,
} from 'lucide-react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function DestinationDetails() {
  const { state } = useLocation();
  const { city } = useParams();
  const navigate = useNavigate();
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const [planningStep, setPlanningStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] =
    useState<GeneratedItinerary | null>(null);

  // Trip Planning State
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState([50]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [travelers, setTravelers] = useState('2');
  const [budget, setBudget] = useState('moderate');
  const [personalNotes, setPersonalNotes] = useState('');

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-muted">
              <MapPin className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl">Destination Not Found</CardTitle>
            <CardDescription>
              We couldn't find data for this destination. Try searching from the
              home page.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-3">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex-1"
            >
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/find-destination')}
              className="flex-1"
            >
              Find Destinations
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const { hotels, images, location } = state;
  const safeHotels = Array.isArray(hotels) ? hotels : [];
  const safeImages = Array.isArray(images) ? images : [];
  const safeLocation = location || {};

  type HotelProperties = {
    website?: string;
    datasource?: { raw?: { website?: string } };
    name?: string;
    city?: string;
    lat?: number;
    lon?: number;
    place_id?: string | number;
    address_line1?: string;
    address_line2?: string;
    formatted?: string;
    categories?: string[];
    state?: string;
    country?: string;
    [key: string]: any;
  };

  type Hotel = {
    properties: HotelProperties;
    geometry?: { coordinates?: any[] };
    imageUrl?: string;
  };

  const handleViewOnMap = (hotel: Hotel) => {
    const properties = hotel.properties || {};
    const lat = properties.lat || hotel.geometry?.coordinates?.[1];
    const lon = properties.lon || hotel.geometry?.coordinates?.[0];

    if (lat && lon) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
        '_blank'
      );
    } else if (properties.name) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          properties.name
        )}`,
        '_blank'
      );
    }
  };

  const handleVisitWebsite = (hotel: Hotel) => {
    const properties = hotel.properties || {};

    if (properties.website) {
      window.open(properties.website, '_blank');
    } else if (properties.datasource?.raw?.website) {
      window.open(properties.datasource.raw.website, '_blank');
    } else {
      const searchQuery = encodeURIComponent(
        `${properties.name || 'hotel'} ${
          properties.city || ''
        } official website`
      );
      window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
    }
  };

  const moods = [
    {
      id: 'relaxed',
      label: 'Need to Unwind',
      icon: Coffee,
      description: 'Peaceful & calming',
    },
    {
      id: 'adventurous',
      label: 'Ready to Explore',
      icon: Mountain,
      description: 'Thrilling & active',
    },
    {
      id: 'romantic',
      label: 'Romantic Mood',
      icon: Heart,
      description: 'Intimate & special',
    },
    {
      id: 'cultural',
      label: 'Soul Searching',
      icon: Sparkles,
      description: 'Deep & meaningful',
    },
  ];

  const occasions = [
    { id: 'solo', label: 'Solo Journey', icon: Star },
    { id: 'couple', label: 'Romantic Getaway', icon: Heart },
    { id: 'family', label: 'Family Time', icon: Users },
    { id: 'friends', label: 'Friends Trip', icon: Users },
  ];

  const interests = [
    { id: 'nature', label: 'Nature & Outdoors', icon: Mountain },
    { id: 'culture', label: 'Culture & History', icon: Camera },
    { id: 'food', label: 'Food & Dining', icon: Utensils },
    { id: 'nightlife', label: 'Nightlife & Entertainment', icon: Moon },
    { id: 'wellness', label: 'Wellness & Spa', icon: Sparkles },
    { id: 'adventure', label: 'Adventure Sports', icon: Activity },
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getEnergyLabel = (value: number) => {
    if (value < 33) return 'Relaxed Pace';
    if (value < 66) return 'Moderate Exploration';
    return 'Adventure Packed';
  };

  const handleGenerateTrip = () => {
    if (!startDate || !endDate) return;

    setIsGenerating(true);

    // Simulate AI processing time
    setTimeout(() => {
      const itinerary = generateItinerary({
        destination: city || safeLocation.city || 'Unknown',
        mood: selectedMood,
        occasion: selectedOccasion,
        interests: selectedInterests,
        energyLevel: energyLevel[0],
        startDate,
        endDate,
        travelers: parseInt(travelers),
        budget,
        notes: personalNotes,
      });

      setIsGenerating(false);

      // Navigate to dedicated planning page with all data
      navigate(`/plan-trip/${city}`, {
        state: {
          itinerary,
          preferences: {
            mood: selectedMood,
            occasion: selectedOccasion,
            interests: selectedInterests,
            energyLevel: energyLevel[0],
            startDate,
            endDate,
            travelers: parseInt(travelers),
            budget,
            notes: personalNotes,
          },
          destination: {
            city: city || safeLocation.city,
            location: safeLocation,
            hotels: safeHotels,
            images: safeImages,
          },
        },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-4xl font-bold">
                  {city || safeLocation.city || 'Unknown Location'}
                </h1>
              </div>
              {safeLocation.city && (
                <p className="text-muted-foreground text-lg">
                  {safeLocation.city}
                  {safeLocation.state && `, ${safeLocation.state}`}
                  {safeLocation.country && `, ${safeLocation.country}`}
                </p>
              )}
            </div>
            <Button
              size="lg"
              onClick={() => setShowTripPlanner(true)}
              className="group"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Plan Your Perfect Trip
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              icon: Hotel,
              label: 'Hotels',
              value: `${safeHotels.length}+`,
              desc: 'Available',
            },
            {
              icon: Camera,
              label: 'Attractions',
              value: '50+',
              desc: 'To Explore',
            },
            {
              icon: Utensils,
              label: 'Restaurants',
              value: '100+',
              desc: 'Local Cuisine',
            },
            {
              icon: Star,
              label: 'Rating',
              value: '4.8',
              desc: 'Guest Reviews',
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="border-2 hover:border-primary/50 transition-all"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label} {stat.desc}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Images Gallery */}
        {safeImages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Camera className="w-6 h-6" />
              Destination Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {safeImages.map((img, i) => (
                <div
                  key={i}
                  className="relative group overflow-hidden rounded-xl border-2 hover:border-primary/50 transition-all"
                >
                  <img
                    src={img}
                    alt={`View ${i + 1} of ${city || safeLocation.city}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hotels Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Hotel className="w-6 h-6" />
            Available Hotels
          </h2>

          {safeHotels.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {safeHotels.map((hotel, i) => {
                const properties = hotel.properties || {};
                return (
                  <Card
                    key={properties.place_id || i}
                    className="overflow-hidden border-2 hover:border-primary/50 hover:shadow-lg transition-all group"
                  >
                    {hotel.imageUrl && (
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img
                          src={hotel.imageUrl}
                          alt={`${properties.name || 'Hotel'} image`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={e => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <CardHeader>
                      <CardTitle className="text-xl flex items-start justify-between gap-2">
                        <span>{properties.name || 'Unnamed Hotel'}</span>
                        <Badge variant="secondary" className="shrink-0">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          4.5
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>
                          {properties.address_line2 ||
                            properties.formatted ||
                            properties.address_line1 ||
                            'No address available'}
                        </span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {properties.categories && (
                        <div className="flex flex-wrap gap-2">
                          {properties.categories.slice(0, 3).map((cat: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, idx: Key | null | undefined) => (
                            <Badge key={idx} variant="outline">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="flex gap-3 flex-wrap border-t pt-4">
                      <Button
                        onClick={() => handleViewOnMap(hotel)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Map
                      </Button>
                      <Button
                        onClick={() => handleVisitWebsite(hotel)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </Button>
                      <Button
                        onClick={() => setShowTripPlanner(true)}
                        size="sm"
                        className="flex-1"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Alert>
              <MapPin className="w-4 h-4" />
              <AlertDescription>
                No hotels found for this location.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* Trip Planner Dialog */}
      <Dialog open={showTripPlanner} onOpenChange={setShowTripPlanner}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              Let's Plan Your Dream Trip
            </DialogTitle>
            <DialogDescription className="text-base">
              Tell us about yourself, and we'll create a personalized itinerary
              just for you
            </DialogDescription>
          </DialogHeader>

          <Tabs value={`step-${planningStep}`} className="mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="step-1" onClick={() => setPlanningStep(1)}>
                <Heart className="w-4 h-4 mr-2" />
                Your Vibe
              </TabsTrigger>
              <TabsTrigger value="step-2" onClick={() => setPlanningStep(2)}>
                <Calendar className="w-4 h-4 mr-2" />
                Details
              </TabsTrigger>
              <TabsTrigger value="step-3" onClick={() => setPlanningStep(3)}>
                <Sparkles className="w-4 h-4 mr-2" />
                Review
              </TabsTrigger>
              <TabsTrigger value="step-4" disabled={!generatedItinerary}>
                <Check className="w-4 h-4 mr-2" />
                Itinerary
              </TabsTrigger>
            </TabsList>

            {/* Step 1: Emotional Context */}
            <TabsContent value="step-1" className="space-y-6 mt-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  How are you feeling right now? ✨
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {moods.map(mood => (
                    <Card
                      key={mood.id}
                      className={`cursor-pointer border-2 transition-all hover:shadow-md ${
                        selectedMood === mood.id
                          ? 'border-primary shadow-lg'
                          : ''
                      }`}
                      onClick={() => setSelectedMood(mood.id)}
                    >
                      <CardContent className="p-6">
                        <mood.icon className="w-8 h-8 mb-3 text-primary" />
                        <h3 className="font-semibold mb-1">{mood.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {mood.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  What's the occasion? 🎯
                </Label>
                <RadioGroup
                  value={selectedOccasion}
                  onValueChange={setSelectedOccasion}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {occasions.map(occasion => (
                      <Label
                        key={occasion.id}
                        htmlFor={occasion.id}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                          selectedOccasion === occasion.id
                            ? 'border-primary bg-primary/5'
                            : ''
                        }`}
                      >
                        <RadioGroupItem value={occasion.id} id={occasion.id} />
                        <occasion.icon className="w-5 h-5" />
                        <span className="font-medium">{occasion.label}</span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  What speaks to your soul? 💫 (Select multiple)
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {interests.map(interest => (
                    <Button
                      key={interest.id}
                      variant={
                        selectedInterests.includes(interest.id)
                          ? 'default'
                          : 'outline'
                      }
                      className="justify-start h-auto py-3"
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <interest.icon className="w-4 h-4 mr-2" />
                      {interest.label}
                      {selectedInterests.includes(interest.id) && (
                        <Check className="w-4 h-4 ml-auto" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  Your energy level for this trip? ⚡
                </Label>
                <div className="space-y-4">
                  <Slider
                    value={energyLevel}
                    onValueChange={setEnergyLevel}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Coffee className="w-4 h-4" />
                      Relaxed
                    </span>
                    <span className="font-semibold text-primary">
                      {getEnergyLabel(energyLevel[0])}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      High Energy
                    </span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => setPlanningStep(2)}
                disabled={
                  !selectedMood ||
                  !selectedOccasion ||
                  selectedInterests.length === 0
                }
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </TabsContent>

            {/* Step 2: Practical Details */}
            <TabsContent value="step-2" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full h-11 justify-start text-left font-normal hover:bg-accent hover:text-accent-foreground',
                          !startDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        {startDate ? (
                          format(startDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={date => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full h-11 justify-start text-left font-normal hover:bg-accent hover:text-accent-foreground',
                          !endDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        {endDate ? (
                          format(endDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={date => date < (startDate || new Date())}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="travelers">Number of Travelers</Label>
                  <Input
                    id="travelers"
                    type="number"
                    min="1"
                    value={travelers}
                    onChange={e => setTravelers(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <RadioGroup
                    value={budget}
                    onValueChange={setBudget}
                    className="mt-2"
                  >
                    <div className="flex gap-4">
                      <Label
                        htmlFor="budget-low"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <RadioGroupItem value="budget" id="budget-low" />
                        <DollarSign className="w-4 h-4" />
                        <span>Budget</span>
                      </Label>
                      <Label
                        htmlFor="budget-mid"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <RadioGroupItem value="moderate" id="budget-mid" />
                        <DollarSign className="w-4 h-4" />
                        <DollarSign className="w-4 h-4" />
                        <span>Moderate</span>
                      </Label>
                      <Label
                        htmlFor="budget-high"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <RadioGroupItem value="luxury" id="budget-high" />
                        <DollarSign className="w-4 h-4" />
                        <DollarSign className="w-4 h-4" />
                        <DollarSign className="w-4 h-4" />
                        <span>Luxury</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Any special requests or notes?</Label>
                <Textarea
                  id="notes"
                  placeholder="E.g., vegetarian meals, accessibility needs, must-see places..."
                  value={personalNotes}
                  onChange={e => setPersonalNotes(e.target.value)}
                  className="mt-2 min-h-[100px]"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setPlanningStep(1)}
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => setPlanningStep(3)}
                  disabled={!startDate || !endDate}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Step 3: Summary & Generate */}
            <TabsContent value="step-3" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Trip Summary</CardTitle>
                  <CardDescription>
                    Review your preferences before we generate your itinerary
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Destination
                      </div>
                      <div className="font-semibold">
                        {city || safeLocation.city}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Travel Dates
                      </div>
                      <div className="font-semibold">
                        {startDate && endDate
                          ? `${format(startDate, 'MMM dd, yyyy')} to ${format(
                              endDate,
                              'MMM dd, yyyy'
                            )}`
                          : 'Not selected'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Travelers
                      </div>
                      <div className="font-semibold">
                        {travelers}{' '}
                        {parseInt(travelers) === 1 ? 'person' : 'people'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Budget
                      </div>
                      <div className="font-semibold capitalize">{budget}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Your Interests
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedInterests.map(id => {
                        const interest = interests.find(i => i.id === id);
                        return interest ? (
                          <Badge key={id} variant="secondary">
                            {interest.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setPlanningStep(2)}
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  className="flex-1 group"
                  onClick={handleGenerateTrip}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating Magic...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate My Trip
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Step 4: Generated Itinerary */}
            <TabsContent value="step-4" className="space-y-6 mt-6">
              {generatedItinerary && (
                <>
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
                            {generatedItinerary.personalizedMessage}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trip Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">
                            {generatedItinerary.days.length}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Days
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <Activity className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">
                            {generatedItinerary.days.reduce(
                              (sum, day) => sum + day.activities.length,
                              0
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Activities
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">
                            ${generatedItinerary.totalCost}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total Cost
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Daily Itinerary */}
                  <div className="space-y-6">
                    {generatedItinerary.days.map((day, index) => (
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
                                <CardTitle className="text-xl">
                                  Day {day.day}
                                </CardTitle>
                                <CardDescription>
                                  {format(day.date, 'EEEE, MMMM dd, yyyy')}
                                </CardDescription>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="text-sm px-4 py-2"
                            >
                              ${day.totalCost}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground mb-4">
                            {day.summary}
                          </p>

                          <div className="space-y-4">
                            {day.activities.map((activity, actIndex) => (
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
                                          <Badge
                                            variant="outline"
                                            className="text-xs"
                                          >
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
                                      <div className="text-right">
                                        <div className="text-xl font-bold text-primary">
                                          ${activity.price}
                                        </div>
                                      </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-2">
                                      {activity.description}
                                    </p>

                                    {activity.tips &&
                                      activity.tips.length > 0 && (
                                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <div className="text-xs font-semibold mb-1">
                                            Tips:
                                          </div>
                                          <ul className="text-xs text-muted-foreground space-y-1">
                                            {activity.tips
                                              .slice(0, 2)
                                              .map((tip, i) => (
                                                <li
                                                  key={i}
                                                  className="flex items-start gap-1"
                                                >
                                                  <span className="text-primary">
                                                    •
                                                  </span>
                                                  {tip}
                                                </li>
                                              ))}
                                          </ul>
                                        </div>
                                      )}
                                  </div>
                                </div>

                                {/* Connection line */}
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
                      <ul className="space-y-2">
                        {generatedItinerary.recommendations.map(
                          (rec, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              <span>{rec}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="outline" size="lg" className="flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Export to Calendar
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      <Users className="w-4 h-4 mr-2" />
                      Share with Friends
                    </Button>
                    <Button size="lg" className="flex-1">
                      <Check className="w-4 h-4 mr-2" />
                      Start Booking
                    </Button>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
