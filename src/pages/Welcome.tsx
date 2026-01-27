// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   MapPin,
//   Calendar,
//   Users,
//   Plane,
//   Hotel,
//   Compass,
//   DollarSign,
//   Clock,
//   Star,
//   Heart,
//   Plus,
//   Trash2,
//   Edit,
//   Check,
//   ArrowRight,
//   Sparkles,
//   ChevronDown,
//   Search,
//   Filter,
//   TrendingUp,
//   MessageSquare,
//   Save,
//   Share2,
//   Download,
//   Globe,
//   Coffee,
//   Camera,
//   Utensils,
//   ShoppingBag,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// type ItineraryDay = {
//   id: string;
//   day: number;
//   date: string;
//   activities: Activity[];
// };

// type Activity = {
//   id: string;
//   time: string;
//   title: string;
//   location: string;
//   type: 'flight' | 'hotel' | 'attraction' | 'dining' | 'activity';
//   duration: string;
//   price?: number;
//   notes?: string;
// };

// type FlightOption = {
//   id: string;
//   airline: string;
//   departure: string;
//   arrival: string;
//   duration: string;
//   price: number;
//   stops: number;
//   class: string;
// };

// type HotelOption = {
//   id: string;
//   name: string;
//   image: string;
//   rating: number;
//   reviews: number;
//   location: string;
//   price: number;
//   amenities: string[];
// };

// export const Welcome = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [tripName, setTripName] = useState('My Dream Vacation');
//   const [destination, setDestination] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [travelers, setTravelers] = useState(2);
//   const [budget, setBudget] = useState('moderate');
//   const [aiPrompt, setAiPrompt] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);

//   // Sample data
//   const [itinerary, setItinerary] = useState<ItineraryDay[]>([
//     {
//       id: '1',
//       day: 1,
//       date: 'Nov 15, 2025',
//       activities: [
//         {
//           id: 'a1',
//           time: '10:00 AM',
//           title: 'Flight to Paris',
//           location: 'LAX → CDG',
//           type: 'flight',
//           duration: '11h 30m',
//           price: 850,
//         },
//         {
//           id: 'a2',
//           time: '9:30 PM',
//           title: 'Check-in at Hotel Le Marais',
//           location: 'Le Marais District',
//           type: 'hotel',
//           duration: '4 nights',
//           price: 180,
//         },
//       ],
//     },
//     {
//       id: '2',
//       day: 2,
//       date: 'Nov 16, 2025',
//       activities: [
//         {
//           id: 'a3',
//           time: '9:00 AM',
//           title: 'Eiffel Tower Visit',
//           location: 'Champ de Mars',
//           type: 'attraction',
//           duration: '2h',
//           price: 25,
//         },
//         {
//           id: 'a4',
//           time: '12:00 PM',
//           title: 'Lunch at Le Jules Verne',
//           location: 'Eiffel Tower',
//           type: 'dining',
//           duration: '1.5h',
//           price: 85,
//         },
//         {
//           id: 'a5',
//           time: '3:00 PM',
//           title: 'Seine River Cruise',
//           location: 'Port de la Bourdonnais',
//           type: 'activity',
//           duration: '1h',
//           price: 15,
//         },
//       ],
//     },
//   ]);

//   const flights: FlightOption[] = [
//     {
//       id: 'f1',
//       airline: 'Air France',
//       departure: '10:00 AM LAX',
//       arrival: '6:30 AM+1 CDG',
//       duration: '11h 30m',
//       price: 850,
//       stops: 0,
//       class: 'Economy',
//     },
//     {
//       id: 'f2',
//       airline: 'Delta',
//       departure: '2:00 PM LAX',
//       arrival: '10:30 AM+1 CDG',
//       duration: '11h 30m',
//       price: 920,
//       stops: 0,
//       class: 'Economy',
//     },
//   ];

//   const hotels: HotelOption[] = [
//     {
//       id: 'h1',
//       name: 'Hotel Le Marais',
//       image:
//         'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
//       rating: 4.8,
//       reviews: 2341,
//       location: 'Le Marais, Paris',
//       price: 180,
//       amenities: ['WiFi', 'Breakfast', 'Gym', 'Restaurant'],
//     },
//     {
//       id: 'h2',
//       name: 'The Parisian Hotel',
//       image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
//       rating: 4.6,
//       reviews: 1823,
//       location: 'Champs-Élysées, Paris',
//       price: 220,
//       amenities: ['WiFi', 'Pool', 'Spa', 'Concierge'],
//     },
//   ];

//   const products = [
//     { id: 1, name: 'T-shirt', category: 'Clothing' },
//     { id: 2, name: 'Jeans', category: 'Clothing' },
//     { id: 3, name: 'Laptop', category: 'Electronics' },
//   ];

