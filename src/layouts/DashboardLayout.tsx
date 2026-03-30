// import { useState, useEffect } from 'react';
// import {
//   Calendar,
//   MapPin,
//   DollarSign,
//   TrendingUp,
//   Menu,
//   X,
//   Home,
//   Ticket,
//   User,
//   Settings,
//   LogOut,
//   Eye,
//   XCircle,
//   Clock,
//   CheckCircle2,
//   Plane,
//   Search,
//   Filter,
//   Plus,
//   Star,
// } from 'lucide-react';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Separator } from '@/components/ui/separator';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { ScrollArea } from '@/components/ui/scroll-area';

// // Mock Data - Will be replaced with real API data
// const userStats = {
//   totalBookings: 5,
//   upcomingTrips: 2,
//   totalSpent: 4200,
//   savedDestinations: 8,
// };

// const popularDestinations = [
//   {
//     id: 1,
//     name: 'Bali Paradise',
//     location: 'Bali, Indonesia',
//     price: 1299,
//     rating: 4.8,
//     image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400',
//     category: 'Beach',
//   },
//   {
//     id: 2,
//     name: 'Tokyo Adventure',
//     location: 'Tokyo, Japan',
//     price: 1850,
//     rating: 4.9,
//     image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
//     category: 'City',
//   },
//   {
//     id: 3,
//     name: 'Paris Romance',
//     location: 'Paris, France',
//     price: 2100,
//     rating: 4.7,
//     image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
//     category: 'City',
//   },
//   {
//     id: 4,
//     name: 'Dubai Luxury',
//     location: 'Dubai, UAE',
//     price: 3200,
//     rating: 4.6,
//     image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
//     category: 'City',
//   },
// ];

// export default function UserDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [activeTab, setActiveTab] = useState('home');
//   const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
//   const [myBookings, setMyBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Get current user info from localStorage
//   const currentUserId = localStorage.getItem('userId') || '';
//   const currentUserName = localStorage.getItem('userName') || 'User';
//   const currentUserEmail =
//     localStorage.getItem('userEmail') || 'user@email.com';
//   const currentUserAvatar = localStorage.getItem('userAvatar') || null;
//   const token = localStorage.getItem('authToken');

//   const menuItems = [
//     { icon: Home, label: 'Home', value: 'home' },
//     { icon: Ticket, label: 'My Bookings', value: 'bookings' },
//     { icon: MapPin, label: 'Browse Destinations', value: 'destinations' },
//     { icon: User, label: 'My Profile', value: 'profile' },
//     { icon: Settings, label: 'Settings', value: 'settings' },
//   ];

//   // Fetch user's bookings
//   const fetchMyBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch('http://localhost:3000/bookings', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMyBookings(data);
//         console.log('✅ Fetched my bookings:', data);
//       } else {
//         console.error('Failed to fetch bookings');
//       }
//     } catch (err) {
//       console.error('Error fetching bookings:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyBookings();
//   }, []);

//   const handleCancelBooking = (bookingId: string) => {
//     setSelectedBooking(bookingId);
//     setCancelDialogOpen(true);
//   };

//   const confirmCancel = () => {
//     console.log('Cancelling booking:', selectedBooking);
//     setCancelDialogOpen(false);
//     setSelectedBooking(null);
//     // TODO: Call API to cancel booking
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'confirmed':
//         return <CheckCircle2 className="h-4 w-4 text-green-500" />;
//       case 'pending':
//         return <Clock className="h-4 w-4 text-yellow-500" />;
//       case 'cancelled':
//         return <XCircle className="h-4 w-4 text-red-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-background">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           sidebarOpen ? 'w-64' : 'w-20'
//         } bg-card border-r border-border transition-all duration-300 flex flex-col`}
//       >
//         {/* Logo */}
//         <div className="p-6 border-b border-border flex items-center justify-between">
//           {sidebarOpen && (
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               TravelMate
//             </h1>
//           )}
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="ml-auto"
//           >
//             {sidebarOpen ? (
//               <X className="h-5 w-5" />
//             ) : (
//               <Menu className="h-5 w-5" />
//             )}
//           </Button>
//         </div>

