// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Sparkles,
//   Heart,
//   Zap,
//   Coffee,
//   Mountain,
//   Users,
//   DollarSign,
//   ArrowRight,
//   Star,
//   Check,
//   Sun,
//   Moon,
//   Waves,
//   Building,
//   TrendingUp,
//   MapPin,
//   Calendar,
//   Trash2,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Separator } from '@/components/ui/separator';
// import {
//   findPerfectDestination,
//   type EmotionalProfile,
//   type DestinationRecommendation,
// } from '@/lib/ai-destination-finder';
// // import { getMockDestinationData } from '@/lib/mock-destination-data';

// export default function FindDestinationPage() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // User profile
//   const [currentFeeling, setCurrentFeeling] = useState('');
//   const [seekingFor, setSeekingFor] = useState('');
//   const [travelWith, setTravelWith] = useState('');
//   const [budget, setBudget] = useState('');
//   const [duration, setDuration] = useState('');
//   const [preferences, setPreferences] = useState<string[]>([]);
//   const [avoidances, setAvoidances] = useState<string[]>([]);

//   // Results
//   const [recommendations, setRecommendations] = useState<
//     DestinationRecommendation[]
//   >([]);

//   const feelings = [
//     {
//       id: 'stressed',
//       label: 'Seeking Relaxation',
//       desc: 'Unwind and recharge',
//       icon: Coffee,
//     },
//     {
//       id: 'adventurous',
//       label: 'Craving Adventure',
//       desc: 'Active and thrilling',
//       icon: Zap,
//     },
//     {
//       id: 'romantic',
//       label: 'Romantic Escape',
//       desc: 'Intimate experiences',
//       icon: Heart,
//     },
//     {
//       id: 'curious',
//       label: 'Cultural Discovery',
//       desc: 'Learn and explore',
//       icon: Sparkles,
//     },
//     {
//       id: 'lonely',
//       label: 'Social Connection',
//       desc: 'Meet and engage',
//       icon: Users,
//     },
//     { id: 'happy', label: 'Celebration', desc: 'Special occasions', icon: Sun },
//   ];

//   const seekings = [
//     { id: 'peace', label: 'Peace & Tranquility', icon: Moon },
//     { id: 'excitement', label: 'Excitement & Thrills', icon: Zap },
//     { id: 'romance', label: 'Romance & Intimacy', icon: Heart },
//     { id: 'discovery', label: 'Discovery & Learning', icon: Sparkles },
//     { id: 'healing', label: 'Wellness & Healing', icon: Coffee },
//     { id: 'socializing', label: 'Socializing & Entertainment', icon: Users },
//   ];

//   const preferenceOptions = [
//     { id: 'beach', label: 'Coastal & Beach', icon: Waves },
//     { id: 'mountains', label: 'Mountains & Nature', icon: Mountain },
//     { id: 'city', label: 'Urban & Metropolitan', icon: Building },
//     { id: 'culture', label: 'Culture & Heritage', icon: Star },
//     { id: 'nature', label: 'Nature & Wildlife', icon: Mountain },
//     { id: 'nightlife', label: 'Nightlife & Entertainment', icon: Moon },
//     { id: 'food', label: 'Culinary Experiences', icon: Coffee },
//     { id: 'wellness', label: 'Wellness & Spa', icon: Sparkles },
//   ];

//   const togglePreference = (id: string) => {
//     setPreferences(prev =>
//       prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
//     );
//   };

//   const toggleAvoidance = (id: string) => {
//     setAvoidances(prev =>
//       prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
//     );
//   };

//   const handleFindDestinations = () => {
//     setIsGenerating(true);

//     setTimeout(() => {
//       const profile: EmotionalProfile = {
//         currentFeeling,
//         seekingFor,
//         travelWith,
//         budget,
//         duration,
//         preferences,
//         avoidances,
//       };

//       const results = findPerfectDestination(profile);
//       setRecommendations(results);
//       setIsGenerating(false);
//       setStep(4);
//     }, 2000);
//   };

