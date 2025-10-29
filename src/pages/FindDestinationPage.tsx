import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Zap,
  Coffee,
  Mountain,
  Users,
  DollarSign,
  ArrowRight,
  Star,
  Check,
  Sun,
  Moon,
  Waves,
  Building,
  TrendingUp,
  MapPin,
  Calendar,
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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  findPerfectDestination,
  type EmotionalProfile,
  type DestinationRecommendation,
} from '@/lib/ai-destination-finder';
// import { getMockDestinationData } from '@/lib/mock-destination-data';

export default function FindDestinationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // User profile
  const [currentFeeling, setCurrentFeeling] = useState('');
  const [seekingFor, setSeekingFor] = useState('');
  const [travelWith, setTravelWith] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [avoidances, setAvoidances] = useState<string[]>([]);

  // Results
  const [recommendations, setRecommendations] = useState<
    DestinationRecommendation[]
  >([]);

  const feelings = [
    {
      id: 'stressed',
      label: 'Seeking Relaxation',
      desc: 'Unwind and recharge',
      icon: Coffee,
    },
    {
      id: 'adventurous',
      label: 'Craving Adventure',
      desc: 'Active and thrilling',
      icon: Zap,
    },
    {
      id: 'romantic',
      label: 'Romantic Escape',
      desc: 'Intimate experiences',
      icon: Heart,
    },
    {
      id: 'curious',
      label: 'Cultural Discovery',
      desc: 'Learn and explore',
      icon: Sparkles,
    },
    {
      id: 'lonely',
      label: 'Social Connection',
      desc: 'Meet and engage',
      icon: Users,
    },
    { id: 'happy', label: 'Celebration', desc: 'Special occasions', icon: Sun },
  ];

  const seekings = [
    { id: 'peace', label: 'Peace & Tranquility', icon: Moon },
    { id: 'excitement', label: 'Excitement & Thrills', icon: Zap },
    { id: 'romance', label: 'Romance & Intimacy', icon: Heart },
    { id: 'discovery', label: 'Discovery & Learning', icon: Sparkles },
    { id: 'healing', label: 'Wellness & Healing', icon: Coffee },
    { id: 'socializing', label: 'Socializing & Entertainment', icon: Users },
  ];

  const preferenceOptions = [
    { id: 'beach', label: 'Coastal & Beach', icon: Waves },
    { id: 'mountains', label: 'Mountains & Nature', icon: Mountain },
    { id: 'city', label: 'Urban & Metropolitan', icon: Building },
    { id: 'culture', label: 'Culture & Heritage', icon: Star },
    { id: 'nature', label: 'Nature & Wildlife', icon: Mountain },
    { id: 'nightlife', label: 'Nightlife & Entertainment', icon: Moon },
    { id: 'food', label: 'Culinary Experiences', icon: Coffee },
    { id: 'wellness', label: 'Wellness & Spa', icon: Sparkles },
  ];

  const togglePreference = (id: string) => {
    setPreferences(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleAvoidance = (id: string) => {
    setAvoidances(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleFindDestinations = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const profile: EmotionalProfile = {
        currentFeeling,
        seekingFor,
        travelWith,
        budget,
        duration,
        preferences,
        avoidances,
      };

      const results = findPerfectDestination(profile);
      setRecommendations(results);
      setIsGenerating(false);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto py-16 px-6">
          <div className="mb-2">
            <Badge variant="secondary" className="mb-4">
              Personalized Recommendations
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Ideal Destination
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Answer a few questions to receive tailored destination
            recommendations based on your travel preferences and current needs.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Indicator */}
        {step < 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              {[
                { num: 1, label: 'Travel Style' },
                { num: 2, label: 'Trip Details' },
                { num: 3, label: 'Preferences' },
              ].map((s, idx) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div
                    className={`flex items-center gap-3 ${
                      step >= s.num
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-semibold text-sm transition-colors ${
                        step > s.num
                          ? 'bg-primary border-primary text-primary-foreground'
                          : step === s.num
                          ? 'border-primary'
                          : 'border-border'
                      }`}
                    >
                      {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">
                      {s.label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div
                      className={`h-0.5 flex-1 mx-4 transition-colors ${
                        step > s.num ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Travel Style */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                What brings you here today?
              </h2>
              <p className="text-muted-foreground">
                Help us understand your current travel motivations
              </p>
            </div>

            <div className="space-y-3">
              {feelings.map(feeling => (
                <Card
                  key={feeling.id}
                  className={`cursor-pointer transition-all hover:border-primary/50 ${
                    currentFeeling === feeling.id
                      ? 'border-primary border-2 shadow-md'
                      : 'border'
                  }`}
                  onClick={() => setCurrentFeeling(feeling.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                          currentFeeling === feeling.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <feeling.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {feeling.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feeling.desc}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                          currentFeeling === feeling.id
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {currentFeeling === feeling.id && (
                          <Check className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-base font-semibold">
                What are you seeking from this trip?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seekings.map(seeking => (
                  <Button
                    key={seeking.id}
                    variant={seekingFor === seeking.id ? 'default' : 'outline'}
                    className="justify-start h-auto py-3"
                    onClick={() => setSeekingFor(seeking.id)}
                  >
                    <seeking.icon className="w-4 h-4 mr-2 shrink-0" />
                    {seeking.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                size="lg"
                onClick={() => setStep(2)}
                disabled={!currentFeeling || !seekingFor}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Trip Details */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Trip Details</h2>
              <p className="text-muted-foreground">
                Provide essential information about your travel plans
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Travel Companions
                </Label>
                <RadioGroup value={travelWith} onValueChange={setTravelWith}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'solo', label: 'Solo', icon: Star },
                      { id: 'partner', label: 'Partner', icon: Heart },
                      { id: 'family', label: 'Family', icon: Users },
                      { id: 'friends', label: 'Friends', icon: Users },
                    ].map(option => (
                      <Label
                        key={option.id}
                        htmlFor={option.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          travelWith === option.id
                            ? 'border-primary bg-accent'
                            : 'hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={option.id} id={option.id} />
                        <span className="font-medium">{option.label}</span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Budget Range
                </Label>
                <RadioGroup value={budget} onValueChange={setBudget}>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'budget', label: 'Budget', desc: 'Value-focused' },
                      {
                        id: 'moderate',
                        label: 'Moderate',
                        desc: 'Balanced comfort',
                      },
                      {
                        id: 'luxury',
                        label: 'Luxury',
                        desc: 'Premium experience',
                      },
                    ].map(option => (
                      <Label
                        key={option.id}
                        htmlFor={`budget-${option.id}`}
                        className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          budget === option.id
                            ? 'border-primary bg-accent'
                            : 'hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`budget-${option.id}`}
                          className="mb-3"
                        />
                        <span className="font-semibold mb-1">
                          {option.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {option.desc}
                        </span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Trip Duration
                </Label>
                <RadioGroup value={duration} onValueChange={setDuration}>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'weekend', label: 'Weekend', desc: '2-3 days' },
                      { id: 'week', label: 'One Week', desc: '5-7 days' },
                      { id: 'twoWeeks', label: 'Extended', desc: '14+ days' },
                    ].map(option => (
                      <Label
                        key={option.id}
                        htmlFor={`duration-${option.id}`}
                        className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          duration === option.id
                            ? 'border-primary bg-accent'
                            : 'hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`duration-${option.id}`}
                          className="mb-3"
                        />
                        <span className="font-semibold mb-1">
                          {option.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {option.desc}
                        </span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                size="lg"
                onClick={() => setStep(3)}
                disabled={!travelWith || !budget || !duration}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Travel Preferences</h2>
              <p className="text-muted-foreground">
                Select the experiences that interest you most
              </p>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Interests (Select all that apply)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {preferenceOptions.map(option => (
                  <Button
                    key={option.id}
                    variant={
                      preferences.includes(option.id) ? 'default' : 'outline'
                    }
                    className="h-auto py-4 flex-col gap-2 relative"
                    onClick={() => togglePreference(option.id)}
                  >
                    <option.icon className="w-5 h-5" />
                    <span className="text-sm">{option.label}</span>
                    {preferences.includes(option.id) && (
                      <Check className="w-3 h-3 absolute top-2 right-2" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Preferences to Avoid (Optional)
              </Label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Crowds',
                  'Extreme Heat',
                  'Cold Weather',
                  'Rainy Season',
                  'Long Flights',
                  'Language Barriers',
                ].map(avoid => {
                  const id = avoid.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <Button
                      key={id}
                      variant={
                        avoidances.includes(id) ? 'secondary' : 'outline'
                      }
                      size="sm"
                      onClick={() => toggleAvoidance(id)}
                    >
                      {avoid}
                      {avoidances.includes(id) && (
                        <Check className="w-3 h-3 ml-2" />
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                size="lg"
                onClick={handleFindDestinations}
                disabled={isGenerating || preferences.length === 0}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Finding Perfect Destinations...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Recommendations
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && recommendations.length > 0 && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                Your Perfect Destinations
              </h2>
              <p className="text-muted-foreground">
                Ranked by how well they match your vibe
              </p>
            </div>

            <div className="space-y-6">
              {recommendations.map((dest, index) => (
                <Card
                  key={dest.id}
                  className="border-2 hover:border-primary/50 transition-all overflow-hidden group"
                >
                  <CardHeader className="bg-muted/30 border-b">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-md">
                          #{index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-2xl mb-1">
                            {dest.name}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {dest.tagline}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="text-lg px-4 py-2 shadow-sm">
                        {dest.score}% Match
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-5">
                    <div className="p-5 bg-primary/5 rounded-xl border border-primary/20">
                      <p className="leading-relaxed">
                        {dest.personalizedMessage}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary" />
                        Why it's perfect for you
                      </h4>
                      <p className="text-muted-foreground">{dest.whyPerfect}</p>
                    </div>

                    <Separator />

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary" />
                          Highlights
                        </h4>
                        <ul className="space-y-2">
                          {dest.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          Best For
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {dest.bestFor.map((item, i) => (
                            <Badge key={i} variant="secondary">
                              {item}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">
                            Estimated Daily Cost
                          </div>
                          <div className="text-3xl font-bold text-primary">
                            ${dest.estimatedBudget.perDay}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Best time: {dest.bestTimeToVisit.join(', ')}
                        </span>
                      </div>
                      <Button
                        size="lg"
                        onClick={() => {
                          // Extract city name (e.g., "Barcelona" from "Barcelona, Spain")
                          const cityName = dest.name.split(',')[0].trim();

                          // Navigate with minimal mock data
                          // In production, this would fetch real data from your API
                          navigate(`/destination/${cityName.toLowerCase()}`, {
                            state: {
                              hotels: [], // Empty for now - would fetch from API
                              images: [], // Empty for now - would fetch from API
                              location: {
                                city: cityName,
                                country: dest.country,
                                description: dest.vibeDescription,
                              },
                            },
                          });
                        }}
                      >
                        Explore {dest.name.split(',')[0]}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-6">
              <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                <Sparkles className="w-4 h-4 mr-2" />
                Start New Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