//         {/* Menu Items */}
//         <ScrollArea className="flex-1 p-4">
//           <nav className="space-y-2">
//             {menuItems.map(item => (
//               <Button
//                 key={item.value}
//                 variant={activeTab === item.value ? 'default' : 'ghost'}
//                 onClick={() => setActiveTab(item.value)}
//                 className={`w-full justify-start gap-3 ${
//                   !sidebarOpen && 'justify-center'
//                 }`}
//               >
//                 <item.icon className="h-5 w-5 flex-shrink-0" />
//                 {sidebarOpen && <span>{item.label}</span>}
//               </Button>
//             ))}
//           </nav>
//         </ScrollArea>

//         <Separator />

//         {/* User Profile & Logout */}
//         <div className="p-4 space-y-2">
//           {sidebarOpen && (
//             <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
//               <div className="relative">
//                 <Avatar className="h-10 w-10">
//                   <AvatarImage src={currentUserAvatar || undefined} />
//                   <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
//                     {currentUserName
//                       .split(' ')
//                       .map(n => n[0])
//                       .join('')
//                       .toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//                 {/* Pulsing indicator */}
//                 <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-card"></span>
//                 </span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">
//                   {currentUserName}
//                 </p>
//                 <p className="text-xs text-muted-foreground truncate">
//                   {currentUserEmail}
//                 </p>
//               </div>
//             </div>
//           )}
//           <Button
//             variant="outline"
//             className={`w-full gap-2 ${!sidebarOpen && 'justify-center'}`}
//           >
//             <LogOut className="h-4 w-4" />
//             {sidebarOpen && <span>Logout</span>}
//           </Button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         {/* Header */}
//         <header className="bg-card border-b border-border p-6 sticky top-0 z-10">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-3xl font-bold">
//                 {activeTab === 'home' && `Welcome back, ${currentUserName}!`}
//                 {activeTab === 'bookings' && 'My Bookings'}
//                 {activeTab === 'destinations' && 'Browse Destinations'}
//                 {activeTab === 'profile' && 'My Profile'}
//                 {activeTab === 'settings' && 'Settings'}
//               </h2>
//               <p className="text-muted-foreground mt-1">
//                 {activeTab === 'home' && 'Plan your next adventure'}
//                 {activeTab === 'bookings' && 'View and manage your trips'}
//                 {activeTab === 'destinations' &&
//                   'Discover amazing places to visit'}
//                 {activeTab === 'profile' && 'Manage your personal information'}
//                 {activeTab === 'settings' && 'Customize your preferences'}
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <Button variant="outline" size="icon">
//                 <Search className="h-4 w-4" />
//               </Button>
//               <Badge variant="secondary" className="px-3 py-1">
//                 Traveler
//               </Badge>
//             </div>
//           </div>
//         </header>

//         {/* Content Area */}
//         <div className="p-6">
//           {activeTab === 'home' && (
//             <div className="space-y-6">
//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
//                   <CardHeader className="flex flex-row items-center justify-between pb-2">
//                     <CardTitle className="text-sm font-medium">
//                       Total Bookings
//                     </CardTitle>
//                     <Ticket className="h-5 w-5 opacity-80" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-3xl font-bold">
//                       {myBookings.length}
//                     </div>
//                     <p className="text-xs opacity-80 mt-2">All time</p>
//                   </CardContent>
//                 </Card>

//                 <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
//                   <CardHeader className="flex flex-row items-center justify-between pb-2">
//                     <CardTitle className="text-sm font-medium">
//                       Upcoming Trips
//                     </CardTitle>
//                     <Plane className="h-5 w-5 opacity-80" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-3xl font-bold">
//                       {userStats.upcomingTrips}
//                     </div>
//                     <p className="text-xs opacity-80 mt-2">Next 30 days</p>
//                   </CardContent>
//                 </Card>

//                 <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
//                   <CardHeader className="flex flex-row items-center justify-between pb-2">
//                     <CardTitle className="text-sm font-medium">
//                       Total Spent
//                     </CardTitle>
//                     <DollarSign className="h-5 w-5 opacity-80" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-3xl font-bold">
//                       ${userStats.totalSpent}
//                     </div>
//                     <p className="text-xs opacity-80 mt-2">All bookings</p>
//                   </CardContent>
//                 </Card>