//   const grouped = products.reduce((groups, product) => {
//     const category = product.category;
//     if (!groups[category]) {
//       groups[category] = []; // create category if not exists
//     }
//     groups[category].push(product);
//     return groups;
//   }, {} as Record<string, typeof products>);

//  ;

//   const handleGenerateItinerary = () => {
//     setIsGenerating(true);
//     setTimeout(() => {
//       setIsGenerating(false);
//       setActiveTab('itinerary');
//     }, 2000);
//   };

//   const getActivityIcon = (type: Activity['type']) => {
//     switch (type) {
//       case 'flight':
//         return <Plane className="w-5 h-5" />;
//       case 'hotel':
//         return <Hotel className="w-5 h-5" />;
//       case 'attraction':
//         return <Camera className="w-5 h-5" />;
//       case 'dining':
//         return <Utensils className="w-5 h-5" />;
//       case 'activity':
//         return <Compass className="w-5 h-5" />;
//     }
//   };

//   const getActivityColor = (type: Activity['type']) => {
//     switch (type) {
//       case 'flight':
//         return 'from-blue-500 to-indigo-500';
//       case 'hotel':
//         return 'from-purple-500 to-pink-500';
//       case 'attraction':
//         return 'from-amber-500 to-orange-500';
//       case 'dining':
//         return 'from-green-500 to-emerald-500';
//       case 'activity':
//         return 'from-cyan-500 to-teal-500';
//     }
//   };

//   const totalCost = itinerary.reduce((total, day) => {
//     return (
//       total +
//       day.activities.reduce((dayTotal, activity) => {
//         return dayTotal + (activity.price || 0);
//       }, 0)
//     );
//   }, 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-24 pb-16">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
//                 Plan Your Perfect Trip
//               </h1>
//               <p className="text-muted-foreground text-lg">
//                 AI-powered itinerary with flights, hotels, and attractions
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <Button variant="outline" size="lg">
//                 <Save className="w-4 h-4 mr-2" />
//                 Save Draft
//               </Button>
//               <Button variant="outline" size="lg">
//                 <Share2 className="w-4 h-4 mr-2" />
//                 Share
//               </Button>
//               <Button
//                 size="lg"
//                 className="bg-gradient-to-r from-primary to-accent"
//               >
//                 <Check className="w-4 h-4 mr-2" />
//                 Confirm & Book
//               </Button>
//             </div>
//           </div>

//           {/* Trip Summary Stats */}
//           <div className="grid grid-cols-4 gap-4">
//             {[
//               {
//                 label: 'Duration',
//                 value: '7 Days',
//                 icon: Calendar,
//                 color: 'from-blue-500 to-cyan-500',
//               },
//               {
//                 label: 'Travelers',
//                 value: `${travelers} People`,
//                 icon: Users,
//                 color: 'from-purple-500 to-pink-500',
//               },
//               {
//                 label: 'Destinations',
//                 value: '3 Cities',
//                 icon: MapPin,
//                 color: 'from-amber-500 to-orange-500',
//               },
//               {
//                 label: 'Total Budget',
//                 value: `$${totalCost.toLocaleString()}`,
//                 icon: DollarSign,
//                 color: 'from-green-500 to-emerald-500',
//               },
//             ].map((stat, i) => (
//               <Card
//                 key={i}
//                 className="border-2 hover:border-primary/50 transition-all"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
//                     >
//                       <stat.icon className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <div className="text-sm text-muted-foreground">
//                         {stat.label}
//                       </div>
//                       <div className="text-2xl font-bold">{stat.value}</div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </motion.div>

//         {/* Main Content Tabs */}
//         <Tabs
//           value={activeTab}
//           onValueChange={setActiveTab}
//           className="space-y-6"
//         >
//           <TabsList className="grid grid-cols-5 w-full h-14 p-1">
//             <TabsTrigger value="overview" className="text-base">
//               <Sparkles className="w-4 h-4 mr-2" />
//               AI Planner
//             </TabsTrigger>
//             <TabsTrigger value="itinerary" className="text-base">
//               <Calendar className="w-4 h-4 mr-2" />
//               Itinerary
//             </TabsTrigger>
//             <TabsTrigger value="flights" className="text-base">
//               <Plane className="w-4 h-4 mr-2" />
//               Flights
//             </TabsTrigger>
//             <TabsTrigger value="hotels" className="text-base">
//               <Hotel className="w-4 h-4 mr-2" />
//               Hotels
//             </TabsTrigger>
//             <TabsTrigger value="map" className="text-base">
//               <MapPin className="w-4 h-4 mr-2" />
//               Map View
//             </TabsTrigger>
//           </TabsList>