//   // --- Save Trip Function ---
//   const handleSaveTrip = (destination: DestinationRecommendation) => {
//     const savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
//     const alreadySaved = savedTrips.some(
//       (trip: DestinationRecommendation) => trip.id === destination.id
//     );
//     if (alreadySaved) {
//       alert('This trip is already saved.');
//       return;
//     }
//     const updatedTrips = [...savedTrips, destination];
//     localStorage.setItem('savedTrips', JSON.stringify(updatedTrips));
//     alert(`Saved ${destination.name} to your trips!`);
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <div className="border-b pt-10 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5">
//         <div className="max-w-4xl mx-auto py-16 px-6 ">
//           <div className="mb-2">
//             <Badge variant="secondary" className="mb-4">
//               Personalized Recommendations
//             </Badge>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Discover Your Ideal Destination
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl">
//             Answer a few questions to receive tailored destination
//             recommendations based on your travel preferences and current needs.
//           </p>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto p-6">
//         {/* Progress Indicator */}
//         {step < 4 && (
//           <div className="mb-12">
//             <div className="flex items-center justify-between mb-3">
//               {[
//                 { num: 1, label: 'Travel Style' },
//                 { num: 2, label: 'Trip Details' },
//                 { num: 3, label: 'Preferences' },
//               ].map((s, idx) => (
//                 <div key={s.num} className="flex items-center flex-1">
//                   <div
//                     className={`flex items-center gap-3 ${
//                       step >= s.num
//                         ? 'text-foreground'
//                         : 'text-muted-foreground'
//                     }`}
//                   >
//                     <div
//                       className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-semibold text-sm transition-colors ${
//                         step > s.num
//                           ? 'bg-primary border-primary text-primary-foreground'
//                           : step === s.num
//                           ? 'border-primary'
//                           : 'border-border'
//                       }`}
//                     >
//                       {step > s.num ? <Check className="w-4 h-4" /> : s.num}
//                     </div>
//                     <span className="text-sm font-medium hidden sm:inline">
//                       {s.label}
//                     </span>
//                   </div>
//                   {idx < 2 && (
//                     <div
//                       className={`h-0.5 flex-1 mx-4 transition-colors ${
//                         step > s.num ? 'bg-primary' : 'bg-border'
//                       }`}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Step 1: Travel Style */}
//         {step === 1 && (
//           <div className="space-y-8">
//             <div>
//               <h2 className="text-2xl font-bold mb-2">
//                 What brings you here today?
//               </h2>
//               <p className="text-muted-foreground">
//                 Help us understand your current travel motivations
//               </p>
//             </div>

//             <div className="space-y-3">
//               {feelings.map(feeling => (
//                 <Card
//                   key={feeling.id}
//                   className={`cursor-pointer transition-all hover:border-primary/50 ${
//                     currentFeeling === feeling.id
//                       ? 'border-primary border-2 shadow-md'
//                       : 'border'
//                   }`}
//                   onClick={() => setCurrentFeeling(feeling.id)}
//                 >
//                   <CardContent className="p-5">
//                     <div className="flex items-center gap-4">
//                       <div
//                         className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
//                           currentFeeling === feeling.id
//                             ? 'bg-primary text-primary-foreground'
//                             : 'bg-muted'
//                         }`}
//                       >
//                         <feeling.icon className="w-6 h-6" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-lg mb-1">
//                           {feeling.label}
//                         </h3>
//                         <p className="text-sm text-muted-foreground">
//                           {feeling.desc}
//                         </p>
//                       </div>
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
//                           currentFeeling === feeling.id
//                             ? 'border-primary bg-primary'
//                             : 'border-muted-foreground'
//                         }`}
//                       >
//                         {currentFeeling === feeling.id && (
//                           <Check className="w-3 h-3 text-primary-foreground" />
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             <Separator />

//             <div className="space-y-4">
//               <Label className="text-base font-semibold">
//                 What are you seeking from this trip?
//               </Label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {seekings.map(seeking => (
//                   <Button
//                     key={seeking.id}
//                     variant={seekingFor === seeking.id ? 'default' : 'outline'}
//                     className="justify-start h-auto py-3"
//                     onClick={() => setSeekingFor(seeking.id)}
//                   >
//                     <seeking.icon className="w-4 h-4 mr-2 shrink-0" />
//                     {seeking.label}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <Button
//                 size="lg"
//                 onClick={() => setStep(2)}
//                 disabled={!currentFeeling || !seekingFor}
//               >
//                 Continue
//                 <ArrowRight className="w-4 h-4 ml-2" />
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Step 2: Trip Details */}
//         {step === 2 && (
//           <div className="space-y-8">
//             <div>
//               <h2 className="text-2xl font-bold mb-2">Trip Details</h2>
//               <p className="text-muted-foreground">
//                 Provide essential information about your travel plans
//               </p>
//             </div>