//                 <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
//                   <CardHeader className="flex flex-row items-center justify-between pb-2">
//                     <CardTitle className="text-sm font-medium">
//                       Saved Places
//                     </CardTitle>
//                     <MapPin className="h-5 w-5 opacity-80" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-3xl font-bold">
//                       {userStats.savedDestinations}
//                     </div>
//                     <p className="text-xs opacity-80 mt-2">Favorites</p>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Quick Actions */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Quick Actions</CardTitle>
//                   <CardDescription>
//                     Get started with your travel plans
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <Button
//                     className="h-24 flex flex-col gap-2"
//                     onClick={() => setActiveTab('destinations')}
//                   >
//                     <Plus className="h-6 w-6" />
//                     <span>Book New Trip</span>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="h-24 flex flex-col gap-2"
//                     onClick={() => setActiveTab('bookings')}
//                   >
//                     <Ticket className="h-6 w-6" />
//                     <span>View My Bookings</span>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="h-24 flex flex-col gap-2"
//                     onClick={() => setActiveTab('profile')}
//                   >
//                     <User className="h-6 w-6" />
//                     <span>Edit Profile</span>
//                   </Button>
//                 </CardContent>
//               </Card>

//               {/* Popular Destinations */}
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between">
//                   <div>
//                     <CardTitle>Popular Destinations</CardTitle>
//                     <CardDescription>
//                       Trending travel spots this month
//                     </CardDescription>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     onClick={() => setActiveTab('destinations')}
//                   >
//                     View All
//                   </Button>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {popularDestinations.map(dest => (
//                       <Card
//                         key={dest.id}
//                         className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
//                       >
//                         <div className="relative h-40">
//                           <img
//                             src={dest.image}
//                             alt={dest.name}
//                             className="w-full h-full object-cover"
//                           />
//                           <Badge className="absolute top-2 right-2">
//                             {dest.category}
//                           </Badge>
//                         </div>
//                         <CardContent className="p-4">
//                           <h3 className="font-semibold text-lg">{dest.name}</h3>
//                           <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
//                             <MapPin className="h-3 w-3" />
//                             {dest.location}
//                           </p>
//                           <div className="flex items-center justify-between mt-3">
//                             <div className="flex items-center gap-1">
//                               <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                               <span className="text-sm font-medium">
//                                 {dest.rating}
//                               </span>
//                             </div>
//                             <span className="text-lg font-bold">
//                               ${dest.price}
//                             </span>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           )}