//           {/* AI Planner Tab */}
//           <TabsContent value="overview" className="space-y-6">
//             <Card className="border-2">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-primary" />
//                   AI Trip Assistant
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <Label>Destination</Label>
//                       <Input
//                         placeholder="Where do you want to go?"
//                         value={destination}
//                         onChange={e => setDestination(e.target.value)}
//                         className="h-12"
//                       />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label>Start Date</Label>
//                         <Input
//                           type="date"
//                           value={startDate}
//                           onChange={e => setStartDate(e.target.value)}
//                           className="h-12"
//                         />
//                       </div>
//                       <div>
//                         <Label>End Date</Label>
//                         <Input
//                           type="date"
//                           value={endDate}
//                           onChange={e => setEndDate(e.target.value)}
//                           className="h-12"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label>Travelers</Label>
//                         <Select
//                           value={travelers.toString()}
//                           onValueChange={v => setTravelers(parseInt(v))}
//                         >
//                           <SelectTrigger className="h-12">
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {[1, 2, 3, 4, 5, 6].map(num => (
//                               <SelectItem key={num} value={num.toString()}>
//                                 {num} {num === 1 ? 'Person' : 'People'}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div>
//                         <Label>Budget</Label>
//                         <Select value={budget} onValueChange={setBudget}>
//                           <SelectTrigger className="h-12">
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="budget">Budget ($)</SelectItem>
//                             <SelectItem value="moderate">
//                               Moderate ($$)
//                             </SelectItem>
//                             <SelectItem value="luxury">Luxury ($$$)</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <Label>Tell AI Your Travel Style</Label>
//                     <Textarea
//                       placeholder="E.g., 'I love art museums, local cuisine, and want to avoid crowds. Looking for romantic spots for my anniversary...'"
//                       value={aiPrompt}
//                       onChange={e => setAiPrompt(e.target.value)}
//                       className="h-[200px] resize-none"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-3">
//                   <Button
//                     size="lg"
//                     className="flex-1 bg-gradient-to-r from-primary to-accent h-14 text-lg"
//                     onClick={handleGenerateItinerary}
//                     disabled={isGenerating}
//                   >
//                     {isGenerating ? (
//                       <>
//                         <motion.div
//                           animate={{ rotate: 360 }}
//                           transition={{
//                             duration: 1,
//                             repeat: Infinity,
//                             ease: 'linear',
//                           }}
//                         >
//                           <Sparkles className="w-5 h-5 mr-2" />
//                         </motion.div>
//                         Generating Magic...
//                       </>
//                     ) : (
//                       <>
//                         <Sparkles className="w-5 h-5 mr-2" />
//                         Generate AI Itinerary
//                       </>
//                     )}
//                   </Button>
//                 </div>

//                 {/* Quick Suggestions */}
//                 <div className="pt-4 border-t">
//                   <div className="text-sm font-semibold mb-3">
//                     Popular Trip Ideas
//                   </div>
//                   <div className="grid grid-cols-3 gap-3">
//                     {[
//                       {
//                         title: 'Romantic Paris',
//                         icon: Heart,
//                         desc: '7 days of love & culture',
//                       },
//                       {
//                         title: 'Tokyo Adventure',
//                         icon: Camera,
//                         desc: 'Modern meets traditional',
//                       },
//                       {
//                         title: 'Bali Relaxation',
//                         icon: Coffee,
//                         desc: 'Beach & wellness retreat',
//                       },
//                     ].map((idea, i) => (
//                       <Card
//                         key={i}
//                         className="cursor-pointer hover:border-primary transition-all group"
//                       >
//                         <CardContent className="p-4">
//                           <idea.icon className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
//                           <div className="font-semibold">{idea.title}</div>
//                           <div className="text-xs text-muted-foreground">
//                             {idea.desc}
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Itinerary Tab */}
//           <TabsContent value="itinerary" className="space-y-6">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h2 className="text-2xl font-bold">Your Itinerary</h2>
//                 <p className="text-muted-foreground">
//                   Drag to reorder • Click to edit
//                 </p>
//               </div>
//               <Button className="bg-gradient-to-r from-primary to-accent">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Activity
//               </Button>
//             </div>

//             <div className="space-y-6">
//               {itinerary.map(day => (
//                 <Card
//                   key={day.id}
//                   className="border-2 hover:border-primary/30 transition-all"
//                 >
//                   <CardHeader className="bg-muted/30">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <CardTitle className="flex items-center gap-3">
//                           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
//                             {day.day}
//                           </div>
//                           <div>
//                             <div className="text-2xl">Day {day.day}</div>
//                             <div className="text-sm text-muted-foreground font-normal">
//                               {day.date}
//                             </div>
//                           </div>
//                         </CardTitle>
//                       </div>
//                       <Badge variant="secondary" className="text-sm px-4 py-2">
//                         {day.activities.length} Activities
//                       </Badge>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="p-6">
//                     <div className="space-y-4">
//                       {day.activities.map((activity, idx) => (
//                         <motion.div
//                           key={activity.id}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: idx * 0.1 }}
//                           className="group relative"
//                         >
//                           <div className="flex gap-4 p-4 rounded-xl border-2 hover:border-primary/50 transition-all bg-card hover:shadow-md">
//                             <div
//                               className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${getActivityColor(
//                                 activity.type
//                               )} flex items-center justify-center text-white`}
//                             >
//                               {getActivityIcon(activity.type)}
//                             </div>

//                             <div className="flex-1">
//                               <div className="flex items-start justify-between mb-2">
//                                 <div>
//                                   <div className="font-semibold text-lg">
//                                     {activity.title}
//                                   </div>
//                                   <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
//                                     <span className="flex items-center gap-1">
//                                       <Clock className="w-3 h-3" />
//                                       {activity.time}
//                                     </span>
//                                     <span className="flex items-center gap-1">
//                                       <MapPin className="w-3 h-3" />
//                                       {activity.location}
//                                     </span>
//                                     <Badge
//                                       variant="outline"
//                                       className="text-xs"
//                                     >
//                                       {activity.duration}
//                                     </Badge>
//                                   </div>
//                                 </div>
//                                 <div className="text-right">
//                                   {activity.price && (
//                                     <div className="text-2xl font-bold text-primary">
//                                       ${activity.price}
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                               <Button size="sm" variant="ghost">
//                                 <Edit className="w-4 h-4" />
//                               </Button>
//                               <Button size="sm" variant="ghost">
//                                 <Trash2 className="w-4 h-4" />
//                               </Button>
//                             </div>
//                           </div>

//                           {/* Connection line */}
//                           {idx < day.activities.length - 1 && (
//                             <div className="ml-7 h-4 w-0.5 bg-border my-1" />
//                           )}
//                         </motion.div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* Flights Tab */}
//           <TabsContent value="flights" className="space-y-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-bold">Available Flights</h2>
//               <div className="flex gap-3">
//                 <Button variant="outline">
//                   <Filter className="w-4 h-4 mr-2" />
//                   Filters
//                 </Button>
//                 <Select defaultValue="price">
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="price">Lowest Price</SelectItem>
//                     <SelectItem value="duration">Shortest Duration</SelectItem>
//                     <SelectItem value="departure">Departure Time</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="space-y-4">
//               {flights.map(flight => (
//                 <Card
//                   key={flight.id}
//                   className="border-2 hover:border-primary/50 transition-all cursor-pointer group"
//                 >
//                   <CardContent className="p-6">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-6 flex-1">
//                         <div className="text-center">
//                           <div className="text-3xl font-bold">
//                             {flight.departure.split(' ')[0]}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             {flight.departure.split(' ')[1]}
//                           </div>
//                         </div>

//                         <div className="flex-1 relative">
//                           <div className="flex items-center gap-2">
//                             <div className="h-0.5 flex-1 bg-border" />
//                             <div className="flex flex-col items-center">
//                               <Plane className="w-5 h-5 text-primary rotate-90" />
//                               <div className="text-xs text-muted-foreground mt-1">
//                                 {flight.duration}
//                               </div>
//                               <Badge
//                                 variant="secondary"
//                                 className="text-xs mt-1"
//                               >
//                                 {flight.stops === 0
//                                   ? 'Direct'
//                                   : `${flight.stops} Stop${
//                                       flight.stops > 1 ? 's' : ''
//                                     }`}
//                               </Badge>
//                             </div>
//                             <div className="h-0.5 flex-1 bg-border" />
//                           </div>
//                         </div>

//                         <div className="text-center">
//                           <div className="text-3xl font-bold">
//                             {flight.arrival.split(' ')[0]}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             {flight.arrival.split(' ')[1]}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="text-right ml-8">
//                         <div className="text-sm text-muted-foreground mb-1">
//                           {flight.airline} • {flight.class}
//                         </div>
//                         <div className="text-4xl font-bold text-primary mb-3">
//                           ${flight.price}
//                         </div>
//                         <Button className="bg-gradient-to-r from-primary to-accent group-hover:scale-105 transition-transform">
//                           Select Flight
//                           <ArrowRight className="w-4 h-4 ml-2" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* Hotels Tab */}
//           <TabsContent value="hotels" className="space-y-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-bold">Recommended Hotels</h2>
//               <div className="flex gap-3">
//                 <Button variant="outline">
//                   <Filter className="w-4 h-4 mr-2" />
//                   Filters
//                 </Button>
//                 <Select defaultValue="recommended">
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="recommended">Recommended</SelectItem>
//                     <SelectItem value="price">Lowest Price</SelectItem>
//                     <SelectItem value="rating">Highest Rated</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               {hotels.map(hotel => (
//                 <Card
//                   key={hotel.id}
//                   className="border-2 hover:border-primary/50 transition-all group cursor-pointer overflow-hidden"
//                 >
//                   <div className="relative h-48 overflow-hidden">
//                     <img
//                       src={hotel.image}
//                       alt={hotel.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                     <Button
//                       size="sm"
//                       variant="secondary"
//                       className="absolute top-4 right-4 rounded-full w-10 h-10 p-0"
//                     >
//                       <Heart className="w-5 h-5" />
//                     </Button>
//                     <Badge className="absolute bottom-4 left-4 bg-white/95 text-foreground border-0">
//                       <Star className="w-3 h-3 text-amber-500 mr-1 fill-amber-500" />
//                       {hotel.rating} ({hotel.reviews} reviews)
//                     </Badge>
//                   </div>
//                   <CardContent className="p-6">
//                     <div className="mb-4">
//                       <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <MapPin className="w-4 h-4" />
//                         {hotel.location}
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {hotel.amenities.map((amenity, idx) => (
//                         <Badge
//                           key={idx}
//                           variant="secondary"
//                           className="text-xs"
//                         >
//                           {amenity}
//                         </Badge>
//                       ))}
//                     </div>

//                     <div className="flex items-center justify-between pt-4 border-t">
//                       <div>
//                         <div className="text-sm text-muted-foreground">
//                           Per night
//                         </div>
//                         <div className="text-3xl font-bold text-primary">
//                           ${hotel.price}
//                         </div>
//                       </div>
//                       <Button className="bg-gradient-to-r from-primary to-accent">
//                         Book Now
//                         <ArrowRight className="w-4 h-4 ml-2" />
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* Map View Tab */}
//           <TabsContent value="map">
//             <Card className="border-2">
//               <CardContent className="p-0">
//                 <div className="relative h-[600px] bg-muted/20 rounded-lg overflow-hidden">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="text-center">
//                       <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
//                       <div className="text-2xl font-bold mb-2">
//                         Interactive Map View
//                       </div>
//                       <p className="text-muted-foreground">
//                         Map integration coming soon
//                       </p>
//                       <Button
//                         onClick={() => {
//                           console.log(grouped);
//                         }}
//                       ></Button>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// // ============================================
// // ARCHITECTURE DESIGN FOR DYNAMIC TRIP PLANNING
// // ============================================

// /**
//  * STEP 1: DATA FLOW ARCHITECTURE
//  *
//  * User Journey:
//  * 1. User browses destinations (e.g., clicks "Santorini" card)
//  * 2. Lands on DestinationDetailsPage with destination ID
//  * 3. Sees destination info + "Plan Your Trip" section
//  * 4. Fills preferences (dates, travelers, interests, budget)
//  * 5. AI generates personalized itinerary from real data
//  * 6. User can modify, add/remove activities
//  * 7. Books flights/hotels directly from itinerary
//  */

// // ============================================
// // 1. CONTEXT/STATE MANAGEMENT
// // ============================================

// // import { createContext, useContext, useState, ReactNode } from 'react';

// // type TripPreferences = {
// //   destination: string;
// //   destinationId: string;
// //   startDate: string;
// //   endDate: string;
// //   travelers: number;
// //   budget: 'budget' | 'moderate' | 'luxury';
// //   interests: string[]; // ['culture', 'food', 'adventure', 'relaxation']
// //   travelStyle: 'family' | 'couple' | 'solo' | 'group';
// //   pace: 'relaxed' | 'moderate' | 'packed';
// // };

// // type GeneratedItinerary = {
// //   id: string;
// //   destination: string;
// //   days: ItineraryDay[];
// //   flights: FlightOption[];
// //   hotels: HotelOption[];
// //   totalCost: number;
// //   recommendations: Recommendation[];
// // };

// // type ItineraryDay = {
// //   id: string;
// //   day: number;
// //   date: string;
// //   activities: Activity[];
// //   meals: Meal[];
// // };

// // type Activity = {
// //   id: string;
// //   time: string;
// //   title: string;
// //   description: string;
// //   location: {
// //     name: string;
// //     coordinates: { lat: number; lng: number };
// //     address: string;
// //   };
// //   type: 'attraction' | 'dining' | 'activity' | 'transport' | 'rest';
// //   duration: number; // minutes
// //   price: number;
// //   rating: number;
// //   imageUrl: string;
// //   category: string; // 'culture', 'food', 'nature', etc.
// //   bookingUrl?: string;
// //   tips?: string[];
// // };

// // type FlightOption = {
// //   id: string;
// //   airline: string;
// //   flightNumber: string;
// //   departure: {
// //     airport: string;
// //     time: string;
// //     terminal?: string;
// //   };
// //   arrival: {
// //     airport: string;
// //     time: string;
// //     terminal?: string;
// //   };
// //   duration: number; // minutes
// //   price: number;
// //   class: 'economy' | 'premium' | 'business' | 'first';
// //   stops: number;
// //   amenities: string[];
// //   baggageAllowance: string;
// // };

// // type HotelOption = {
// //   id: string;
// //   name: string;
// //   images: string[];
// //   rating: number;
// //   reviews: number;
// //   location: {
// //     name: string;
// //     coordinates: { lat: number; lng: number };
// //     distanceToCenter: number;
// //   };
// //   pricePerNight: number;
// //   totalPrice: number;
// //   roomType: string;
// //   amenities: string[];
// //   cancellationPolicy: string;
// //   breakfastIncluded: boolean;
// //   bookingUrl: string;
// // };

// // type Recommendation = {
// //   id: string;
// //   type: 'restaurant' | 'activity' | 'tip' | 'warning';
// //   title: string;
// //   description: string;
// //   priority: 'high' | 'medium' | 'low';
// // };

// // // ============================================
// // // 2. TRIP PLANNING CONTEXT
// // // ============================================

// // interface TripPlanningContextType {
// //   preferences: TripPreferences | null;
// //   itinerary: GeneratedItinerary | null;
// //   isGenerating: boolean;
// //   setPreferences: (prefs: TripPreferences) => void;
// //   generateItinerary: () => Promise<void>;
// //   updateActivity: (dayId: string, activityId: string, updates: Partial<Activity>) => void;
// //   removeActivity: (dayId: string, activityId: string) => void;
// //   addCustomActivity: (dayId: string, activity: Activity) => void;
// //   selectFlight: (flightId: string) => void;
// //   selectHotel: (hotelId: string) => void;
// //   resetTrip: () => void;
// // }

// // const TripPlanningContext = createContext<TripPlanningContextType | undefined>(undefined);

// // export const TripPlanningProvider = ({ children }: { children: ReactNode }) => {
// //   const [preferences, setPreferences] = useState<TripPreferences | null>(null);
// //   const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
// //   const [isGenerating, setIsGenerating] = useState(false);

// //   const generateItinerary = async () => {
// //     if (!preferences) return;

// //     setIsGenerating(true);

// //     try {
// //       // STEP 1: Fetch destination data
// //       const destinationData = await fetchDestinationData(preferences.destinationId);

// //       // STEP 2: Get flights based on dates and travelers
// //       const flights = await searchFlights({
// //         destination: preferences.destination,
// //         startDate: preferences.startDate,
// //         endDate: preferences.endDate,
// //         travelers: preferences.travelers,
// //         budget: preferences.budget,
// //       });

// //       // STEP 3: Get hotels based on preferences
// //       const hotels = await searchHotels({
// //         destination: preferences.destinationId,
// //         checkIn: preferences.startDate,
// //         checkOut: preferences.endDate,
// //         guests: preferences.travelers,
// //         budget: preferences.budget,
// //       });

// //       // STEP 4: Generate day-by-day itinerary using AI
// //       const days = await generateDailyItinerary({
// //         destination: destinationData,
// //         preferences,
// //         numberOfDays: calculateDays(preferences.startDate, preferences.endDate),
// //       });

// //       // STEP 5: Get personalized recommendations
// //       const recommendations = await getRecommendations({
// //         destination: preferences.destinationId,
// //         interests: preferences.interests,
// //         travelStyle: preferences.travelStyle,
// //       });

// //       // STEP 6: Calculate total cost
// //       const totalCost = calculateTotalCost(days, flights, hotels);

// //       setItinerary({
// //         id: generateId(),
// //         destination: preferences.destination,
// //         days,
// //         flights,
// //         hotels,
// //         totalCost,
// //         recommendations,
// //       });
// //     } catch (error) {
// //       console.error('Failed to generate itinerary:', error);
// //     } finally {
// //       setIsGenerating(false);
// //     }
// //   };

// //   const updateActivity = (dayId: string, activityId: string, updates: Partial<Activity>) => {
// //     if (!itinerary) return;
// //     // Update logic here
// //   };

// //   const removeActivity = (dayId: string, activityId: string) => {
// //     if (!itinerary) return;
// //     // Remove logic here
// //   };

// //   const addCustomActivity = (dayId: string, activity: Activity) => {
// //     if (!itinerary) return;
// //     // Add logic here
// //   };

// //   const selectFlight = (flightId: string) => {
// //     // Flight selection logic
// //   };

// //   const selectHotel = (hotelId: string) => {
// //     // Hotel selection logic
// //   };

// //   const resetTrip = () => {
// //     setPreferences(null);
// //     setItinerary(null);
// //   };

// //   return (
// //     <TripPlanningContext.Provider
// //       value={{
// //         preferences,
// //         itinerary,
// //         isGenerating,
// //         setPreferences,
// //         generateItinerary,
// //         updateActivity,
// //         removeActivity,
// //         addCustomActivity,
// //         selectFlight,
// //         selectHotel,
// //         resetTrip,
// //       }}
// //     >
// //       {children}
// //     </TripPlanningContext.Provider>
// //   );
// // };

// // export const useTripPlanning = () => {
// //   const context = useContext(TripPlanningContext);
// //   if (!context) throw new Error('useTripPlanning must be used within TripPlanningProvider');
// //   return context;
// // };

// // // ============================================
// // // 3. API INTEGRATION FUNCTIONS
// // // ============================================

// // // Fetch destination-specific data
// // async function fetchDestinationData(destinationId: string) {
// //   const response = await fetch(`/api/destinations/${destinationId}`);
// //   return response.json();
// //   // Returns: attractions, restaurants, activities, local tips, weather, etc.
// // }

// // // Search flights using Amadeus API
// // async function searchFlights(params: {
// //   destination: string;
// //   startDate: string;
// //   endDate: string;
// //   travelers: number;
// //   budget: string;
// // }): Promise<FlightOption[]> {
// //   const response = await fetch('/api/flights/search', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify(params),
// //   });
// //   return response.json();

// //   // Real implementation would call:
// //   // - Amadeus Flight Offers Search API
// //   // - Skyscanner API
// //   // - Your backend aggregator
// // }

// // // Search hotels using Booking.com or Hotels.com API
// // async function searchHotels(params: {
// //   destination: string;
// //   checkIn: string;
// //   checkOut: string;
// //   guests: number;
// //   budget: string;
// // }): Promise<HotelOption[]> {
// //   const response = await fetch('/api/hotels/search', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify(params),
// //   });
// //   return response.json();

// //   // Real implementation would call:
// //   // - Booking.com API
// //   // - Hotels.com API
// //   // - Amadeus Hotel Search API
// // }

// // // Generate daily itinerary using AI
// // async function generateDailyItinerary(params: {
// //   destination: any;
// //   preferences: TripPreferences;
// //   numberOfDays: number;
// // }): Promise<ItineraryDay[]> {
// //   const response = await fetch('/api/itinerary/generate', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify(params),
// //   });
// //   return response.json();

// //   // Real implementation:
// //   // 1. Send to OpenAI/Claude API with destination data
// //   // 2. AI analyzes interests, pace, budget
// //   // 3. Selects activities from database
// //   // 4. Optimizes route (using Google Maps Distance Matrix)
// //   // 5. Schedules activities logically
// //   // 6. Returns structured itinerary
// // }

// // // Get personalized recommendations
// // async function getRecommendations(params: {
// //   destination: string;
// //   interests: string[];
// //   travelStyle: string;
// // }): Promise<Recommendation[]> {
// //   const response = await fetch('/api/recommendations', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify(params),
// //   });
// //   return response.json();
// // }

// // // ============================================
// // // 4. HELPER FUNCTIONS
// // // ============================================

// // function calculateDays(startDate: string, endDate: string): number {
// //   const start = new Date(startDate);
// //   const end = new Date(endDate);
// //   return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
// // }

// // function calculateTotalCost(
// //   days: ItineraryDay[],
// //   flights: FlightOption[],
// //   hotels: HotelOption[]
// // ): number {
// //   const activitiesCost = days.reduce((total, day) => {
// //     return total + day.activities.reduce((sum, activity) => sum + activity.price, 0);
// //   }, 0);

// //   const flightsCost = flights[0]?.price || 0; // Selected flight
// //   const hotelsCost = hotels[0]?.totalPrice || 0; // Selected hotel

// //   return activitiesCost + flightsCost + hotelsCost;
// // }

// // function generateId(): string {
// //   return `trip-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
// // }

// // // ============================================
// // // 5. DATABASE SCHEMA (Backend)
// // // ============================================

// // /**
// //  * DESTINATIONS TABLE
// //  * - id, name, country, description, coordinates
// //  * - climate, best_season, avg_temp
// //  * - currency, language, timezone
// //  * - highlights[], categories[]
// //  *
// //  * ATTRACTIONS TABLE
// //  * - id, destination_id, name, description
// //  * - category (museum, landmark, park, beach)
// //  * - coordinates, address, opening_hours
// //  * - avg_duration, price, rating
// //  * - images[], booking_url
// //  *
// //  * RESTAURANTS TABLE
// //  * - id, destination_id, name, cuisine
// //  * - price_range, rating, coordinates
// //  * - opening_hours, popular_dishes[]
// //  *
// //  * ACTIVITIES TABLE
// //  * - id, destination_id, name, type
// //  * - duration, price, difficulty
// //  * - season_availability, group_size
// //  *
// //  * USER_TRIPS TABLE
// //  * - id, user_id, destination_id
// //  * - preferences (JSON), itinerary (JSON)
// //  * - selected_flight_id, selected_hotel_id
// //  * - status, created_at, updated_at
// //  */

// // // ============================================
// // // 6. AI PROMPT ENGINEERING
// // // ============================================

// // function buildAIPrompt(params: {
// //   destination: any;
// //   preferences: TripPreferences;
// //   numberOfDays: number;
// // }): string {
// //   return `
// // You are an expert travel planner. Create a ${params.numberOfDays}-day itinerary for ${params.destination.name}.

// // User Preferences:
// // - Travel Style: ${params.preferences.travelStyle}
// // - Interests: ${params.preferences.interests.join(', ')}
// // - Budget: ${params.preferences.budget}
// // - Pace: ${params.preferences.pace}
// // - Travelers: ${params.preferences.travelers}

// // Available Attractions:
// // ${JSON.stringify(params.destination.attractions, null, 2)}

// // Available Restaurants:
// // ${JSON.stringify(params.destination.restaurants, null, 2)}

// // Requirements:
// // 1. Create a logical day-by-day schedule (9 AM - 9 PM)
// // 2. Include breakfast, lunch, dinner
// // 3. Mix activities based on interests
// // 4. Optimize travel time between locations
// // 5. Respect budget constraints
// // 6. Match the specified pace (relaxed = 2-3 activities, packed = 5-6)
// // 7. Add rest breaks
// // 8. Include local tips and cultural insights

// // Return JSON format:
// // {
// //   "days": [
// //     {
// //       "day": 1,
// //       "date": "2025-11-15",
// //       "activities": [
// //         {
// //           "time": "09:00",
// //           "title": "...",
// //           "location": {...},
// //           "duration": 120,
// //           "price": 25,
// //           "type": "attraction",
// //           "description": "...",
// //           "tips": ["..."]
// //         }
// //       ]
// //     }
// //   ]
// // }
// // `;
// // }

// // // ============================================
// // // 7. USAGE IN DESTINATION DETAILS PAGE
// // // ============================================

// // /**
// //  * DestinationDetailsPage.tsx
// //  *
// //  * import { useTripPlanning } from '@/context/TripPlanningContext';
// //  *
// //  * const DestinationDetailsPage = () => {
// //  *   const { destinationId } = useParams();
// //  *   const { setPreferences, generateItinerary, itinerary } = useTripPlanning();
// //  *
// //  *   const handlePlanTrip = (formData) => {
// //  *     setPreferences({
// //  *       destination: 'Santorini',
// //  *       destinationId,
// //  *       ...formData
// //  *     });
// //  *     await generateItinerary();
// //  *   };
// //  *
// //  *   return (
// //  *     <>
// //  *       <DestinationHero />
// //  *       <DestinationInfo />
// //  *       <TripPlanningSection onSubmit={handlePlanTrip} />
// //  *       {itinerary && <GeneratedItinerary data={itinerary} />}
// //  *     </>
// //  *   );
// //  * };
// //  */

// // export default {
// //   TripPlanningProvider,
// //   useTripPlanning,
// //   // Export types for use in components
// //   type: {
// //     TripPreferences,
// //     GeneratedItinerary,
// //     Activity,
// //     FlightOption,
// //     HotelOption,
// //   },
// // };

import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Welcome() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast({
        title: 'Email required',
        description: 'Please enter a valid email to subscribe 📩',
        className: 'bg-red-500 text-white border-none shadow-lg font-medium',
      });
      return;
    }

    toast({
      title: 'Subscription Successful!',
      description: 'You’ll start receiving the latest travel stories soon ✈️',
      className:
        'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none shadow-xl font-medium',
      duration: 4000,
    });

    setEmail('');
  };

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg p-6 text-primary-foreground border max-w-sm w-full">
      <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
      <p className="text-sm text-primary-foreground/90 mb-4">
        Get the latest travel stories delivered to your inbox.
      </p>
      <Input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="mb-3 bg-primary-foreground/20 border-primary text-primary-foreground placeholder:text-primary-foreground/70"
      />
      <Button
        onClick={handleSubscribe}
        className="w-full bg-background text-foreground hover:bg-background/90"
      >
        Subscribe
      </Button>
    </div>
  );
}
