import { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  DollarSign,
  TrendingUp,
  Menu,
  X,
  Home,
  Ticket,
  User,
  Settings,
  LogOut,
  Eye,
  XCircle,
  Clock,
  CheckCircle2,
  Plane,
  Search,
  Filter,
  Plus,
  Star,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock Data - Will be replaced with real API data
const userStats = {
  totalBookings: 5,
  upcomingTrips: 2,
  totalSpent: 4200,
  savedDestinations: 8,
};

const popularDestinations = [
  {
    id: 1,
    name: 'Bali Paradise',
    location: 'Bali, Indonesia',
    price: 1299,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400',
    category: 'Beach',
  },
  {
    id: 2,
    name: 'Tokyo Adventure',
    location: 'Tokyo, Japan',
    price: 1850,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    category: 'City',
  },
  {
    id: 3,
    name: 'Paris Romance',
    location: 'Paris, France',
    price: 2100,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
    category: 'City',
  },
  {
    id: 4,
    name: 'Dubai Luxury',
    location: 'Dubai, UAE',
    price: 3200,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
    category: 'City',
  },
];

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Get current user info from localStorage
  const currentUserId = localStorage.getItem('userId') || '';
  const currentUserName = localStorage.getItem('userName') || 'User';
  const currentUserEmail =
    localStorage.getItem('userEmail') || 'user@email.com';
  const currentUserAvatar = localStorage.getItem('userAvatar') || null;
  const token = localStorage.getItem('authToken');

  const menuItems = [
    { icon: Home, label: 'Home', value: 'home' },
    { icon: Ticket, label: 'My Bookings', value: 'bookings' },
    { icon: MapPin, label: 'Browse Destinations', value: 'destinations' },
    { icon: User, label: 'My Profile', value: 'profile' },
    { icon: Settings, label: 'Settings', value: 'settings' },
  ];

  // Fetch user's bookings
  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setMyBookings(data);
        console.log('✅ Fetched my bookings:', data);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    console.log('Cancelling booking:', selectedBooking);
    setCancelDialogOpen(false);
    setSelectedBooking(null);
    // TODO: Call API to cancel booking
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TravelMate
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Menu Items */}
        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-2">
            {menuItems.map(item => (
              <Button
                key={item.value}
                variant={activeTab === item.value ? 'default' : 'ghost'}
                onClick={() => setActiveTab(item.value)}
                className={`w-full justify-start gap-3 ${
                  !sidebarOpen && 'justify-center'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <Separator />

        {/* User Profile & Logout */}
        <div className="p-4 space-y-2">
          {sidebarOpen && (
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentUserAvatar || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {currentUserName
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {/* Pulsing indicator */}
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-card"></span>
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {currentUserName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentUserEmail}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="outline"
            className={`w-full gap-2 ${!sidebarOpen && 'justify-center'}`}
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-card border-b border-border p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {activeTab === 'home' && `Welcome back, ${currentUserName}!`}
                {activeTab === 'bookings' && 'My Bookings'}
                {activeTab === 'destinations' && 'Browse Destinations'}
                {activeTab === 'profile' && 'My Profile'}
                {activeTab === 'settings' && 'Settings'}
              </h2>
              <p className="text-muted-foreground mt-1">
                {activeTab === 'home' && 'Plan your next adventure'}
                {activeTab === 'bookings' && 'View and manage your trips'}
                {activeTab === 'destinations' &&
                  'Discover amazing places to visit'}
                {activeTab === 'profile' && 'Manage your personal information'}
                {activeTab === 'settings' && 'Customize your preferences'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Badge variant="secondary" className="px-3 py-1">
                Traveler
              </Badge>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'home' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Bookings
                    </CardTitle>
                    <Ticket className="h-5 w-5 opacity-80" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {myBookings.length}
                    </div>
                    <p className="text-xs opacity-80 mt-2">All time</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Upcoming Trips
                    </CardTitle>
                    <Plane className="h-5 w-5 opacity-80" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {userStats.upcomingTrips}
                    </div>
                    <p className="text-xs opacity-80 mt-2">Next 30 days</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Spent
                    </CardTitle>
                    <DollarSign className="h-5 w-5 opacity-80" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      ${userStats.totalSpent}
                    </div>
                    <p className="text-xs opacity-80 mt-2">All bookings</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Saved Places
                    </CardTitle>
                    <MapPin className="h-5 w-5 opacity-80" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {userStats.savedDestinations}
                    </div>
                    <p className="text-xs opacity-80 mt-2">Favorites</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Get started with your travel plans
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    className="h-24 flex flex-col gap-2"
                    onClick={() => setActiveTab('destinations')}
                  >
                    <Plus className="h-6 w-6" />
                    <span>Book New Trip</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2"
                    onClick={() => setActiveTab('bookings')}
                  >
                    <Ticket className="h-6 w-6" />
                    <span>View My Bookings</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2"
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="h-6 w-6" />
                    <span>Edit Profile</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Popular Destinations */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Popular Destinations</CardTitle>
                    <CardDescription>
                      Trending travel spots this month
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab('destinations')}
                  >
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {popularDestinations.map(dest => (
                      <Card
                        key={dest.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <div className="relative h-40">
                          <img
                            src={dest.image}
                            alt={dest.name}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-2 right-2">
                            {dest.category}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg">{dest.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {dest.location}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">
                                {dest.rating}
                              </span>
                            </div>
                            <span className="text-lg font-bold">
                              ${dest.price}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {/* My Bookings Table */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>
                      All your trip bookings in one place
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      onClick={() => setActiveTab('destinations')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Booking
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-12 text-muted-foreground">
                      Loading your bookings...
                    </div>
                  ) : myBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Ticket className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No bookings yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Start your adventure by booking your first trip!
                      </p>
                      <Button onClick={() => setActiveTab('destinations')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Browse Destinations
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Booking ID
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Destination
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Date Booked
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Status
                              </th>
                              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {myBookings.map(booking => (
                              <tr
                                key={booking.id}
                                className="border-b transition-colors hover:bg-muted/50"
                              >
                                <td className="p-4 align-middle font-medium">
                                  #{booking.id.substring(0, 8)}
                                </td>
                                <td className="p-4 align-middle">
                                  {booking.hotelId || 'Destination Name'}
                                </td>
                                <td className="p-4 align-middle">
                                  {booking.createdAt
                                    ?.toDate?.()
                                    ?.toLocaleDateString() || 'N/A'}
                                </td>
                                <td className="p-4 align-middle">
                                  <Badge variant="secondary" className="gap-1">
                                    <Clock className="h-3 w-3" />
                                    Pending
                                  </Badge>
                                </td>
                                <td className="p-4 align-middle text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="gap-2">
                                        <Eye className="h-4 w-4" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        className="gap-2 text-destructive focus:text-destructive"
                                        onClick={() =>
                                          handleCancelBooking(booking.id)
                                        }
                                      >
                                        <XCircle className="h-4 w-4" />
                                        Cancel Booking
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'destinations' && (
            <Card>
              <CardHeader>
                <CardTitle>Browse Destinations</CardTitle>
                <CardDescription>
                  Discover and book amazing travel destinations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search destinations..."
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularDestinations.map(dest => (
                      <Card
                        key={dest.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48">
                          <img
                            src={dest.image}
                            alt={dest.name}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-3 right-3">
                            {dest.category}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-xl mb-2">
                            {dest.name}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                            <MapPin className="h-4 w-4" />
                            {dest.location}
                          </p>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{dest.rating}</span>
                              <span className="text-xs text-muted-foreground">
                                (234 reviews)
                              </span>
                            </div>
                            <span className="text-2xl font-bold">
                              ${dest.price}
                            </span>
                          </div>
                          <Button className="w-full">Book Now</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Profile editing interface coming soon...
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Customize your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Settings interface coming soon...
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Cancel Confirmation AlertDialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel booking{' '}
              <span className="font-semibold">
                #{selectedBooking?.substring(0, 8)}
              </span>
              ? This action may incur cancellation fees depending on the
              cancellation policy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