//             <div className="space-y-8">
//               {/* Travel With */}
//               <div>
//                 <Label className="text-base font-semibold mb-4 block">
//                   Travel Companions
//                 </Label>
//                 <RadioGroup value={travelWith} onValueChange={setTravelWith}>
//                   <div className="grid grid-cols-2 gap-3">
//                     {[
//                       { id: 'solo', label: 'Solo', icon: Star },
//                       { id: 'partner', label: 'Partner', icon: Heart },
//                       { id: 'family', label: 'Family', icon: Users },
//                       { id: 'friends', label: 'Friends', icon: Users },
//                     ].map(option => (
//                       <Label
//                         key={option.id}
//                         htmlFor={option.id}
//                         className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
//                           travelWith === option.id
//                             ? 'border-primary bg-primary/5 shadow-md'
//                             : 'hover:border-primary/40 bg-card/50'
//                         }`}
//                       >
//                         <RadioGroupItem value={option.id} id={option.id} />
//                         <span className="font-medium">{option.label}</span>
//                       </Label>
//                     ))}
//                   </div>
//                 </RadioGroup>
//               </div>

//               {/* Budget */}
//               <Separator />
//               <div>
//                 <Label className="text-base font-semibold mb-4 block">
//                   Budget Range
//                 </Label>
//                 <RadioGroup value={budget} onValueChange={setBudget}>
//                   <div className="grid grid-cols-3 gap-3">
//                     {[
//                       { id: 'budget', label: 'Budget', desc: 'Value-focused' },
//                       {
//                         id: 'moderate',
//                         label: 'Moderate',
//                         desc: 'Balanced comfort',
//                       },
//                       {
//                         id: 'luxury',
//                         label: 'Luxury',
//                         desc: 'Premium experience',
//                       },
//                     ].map(option => (
//                       <Label
//                         key={option.id}
//                         htmlFor={`budget-${option.id}`}
//                         className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${
//                           budget === option.id
//                             ? 'border-primary bg-primary/5 shadow-md'
//                             : 'hover:border-primary/40 bg-card/50'
//                         }`}
//                       >
//                         <RadioGroupItem
//                           value={option.id}
//                           id={`budget-${option.id}`}
//                           className="mb-3"
//                         />
//                         <span className="font-semibold mb-1">
//                           {option.label}
//                         </span>
//                         <span className="text-xs text-muted-foreground">
//                           {option.desc}
//                         </span>
//                       </Label>
//                     ))}
//                   </div>
//                 </RadioGroup>
//               </div>

//               {/* Duration */}
//               <Separator />
//               <div>
//                 <Label className="text-base font-semibold mb-4 block">
//                   Trip Duration
//                 </Label>
//                 <RadioGroup value={duration} onValueChange={setDuration}>
//                   <div className="grid grid-cols-3 gap-3">
//                     {[
//                       { id: 'weekend', label: 'Weekend', desc: '2-3 days' },
//                       { id: 'week', label: 'One Week', desc: '5-7 days' },
//                       { id: 'twoWeeks', label: 'Extended', desc: '14+ days' },
//                     ].map(option => (
//                       <Label
//                         key={option.id}
//                         htmlFor={`duration-${option.id}`}
//                         className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${
//                           duration === option.id
//                             ? 'border-primary bg-primary/5 shadow-md'
//                             : 'hover:border-primary/40 bg-card/50'
//                         }`}
//                       >
//                         <RadioGroupItem
//                           value={option.id}
//                           id={`duration-${option.id}`}
//                           className="mb-3"
//                         />
//                         <span className="font-semibold mb-1">
//                           {option.label}
//                         </span>
//                         <span className="text-xs text-muted-foreground">
//                           {option.desc}
//                         </span>
//                       </Label>
//                     ))}
//                   </div>
//                 </RadioGroup>
//               </div>
//             </div>

//             <div className="flex gap-3 justify-end">
//               <Button variant="outline" size="lg" onClick={() => setStep(1)}>
//                 Back
//               </Button>
//               <Button
//                 size="lg"
//                 onClick={() => setStep(3)}
//                 disabled={!travelWith || !budget || !duration}
//               >
//                 Continue
//                 <ArrowRight className="w-4 h-4 ml-2" />
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Step 3: Preferences */}
//         {step === 3 && (
//           <div className="space-y-8">
//             <div>
//               <h2 className="text-2xl font-bold mb-2">Travel Preferences</h2>
//               <p className="text-muted-foreground">
//                 Select the experiences that interest you most
//               </p>
//             </div>