//           {activeTab === 'bookings' && (
//             <div className="space-y-6">
//               {/* My Bookings Table */}
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between">
//                   <div>
//                     <CardTitle>My Bookings</CardTitle>
//                     <CardDescription>
//                       All your trip bookings in one place
//                     </CardDescription>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Select defaultValue="all">
//                       <SelectTrigger className="w-[150px]">
//                         <SelectValue placeholder="Filter status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All Status</SelectItem>
//                         <SelectItem value="confirmed">Confirmed</SelectItem>
//                         <SelectItem value="pending">Pending</SelectItem>
//                         <SelectItem value="cancelled">Cancelled</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <Button
//                       size="sm"
//                       onClick={() => setActiveTab('destinations')}
//                     >
//                       <Plus className="h-4 w-4 mr-2" />
//                       New Booking
//                     </Button>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   {loading ? (
//                     <div className="text-center py-12 text-muted-foreground">
//                       Loading your bookings...
//                     </div>
//                   ) : myBookings.length === 0 ? (
//                     <div className="text-center py-12">
//                       <Ticket className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
//                       <h3 className="text-lg font-semibold mb-2">
//                         No bookings yet
//                       </h3>
//                       <p className="text-muted-foreground mb-4">
//                         Start your adventure by booking your first trip!
//                       </p>
//                       <Button onClick={() => setActiveTab('destinations')}>
//                         <Plus className="h-4 w-4 mr-2" />
//                         Browse Destinations
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="rounded-md border">
//                       <div className="overflow-x-auto">
//                         <table className="w-full">
//                           <thead>
//                             <tr className="border-b bg-muted/50">
//                               <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
//                                 Booking ID
//                               </th>
//                               <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
//                                 Destination
//                               </th>
//                               <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
//                                 Date Booked
//                               </th>
//                               <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
//                                 Status
//                               </th>
//                               <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
//                                 Actions
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {myBookings.map(booking => (
//                               <tr
//                                 key={booking.id}
//                                 className="border-b transition-colors hover:bg-muted/50"
//                               >
//                                 <td className="p-4 align-middle font-medium">
//                                   #{booking.id.substring(0, 8)}
//                                 </td>
//                                 <td className="p-4 align-middle">
//                                   {booking.hotelId || 'Destination Name'}
//                                 </td>
//                                 <td className="p-4 align-middle">
//                                   {booking.createdAt
//                                     ?.toDate?.()
//                                     ?.toLocaleDateString() || 'N/A'}
//                                 </td>
//                                 <td className="p-4 align-middle">
//                                   <Badge variant="secondary" className="gap-1">
//                                     <Clock className="h-3 w-3" />
//                                     Pending
//                                   </Badge>
//                                 </td>
//                                 <td className="p-4 align-middle text-right">
//                                   <DropdownMenu>
//                                     <DropdownMenuTrigger asChild>
//                                       <Button variant="ghost" size="icon">
//                                         <Eye className="h-4 w-4" />
//                                       </Button>
//                                     </DropdownMenuTrigger>
//                                     <DropdownMenuContent align="end">
//                                       <DropdownMenuLabel>
//                                         Actions
//                                       </DropdownMenuLabel>
//                                       <DropdownMenuSeparator />
//                                       <DropdownMenuItem className="gap-2">
//                                         <Eye className="h-4 w-4" />
//                                         View Details
//                                       </DropdownMenuItem>
//                                       <DropdownMenuSeparator />
//                                       <DropdownMenuItem
//                                         className="gap-2 text-destructive focus:text-destructive"
//                                         onClick={() =>
//                                           handleCancelBooking(booking.id)
//                                         }
//                                       >
//                                         <XCircle className="h-4 w-4" />
//                                         Cancel Booking
//                                       </DropdownMenuItem>
//                                     </DropdownMenuContent>
//                                   </DropdownMenu>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>
//           )}

//           {activeTab === 'destinations' && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Browse Destinations</CardTitle>
//                 <CardDescription>
//                   Discover and book amazing travel destinations
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex gap-2">
//                     <Input
//                       placeholder="Search destinations..."
//                       className="flex-1"
//                     />
//                     <Button variant="outline" size="icon">
//                       <Filter className="h-4 w-4" />
//                     </Button>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {popularDestinations.map(dest => (
//                       <Card
//                         key={dest.id}
//                         className="overflow-hidden hover:shadow-lg transition-shadow"
//                       >
//                         <div className="relative h-48">
//                           <img
//                             src={dest.image}
//                             alt={dest.name}
//                             className="w-full h-full object-cover"
//                           />
//                           <Badge className="absolute top-3 right-3">
//                             {dest.category}
//                           </Badge>
//                         </div>
//                         <CardContent className="p-4">
//                           <h3 className="font-semibold text-xl mb-2">
//                             {dest.name}
//                           </h3>
//                           <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
//                             <MapPin className="h-4 w-4" />
//                             {dest.location}
//                           </p>
//                           <div className="flex items-center justify-between mb-4">
//                             <div className="flex items-center gap-1">
//                               <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                               <span className="font-medium">{dest.rating}</span>
//                               <span className="text-xs text-muted-foreground">
//                                 (234 reviews)
//                               </span>
//                             </div>
//                             <span className="text-2xl font-bold">
//                               ${dest.price}
//                             </span>
//                           </div>
//                           <Button className="w-full">Book Now</Button>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {activeTab === 'profile' && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>My Profile</CardTitle>
//                 <CardDescription>
//                   Manage your personal information
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   Profile editing interface coming soon...
//                 </p>
//               </CardContent>
//             </Card>
//           )}

//           {activeTab === 'settings' && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Settings</CardTitle>
//                 <CardDescription>Customize your preferences</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   Settings interface coming soon...
//                 </p>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </main>

//       {/* Cancel Confirmation AlertDialog */}
//       <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to cancel booking{' '}
//               <span className="font-semibold">
//                 #{selectedBooking?.substring(0, 8)}
//               </span>
//               ? This action may incur cancellation fees depending on the
//               cancellation policy.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Keep Booking</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={confirmCancel}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//             >
//               Cancel Booking
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }

import { useAuth } from '@/context/AuthContext';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Ticket,
  Star,
  User,
  Settings,
  LogOut,
  Shield,
  Menu,
  Compass,
  ChevronRight,
  Wallet,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAdmin } from '@/hooks/use-admin';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.26, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.16, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const coreNav = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Ticket, label: 'My Bookings', path: '/dashboard/bookings' },
  { icon: Star, label: 'My Reviews', path: '/dashboard/reviews' },
];
const accountNav = [
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function UserDashboardLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: profile } = useQuery<any>({
    queryKey: ['profile'],
    queryFn: () => api.get('/auth/profile'),
    enabled: !!user && !user.isAnonymous,
  });

  useEffect(() => {
    if (!user || user.isAnonymous) navigate('/signin');
  }, [user, navigate]);

  if (!user || user.isAnonymous) return null;

  const adminItems =
    isAdmin && !adminLoading
      ? [{ icon: Shield, label: 'Admin Panel', path: '/dashboard/admin' }]
      : [];

  const allNav = [...coreNav, ...accountNav, ...adminItems];
  const currentItem = allNav.find(item =>
    item.path === '/dashboard'
      ? location.pathname === '/dashboard'
      : location.pathname.startsWith(item.path)
  );

  const initials = user.email?.slice(0, 2).toUpperCase() ?? 'U';
  const displayName = user.displayName || user.email?.split('@')[0] || 'User';
  const totalBookings = profile?.account?.totalBookings ?? 0;
  const loyaltyPoints = profile?.account?.loyaltyPoints ?? 0;

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      setSheetOpen(false);
      await signOut();
      navigate('/signin');
    } finally {
      setLoggingOut(false);
    }
  };

  /* ── Nav Row ──────────────────────────────────────────── */
  function NavRow({
    item,
    onNav,
    danger = false,
  }: {
    item: any;
    onNav?: (() => void) | null;
    danger?: boolean;
  }) {
    const active = !danger && item === currentItem;
    const [hov, setHov] = useState(false);

    // Use CSS vars mapped to inline hsl() so we respect the theme
    // primary: hsl(231 48% 48%) — the blue from the design token
    const primaryHsl = '231, 48%, 48%';
    const primaryLight = `hsla(${primaryHsl}, 0.10)`; // subtle bg
    const primaryMid = `hsla(${primaryHsl}, 0.16)`; // hover bg
    const primarySolid = `hsl(${primaryHsl})`; // icon bg when active
    const primaryText = `hsl(231, 50%, 38%)`; // dark label when active
    // logout uses a muted slate instead of red
    const logoutIcon = 'hsl(231, 25%, 55%)';
    const logoutHovBg = 'hsla(231, 48%, 48%, 0.08)';
    const logoutText = 'hsl(231, 30%, 45%)';

    const bg = active
      ? primaryLight
      : hov
        ? danger
          ? logoutHovBg
          : primaryMid
        : 'transparent';
    const iconContainerBg = active
      ? primarySolid
      : danger
        ? hov
          ? 'hsla(231,48%,48%,0.12)'
          : 'hsl(231,30%,94%)'
        : hov
          ? primaryLight
          : 'hsl(220,20%,94%)';
    const iconColor = active
      ? '#fff'
      : danger
        ? hov
          ? primarySolid
          : logoutIcon
        : hov
          ? primarySolid
          : 'hsl(215,20%,52%)';
    const textColor = active
      ? primaryText
      : danger
        ? hov
          ? primarySolid
          : logoutText
        : hov
          ? 'hsl(231,30%,25%)'
          : 'hsl(215,20%,30%)';

    const inner = (
      <div
        className="flex items-center gap-3.5 px-3 py-3 rounded-2xl w-full cursor-pointer"
        style={{ background: bg, transition: 'background 0.17s ease' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={danger ? () => onNav?.() : undefined}
      >
        {/* Icon box */}
        <span
          className="flex shrink-0 items-center justify-center h-9 w-9 rounded-xl"
          style={{
            background: iconContainerBg,
            transition: 'background 0.17s ease',
          }}
        >
          <item.icon
            className="h-[18px] w-[18px]"
            strokeWidth={active ? 2 : 1.6}
            style={{ color: iconColor, transition: 'color 0.17s ease' }}
          />
        </span>
        {/* Label */}
        <span
          style={{
            fontSize: 14.5,
            fontWeight: active ? 500 : 400,
            color: textColor,
            fontFamily: "'Sora', sans-serif",
            letterSpacing: '0.005em',
            flex: 1,
            transition: 'color 0.17s ease',
          }}
        >
          {item.label}
        </span>
        {active && (
          <ChevronRight
            className="h-4 w-4 shrink-0"
            strokeWidth={2.2}
            style={{ color: primarySolid, opacity: 0.7 }}
          />
        )}
      </div>
    );

    if (danger) return inner;
    return (
      <Link
        to={item.path}
        onClick={onNav}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        {inner}
      </Link>
    );
  }

  /* ── Sidebar Body ─────────────────────────────────────── */
  const SidebarBody = ({ onNav }: { onNav?: () => void }) => {
    const primary = 'hsl(231, 48%, 48%)';
    const primaryGrad =
      'linear-gradient(135deg, hsl(231,48%,52%), hsl(231,48%,42%))';

    return (
      <div
        className="flex flex-col h-full"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
            style={{
              background: primaryGrad,
              boxShadow: '0 4px 14px hsla(231,48%,48%,0.35)',
            }}
          >
            <Compass className="h-4.5 w-4.5 text-white" strokeWidth={1.5} />
          </div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 300,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              background: primaryGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            TravelMate
          </span>
        </div>

        <div
          style={{
            height: 1,
            background: 'hsl(var(--border))',
            margin: '0 20px',
          }}
        />

        {/* User block */}
        <div className="flex flex-col items-center px-6 py-7 gap-4">
          <div className="relative">
            <Avatar
              className="h-20 w-20"
              style={{
                boxShadow: `0 0 0 3px #fff, 0 0 0 5.5px hsla(231,48%,48%,0.25)`,
              }}
            >
              <AvatarFallback
                style={{
                  background: primaryGrad,
                  color: '#fff',
                  fontSize: 26,
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            {user.emailVerified && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  background: primary,
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 9.5,
                  fontWeight: 700,
                  border: '2.5px solid #fff',
                }}
              >
                ✓
              </span>
            )}
          </div>

          {/* Name */}
          <div className="text-center">
            <p
              style={{
                fontSize: 16.5,
                fontWeight: 500,
                color: 'hsl(var(--foreground))',
                letterSpacing: '-0.015em',
              }}
            >
              {displayName}
            </p>
            <p
              style={{
                fontSize: 12,
                color: 'hsl(var(--muted-foreground))',
                fontWeight: 300,
                marginTop: 3,
                letterSpacing: '0.01em',
              }}
            >
              {user.email}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            {[
              { icon: Wallet, value: loyaltyPoints, label: 'Points' },
              { icon: Ticket, value: totalBookings, label: 'Bookings' },
            ].map(s => (
              <div
                key={s.label}
                className="flex flex-col items-center py-3.5 rounded-2xl gap-1.5"
                style={{
                  background: 'hsl(var(--muted))',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                <s.icon
                  className="h-4 w-4"
                  strokeWidth={1.5}
                  style={{ color: primary }}
                />
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: 'hsl(var(--foreground))',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: 10.5,
                    color: 'hsl(var(--muted-foreground))',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: 'hsl(var(--border))',
            margin: '0 20px',
          }}
        />

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p
            style={{
              fontSize: 9.5,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'hsl(var(--muted-foreground))',
              fontWeight: 400,
              padding: '0 12px 8px',
            }}
          >
            Navigate
          </p>
          <div className="space-y-0.5">
            {coreNav.map(item => (
              <NavRow key={item.path} item={item} onNav={onNav} />
            ))}
          </div>

          <div
            style={{
              height: 1,
              background: 'hsl(var(--border))',
              margin: '14px 12px',
            }}
          />

          <p
            style={{
              fontSize: 9.5,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'hsl(var(--muted-foreground))',
              fontWeight: 400,
              padding: '0 12px 8px',
            }}
          >
            Account
          </p>
          <div className="space-y-0.5">
            {[...accountNav, ...adminItems].map(item => (
              <NavRow key={item.path} item={item} onNav={onNav} />
            ))}
          </div>
        </nav>

        {/* Sign out */}
        <div className="px-3 pb-5">
          <div
            style={{
              height: 1,
              background: 'hsl(var(--border))',
              marginBottom: 10,
            }}
          />
          <NavRow
            item={{
              icon: LogOut,
              label: loggingOut ? 'Signing out…' : 'Sign Out',
              path: '__logout',
            }}
            onNav={handleLogout}
            danger
          />
        </div>

        {/* <div className="px-3 pb-4">
          <div
            className='bg-red-300'
            style={{ height: '1px', background: '#f0f2f5', marginBottom: 8 }}
          />
          <NavRow
            item={{
              icon: LogOut,
              label: loggingOut ? 'Signing out…' : 'Sign Out',
              path: '__logout',
            }}
            currentItem={null}
            onNav={handleLogout}
            danger
          />
        </div> */}
      </div>
    );
  };

  /* ── Render ───────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500;600&display=swap');
        .dl-root, .dl-root * { font-family: 'Sora', sans-serif; }
        .dl-scroll::-webkit-scrollbar { width: 3px; }
        .dl-scroll::-webkit-scrollbar-track { background: transparent; }
        .dl-scroll::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 99px; }
      `}</style>

      <div className="dl-root flex h-screen w-full overflow-hidden bg-background">
        {/* Desktop sidebar */}
        <aside
          className="dl-scroll hidden lg:block h-full overflow-y-auto shrink-0"
          style={{
            width: 300,
            background: 'hsl(var(--card))',
            borderRight: '1px solid hsl(var(--border))',
            boxShadow: '4px 0 28px rgba(0,0,0,0.05)',
          }}
        >
          <SidebarBody />
        </aside>

        {/* Main column */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
        
          <header
            className="flex items-center justify-between px-5 lg:px-8 py-4 sticky top-0 z-20"
            style={{
              background: 'hsl(var(--card) / 0.96)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderBottom: '1px solid hsl(var(--border))',
              minHeight: 64,
            }}
          >
            <div className="flex items-center gap-4 flex-1">
              {/* Mobile trigger */}
               <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button
                    className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl"
                    style={{
                      background: 'hsl(var(--muted))',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <Menu
                      className="h-5 w-5"
                      strokeWidth={1.5}
                      style={{ color: 'hsl(var(--foreground))' }}
                    />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="p-0 overflow-y-auto dl-scroll"
                  style={{
                    width: 300,
                    background: 'hsl(var(--card))',
                    border: 'none',
                    boxShadow: '6px 0 40px rgba(0,0,0,0.12)',
                  }}
                >
                  <SidebarBody onNav={() => setSheetOpen(false)} />
                </SheetContent>
              </Sheet>

              <div className="flex-1">
                <h1
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: 'hsl(var(--foreground))',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {currentItem?.label ?? 'Dashboard'}
                </h1>
                <p
                  style={{
                    fontSize: 12.5,
                    color: 'hsl(var(--muted-foreground))',
                    fontWeight: 300,
                    marginTop: 2,
                  }}
                >
                  Welcome back,{' '}
                  <span
                    style={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
                  >
                    {displayName}
                  </span>
                </p>

                {/* Admin Tabs - Show when on admin routes */}
                {location.pathname.startsWith('/dashboard/admin') && (
                  <div className="flex gap-2 mt-3">
                    <Link to="/dashboard/admin">
                      <button
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background:
                            location.pathname === '/dashboard/admin'
                              ? 'hsl(231, 48%, 48%)'
                              : 'hsl(var(--muted))',
                          color:
                            location.pathname === '/dashboard/admin'
                              ? '#fff'
                              : 'hsl(var(--foreground))',
                        }}
                      >
                        Overview
                      </button>
                    </Link>
                    <Link to="/dashboard/admin/users">
                      <button
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background:
                            location.pathname === '/dashboard/admin/users'
                              ? 'hsl(231, 48%, 48%)'
                              : 'hsl(var(--muted))',
                          color:
                            location.pathname === '/dashboard/admin/users'
                              ? '#fff'
                              : 'hsl(var(--foreground))',
                        }}
                      >
                        Users
                      </button>
                    </Link>
                    <Link to="/dashboard/admin/audit-logs">
                      <button
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background:
                            location.pathname === '/dashboard/admin/audit-logs'
                              ? 'hsl(231, 48%, 48%)'
                              : 'hsl(var(--muted))',
                          color:
                            location.pathname === '/dashboard/admin/audit-logs'
                              ? '#fff'
                              : 'hsl(var(--foreground))',
                        }}
                      >
                        Audit Logs
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right side - existing code */}
            <div className="flex items-center gap-3">
              {/* ... existing avatar code ... */}
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 dl-scroll overflow-y-auto bg-background">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="p-5 lg:p-8"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}