//             <div className="space-y-4">
//               <Label className="text-base font-semibold">
//                 Interests (Select all that apply)
//               </Label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 {preferenceOptions.map(option => (
//                   <Button
//                     key={option.id}
//                     variant={
//                       preferences.includes(option.id) ? 'default' : 'outline'
//                     }
//                     className="h-auto py-4 flex-col gap-2 relative"
//                     onClick={() => togglePreference(option.id)}
//                   >
//                     <option.icon className="w-5 h-5" />
//                     <span className="text-sm">{option.label}</span>
//                     {preferences.includes(option.id) && (
//                       <Check className="w-3 h-3 absolute top-2 right-2" />
//                     )}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             <Separator />

//             <div className="space-y-4">
//               <Label className="text-base font-semibold">
//                 Preferences to Avoid (Optional)
//               </Label>
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   'Crowds',
//                   'Extreme Heat',
//                   'Cold Weather',
//                   'Rainy Season',
//                   'Long Flights',
//                   'Language Barriers',
//                 ].map(avoid => {
//                   const id = avoid.toLowerCase().replace(/\s+/g, '-');
//                   return (
//                     <Button
//                       key={id}
//                       variant={
//                         avoidances.includes(id) ? 'secondary' : 'outline'
//                       }
//                       size="sm"
//                       onClick={() => toggleAvoidance(id)}
//                     >
//                       {avoid}
//                       {avoidances.includes(id) && (
//                         <Check className="w-3 h-3 ml-2" />
//                       )}
//                     </Button>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="flex gap-3 justify-end">
//               <Button variant="outline" size="lg" onClick={() => setStep(2)}>
//                 Back
//               </Button>
//               <Button
//                 size="lg"
//                 onClick={handleFindDestinations}
//                 disabled={isGenerating || preferences.length === 0}
//               >
//                 {isGenerating ? (
//                   <>
//                     <Sparkles className="w-4 h-4 mr-2 animate-spin" />
//                     Finding Perfect Destinations...
//                   </>
//                 ) : (
//                   <>
//                     <Sparkles className="w-4 h-4 mr-2" />
//                     Generate Recommendations
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </>
//                 )}
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Step 4: Results */}
//         {step === 4 && recommendations.length > 0 && (
//           <div className="space-y-8">
//             <h2 className="text-2xl font-bold mb-4">
//               Recommended Destinations
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {recommendations.map(dest => (
//                 <Card
//                   key={dest.id}
//                   className="border hover:border-primary/40 transition-all"
//                 >
//                   <img
//                     src={dest.imageUrl}
//                     alt={dest.name}
//                     className="w-full h-48 object-cover rounded-t-lg"
//                   />
//                   <CardContent>
//                     <div className="flex items-center justify-between mb-2">
//                       <CardTitle>{dest.name}</CardTitle>
//                       <Badge variant="secondary">{dest.country}</Badge>
//                     </div>
//                     <CardDescription className="mb-4">
//                       {dest.tagline}
//                     </CardDescription>

//                     <div className="flex items-center justify-between pt-2">
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <Calendar className="w-4 h-4" />
//                         <span>
//                           Best time: {dest.bestTimeToVisit.join(', ')}
//                         </span>
//                       </div>

//                       <div className="flex gap-2">
//                         <Button
//                           variant="secondary"
//                           onClick={() => handleSaveTrip(dest)}
//                         >
//                           Save Trip
//                         </Button>

//                         <Button
//                           size="lg"
//                           onClick={() => {
//                             const cityName = dest.name.split(',')[0].trim();
//                             navigate(`/destination/${cityName.toLowerCase()}`, {
//                               state: {
//                                 hotels: [],
//                                 images: [],
//                                 location: {
//                                   city: cityName,
//                                   country: dest.country,
//                                   description: dest.vibeDescription,
//                                 },
//                               },
//                             });
//                           }}
//                         >
//                           Explore {dest.name.split(',')[0]}
//                           <ArrowRight className="w-4 h-4 ml-2" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             <div className="flex justify-end mt-8">
//               <Button variant="outline" onClick={() => setStep(3)}>
//                 Back
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Zap,
  Coffee,
  Mountain,
  Users,
  ArrowRight,
  Star,
  Check,
  Sun,
  Moon,
  Waves,
  Building,
  TrendingUp,
  // MapPin,
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
import { saveTrip, isTripSaved, type SavedTrip } from '@/lib/tripStorage';
import { format } from 'date-fns';
import { Save, Calendar as CalendarIcon } from 'lucide-react';
import type { DifferenceInDaysOptions } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { fetchMultipleImages } from '@/api/Unsplash';
import { ScrollReveal } from './Homepage';


export default function FindDestinationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // User profile
  const [currentFeeling, setCurrentFeeling] = useState('');
  const [seekingFor, setSeekingFor] = useState('');
  const [travelWith, setTravelWith] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [avoidances, setAvoidances] = useState<string[]>([]);

  const [selectedDestForDates, setSelectedDestForDates] =
    useState<DestinationRecommendation | null>(null);
  const [tripStartDate, setTripStartDate] = useState<Date>();
  const [tripEndDate, setTripEndDate] = useState<Date>();
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [savedTrips, setSavedTrips] = useState<string[]>([]);

  const [recommendations, setRecommendations] = useState<
    DestinationRecommendation[]
  >([]);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

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
    { id: 'healing', label: 'Wellness & Healing', icon: Heart},
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

  const handleSaveTrip = (
    dest: DestinationRecommendation,
    withDates: boolean = false
  ) => {
    if (withDates && (!tripStartDate || !tripEndDate)) {
      alert('Please select travel dates');
      return;
    }

    const tripData: SavedTrip = {
      id: `trip-${Date.now()}-${dest.name.replace(/\s+/g, '-')}`,
      destinationName: dest.name.split(',')[0].trim(),
      country: dest.country,
      score: dest.score,
      tagline: dest.tagline,
      personalizedMessage: dest.personalizedMessage,
      whyPerfect: dest.whyPerfect,
      highlights: dest.highlights,
      bestFor: dest.bestFor,
      estimatedBudget: dest.estimatedBudget,
      bestTimeToVisit: dest.bestTimeToVisit,
      vibeDescription: dest.vibeDescription,
      weatherDescription: dest.weatherDescription,
      userProfile: {
        feeling: currentFeeling,
        seeking: seekingFor,
        travelWith,
        budget,
        duration,
        preferences,
      },
      tripDates: withDates
        ? {
            startDate: format(tripStartDate!, 'yyyy-MM-dd'),
            endDate: format(tripEndDate!, 'yyyy-MM-dd'),
            confirmed: true,
          }
        : undefined,
      savedAt: new Date().toISOString(),
    };

    const success = saveTrip(tripData);

    if (success) {
      setSavedTrips(prev => [...prev, dest.name.split(',')[0].trim()]);
      setShowDateDialog(false);
      setTripStartDate(undefined);
      setTripEndDate(undefined);
    } else {
      alert('Failed to save trip. Please try again.');
    }
  };

  // Remove the invalid async/await block.
  // If you want to fetch images, use useEffect and state instead.
  // Example:
  // const [destinationImages, setDestinationImages] = useState<{ [key: string]: string[] }>({});

  // const totalCost = dayActivities.reduce((sum, act) => sum + act.price, 0);

  // const fetchImages = async () => {
  //   const imagesMap: { [key: string]: string[] } = {};
  //   for (const dest of recommendations) {
  //     imagesMap[dest.name.split(',')[0]] = await fetchMultipleImages(dest.name);
  //   }
  //   // getDestinationImages(imagesMap); // Removed: not needed and causes type error
  // };

  // Store images by destination name in a state object
  const [destinationImages, setDestinationImages] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    const fetchAllImages = async () => {
      const imagesMap: { [key: string]: string[] } = {};
      for (const dest of recommendations) {
        const destName = dest.name.split(',')[0].trim();
        const imgs = (await fetchMultipleImages(destName)).slice(0, 3);
        imagesMap[destName.toLowerCase().replace(/\s+/g, '-')] = imgs;
      }
      setDestinationImages(imagesMap);
    };
    if (recommendations.length > 0) {
      fetchAllImages();
    }
  }, [recommendations, destinationImages]);

  const getDestinationImages = (destinationName: string): string[] => {
    const key = destinationName.toLowerCase().replace(/\s+/g, '-');
    return destinationImages[key] || [];
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5" />
        <div className="relative max-w-5xl mx-auto py-20 px-6">
          <Badge variant="secondary" className="mb-4">
            AI-Powered Recommendations
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Discover Your Ideal Destination
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Answer a few questions and let our intelligent system recommend
            personalized destinations that match your travel style.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6" ref={contentRef}>
        {/* Progress Indicator */}
        {step < 4 && (
          <div className="mb-16">
            <div className="flex items-center justify-between relative">
              {/* Background line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-border -z-10" />
              <div
                className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-500 -z-10"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />

              {[
                { num: 1, label: 'Your Vibe' },
                { num: 2, label: 'Trip Details' },
                { num: 3, label: 'Preferences' },
              ].map(s => (
                <button
                  key={s.num}
                  onClick={() => step >= s.num && setStep(s.num)}
                  disabled={step < s.num}
                  className="flex flex-col items-center gap-2 group disabled:cursor-not-allowed"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step > s.num
                        ? 'bg-primary text-primary-foreground scale-110'
                        : step === s.num
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors ${
                      step >= s.num
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Travel Style */}
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-3">
                  What brings you here today?
                </h2>
                <p className="text-muted-foreground text-lg">
                  Help us understand your current travel motivations
                </p>
              </div>
            </ScrollReveal>

            <div className="grid  sm:grid-cols-2 lg:grid-cols-3  gap-4  ">
              {feelings.map(feeling => (
                <Card
                  key={feeling.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                    currentFeeling === feeling.id
                      ? 'border-primary border-2 shadow-lg'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setCurrentFeeling(feeling.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          currentFeeling === feeling.id
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-muted'
                        }`}
                      >
                        <feeling.icon className="w-7 h-7" />
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
                        className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                          currentFeeling === feeling.id
                            ? 'border-primary bg-primary scale-110'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {currentFeeling === feeling.id && (
                          <Check className="w-4 h-4 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator className="my-8" />

            <div className="space-y-5">
              <Label className="text-lg font-semibold">
                What are you seeking from this trip?
              </Label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {seekings.map(seeking => (
                  <Button
                    key={seeking.id}
                    variant={seekingFor === seeking.id ? 'default' : 'outline'}
                    className="h-auto py-4 justify-start text-left"
                    onClick={() => setSeekingFor(seeking.id)}
                  >
                    <seeking.icon className="w-5 h-5 mr-3 shrink-0" />
                    <span>{seeking.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                size="lg"
                onClick={() => setStep(2)}
                disabled={!currentFeeling || !seekingFor}
                className="px-8"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Trip Details */}
        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-3">Trip Details</h2>
              <p className="text-muted-foreground text-lg">
                Provide essential information about your travel plans
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <Label className="text-lg font-semibold mb-5 block">
                  Travel Companions
                </Label>
                <RadioGroup value={travelWith} onValueChange={setTravelWith}>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        id: 'solo',
                        label: 'Solo',
                        icon: Star,
                        color: 'blue-500',
                      },
                      {
                        id: 'partner',
                        label: 'Partner',
                        icon: Heart,
                        color: 'red-500',
                      },
                      {
                        id: 'family',
                        label: 'Family',
                        icon: Users,
                        color:
                          'yellow                                                              -500',
                      },
                      {
                        id: 'friends',
                        label: 'Friends',
                        icon: Users,
                        color: 'green-500',
                      },
                    ].map(option => (
                      <Label
                        key={option.id}
                        htmlFor={option.id}
                        className={cn(
                          `text-${option.color} flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all`,
                          travelWith === option.id
                            ? `border-${option.color}-500 bg-${option.color} shadow-md`
                            : `hover:border-${option.color}`
                        )}
                      >
                        <RadioGroupItem value={option.id} id={option.id} />
                        <option.icon
                          className={`w-8 h-8 text-${option.color}`}
                        />
                        <span className="font-semibold">{option.label}</span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <Label className="text-lg font-semibold mb-5 block">
                  Budget Range
                </Label>
                <RadioGroup value={budget} onValueChange={setBudget}>
                  <div className="grid grid-cols-3 gap-4">
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
                        className={`flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          budget === option.id
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'hover:border-primary/40'
                        }`}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`budget-${option.id}`}
                          className="mb-4"
                        />
                        <span className="font-semibold text-lg mb-1">
                          {option.label}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {option.desc}
                        </span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <Label className="text-lg font-semibold mb-5 block">
                  Trip Duration
                </Label>
                <RadioGroup value={duration} onValueChange={setDuration}>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'weekend', label: 'Weekend', desc: '2-3 days' },
                      { id: 'week', label: 'One Week', desc: '5-7 days' },
                      { id: 'twoWeeks', label: 'Extended', desc: '14+ days' },
                    ].map(option => (
                      <Label
                        key={option.id}
                        htmlFor={`duration-${option.id}`}
                        className={`flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          duration === option.id
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'hover:border-primary/40'
                        }`}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`duration-${option.id}`}
                          className="mb-4"
                        />
                        <span className="font-semibold text-lg mb-1">
                          {option.label}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {option.desc}
                        </span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep(1)}
                className="px-8"
              >
                Back
              </Button>
              <Button
                size="lg"
                onClick={() => setStep(3)}
                disabled={!travelWith || !budget || !duration}
                className="px-8"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-3">Travel Preferences</h2>
              <p className="text-muted-foreground text-lg">
                Select the experiences that interest you most
              </p>
            </div>

            <div className="space-y-5">
              <Label className="text-lg font-semibold">
                Interests (Select all that apply)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {preferenceOptions.map(option => (
                  <Button
                    key={option.id}
                    variant={
                      preferences.includes(option.id) ? 'default' : 'outline'
                    }
                    className="h-auto py-6 flex-col gap-3 relative"
                    onClick={() => togglePreference(option.id)}
                  >
                    <option.icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{option.label}</span>
                    {preferences.includes(option.id) && (
                      <Check className="w-4 h-4 absolute top-3 right-3" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-5">
              <Label className="text-lg font-semibold">
                Preferences to Avoid (Optional)
              </Label>
              <div className="flex flex-wrap gap-3">
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
                      size="default"
                      onClick={() => toggleAvoidance(id)}
                      className="h-auto py-3"
                    >
                      {avoid}
                      {avoidances.includes(id) && (
                        <Check className="w-4 h-4 ml-2" />
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep(2)}
                className="px-8"
              >
                Back
              </Button>
              <Button
                size="lg"
                onClick={handleFindDestinations}
                disabled={isGenerating || preferences.length === 0}
                className="px-8"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Finding Destinations...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Recommendations
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Results with Photos */}
        {step === 4 && recommendations.length > 0 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-4xl font-bold mb-3">
                Your Perfect Destinations
              </h2>
              <p className="text-muted-foreground text-lg">
                Ranked by how well they match your travel style
              </p>
            </div>

            <div className="space-y-8">
              {recommendations.map((dest, index) => {
                const images = getDestinationImages(dest.name.split(',')[0]);

                return (
                  <Card
                    key={dest.id}
                    className="border-2 hover:border-primary/50 transition-all overflow-hidden"
                  >
                    {/* Image Gallery */}
                    <div className="grid grid-cols-3 gap-2 p-4 bg-muted/30">
                      {images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video overflow-hidden rounded-lg group"
                        >
                          <img
                            src={img}
                            alt={`${dest.name} ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={e => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <CardHeader className="border-b">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-lg">
                            #{index + 1}
                          </div>
                          <div>
                            <CardTitle className="text-3xl mb-2">
                              {dest.name}
                            </CardTitle>
                            <CardDescription className="text-lg">
                              {dest.tagline}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className="text-xl px-5 py-2 shadow-sm shrink-0">
                          {dest.score}% Match
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 space-y-6">
                      <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-sm leading-relaxed">
                          {dest.personalizedMessage}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Star className="w-5 h-5 text-primary" />
                          Why it's perfect for you
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {dest.whyPerfect}
                        </p>
                      </div>

                      <Separator />

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Check className="w-5 h-5 text-primary" />
                            Highlights
                          </h4>
                          <ul className="space-y-3">
                            {dest.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="text-primary text-sm mt-0.5">
                                  •
                                </span>
                                <span className="text-sm">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Best For
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {dest.bestFor.map((item, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-sm py-1 px-3"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>

                          <div className="p-5 bg-muted rounded-xl">
                            <div className="text-sm text-muted-foreground mb-2">
                              Estimated Daily Cost
                            </div>
                            <div className="text-3xl font-bold text-primary">
                              ${dest.estimatedBudget.perDay}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            Best time: {dest.bestTimeToVisit.join(', ')}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {/* Save without dates button */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="lg"
                                disabled={
                                  savedTrips.includes(
                                    dest.name.split(',')[0].trim()
                                  ) ||
                                  isTripSaved(dest.name.split(',')[0].trim())
                                }
                              >
                                <Save className="w-5 h-5 mr-2" />
                                {savedTrips.includes(
                                  dest.name.split(',')[0].trim()
                                ) || isTripSaved(dest.name.split(',')[0].trim())
                                  ? 'Saved'
                                  : 'Save Trip'}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle className="text-center text-2xl">
                                  Save This Trip?
                                </DialogTitle>
                                <DialogDescription className="text-center text-base pt-2">
                                  Save {dest.name.split(',')[0]} to your trips
                                  and access it anytime
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex flex-col gap-3 pt-4">
                                <DialogClose asChild>
                                  <Button
                                    size="lg"
                                    onClick={() => handleSaveTrip(dest, false)}
                                    disabled={
                                      savedTrips.includes(
                                        dest.name.split(',')[0].trim()
                                      ) ||
                                      isTripSaved(
                                        dest.name.split(',')[0].trim()
                                      )
                                    }
                                    className="w-full"
                                  >
                                    <Save className="w-5 h-5 mr-2" />
                                    Confirm Save
                                  </Button>
                                </DialogClose>

                                <DialogClose asChild>
                                  <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full"
                                  >
                                    Cancel
                                  </Button>
                                </DialogClose>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {/* Save with dates dialog */}
                          <Dialog
                            open={
                              showDateDialog &&
                              selectedDestForDates?.id === dest.id
                            }
                            onOpenChange={open => {
                              setShowDateDialog(open);
                              if (open) setSelectedDestForDates(dest);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="lg">
                                <CalendarIcon className="w-5 h-5 mr-2" />
                                Set Dates
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle className="text-2xl">
                                  Select Your Travel Dates
                                </DialogTitle>
                                <DialogDescription className="text-base">
                                  Choose when you'd like to visit{' '}
                                  {dest.name.split(',')[0]}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6 py-4">
                                <div className="space-y-3">
                                  <Label className="text-base font-semibold">
                                    Start Date
                                  </Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          'w-full h-12 justify-start text-left font-normal',
                                          !tripStartDate &&
                                            'text-muted-foreground'
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-5 w-5" />
                                        {tripStartDate
                                          ? format(tripStartDate, 'PPP')
                                          : 'Pick a date'}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <CalendarComponent
                                        mode="single"
                                        selected={tripStartDate}
                                        onSelect={setTripStartDate}
                                        disabled={date => date < new Date()}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>

                                <div className="space-y-3">
                                  <Label className="text-base font-semibold">
                                    End Date
                                  </Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          'w-full h-12 justify-start text-left font-normal',
                                          !tripEndDate &&
                                            'text-muted-foreground'
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-5 w-5" />
                                        {tripEndDate
                                          ? format(tripEndDate, 'PPP')
                                          : 'Pick a date'}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <CalendarComponent
                                        mode="single"
                                        selected={tripEndDate}
                                        onSelect={setTripEndDate}
                                        disabled={date =>
                                          date < (tripStartDate || new Date())
                                        }
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>

                                <Button
                                  size="lg"
                                  className="w-full"
                                  onClick={() => handleSaveTrip(dest, true)}
                                  disabled={!tripStartDate || !tripEndDate}
                                >
                                  <Save className="w-5 h-5 mr-2" />
                                  Save Trip with Dates
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {/* Explore button */}
                          <Button
                            size="lg"
                            onClick={() => {
                              const cityName = dest.name.split(',')[0].trim();
                              navigate(
                                `/destination/${cityName.toLowerCase()}`,
                                {
                                  state: {
                                    hotels: [],
                                    images: [],
                                    location: {
                                      city: cityName,
                                      country: dest.country,
                                      description: dest.vibeDescription,
                                    },
                                  },
                                }
                              );
                            }}
                            className="group"
                          >
                            Explore {dest.name.split(',')[0]}
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep(1)}
                className="px-8"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start New Search
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/saved-trips')}
                className="px-8"
              >
                <Save className="w-5 h-5 mr-2" />
                View Saved Trips
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
