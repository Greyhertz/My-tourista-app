import { useState, useEffect } from 'react';
import {
  Users,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
  Menu,
  X,
  LayoutDashboard,
  Map,
  Ticket,
  MessageSquare,
  Settings,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
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
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from 'recharts';

// Mock Data
const statsData = {
  totalBookings: 1234,
  totalRevenue: 145600,
  activeUsers: 892,
  destinations: 47,
};

const bookingTrends = [
  { month: 'Jan', bookings: 65, revenue: 12400 },
  { month: 'Feb', bookings: 78, revenue: 15200 },
  { month: 'Mar', bookings: 92, revenue: 18900 },
  { month: 'Apr', bookings: 110, revenue: 22300 },
  { month: 'May', bookings: 125, revenue: 26800 },
  { month: 'Jun', bookings: 145, revenue: 31200 },
];

const popularDestinations = [
  { name: 'Bali Beach', bookings: 245, rating: 4.8 },
  { name: 'Tokyo Tour', bookings: 198, rating: 4.9 },
  { name: 'Paris City', bookings: 176, rating: 4.7 },
  { name: 'Dubai Desert', bookings: 134, rating: 4.6 },
  { name: 'NYC Lights', bookings: 112, rating: 4.8 },
];

const recentBookings = [
  {
    id: 'B1234',
    user: 'John Doe',
    email: 'john@email.com',
    destination: 'Bali Beach Resort',
    date: '2024-01-15',
    amount: 1200,
    status: 'confirmed',
    avatar: 'JD',
  },
  {
    id: 'B1235',
    user: 'Sarah Smith',
    email: 'sarah@email.com',
    destination: 'Tokyo Adventure',
    date: '2024-01-16',
    amount: 1850,
    status: 'pending',
    avatar: 'SS',
  },
  {
    id: 'B1236',
    user: 'Mike Johnson',
    email: 'mike@email.com',
    destination: 'Paris Romance',
    date: '2024-01-16',
    amount: 2100,
    status: 'confirmed',
    avatar: 'MJ',
  },
  {
    id: 'B1237',
    user: 'Emma Wilson',
    email: 'emma@email.com',
    destination: 'Dubai Luxury',
    date: '2024-01-17',
    amount: 3200,
    status: 'confirmed',
    avatar: 'EW',
  },
  {
    id: 'B1238',
    user: 'Chris Brown',
    email: 'chris@email.com',
    destination: 'NYC Explore',
    date: '2024-01-17',
    amount: 980,
    status: 'cancelled',
    avatar: 'CB',
  },
];

const categoryData = [
  { name: 'Beach', value: 35, color: '#3b82f6' },
  { name: 'City', value: 28, color: '#8b5cf6' },
  { name: 'Adventure', value: 22, color: '#ec4899' },
  { name: 'Cultural', value: 15, color: '#f59e0b' },
];

// Chart configurations for shadcn charts
const bookingChartConfig = {
  bookings: {
    label: 'Bookings',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const revenueChartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const destinationChartConfig = {
  bookings: {
    label: 'Bookings',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [addDestinationOpen, setAddDestinationOpen] = useState(false);

  // Get current user info from localStorage (set during login)
  const currentUserId = localStorage.getItem('userId') || 'current-user-id';
  const currentUserName = localStorage.getItem('userName') || 'Admin User';
  const currentUserEmail =
    localStorage.getItem('userEmail') || 'admin@travel.com';
  const currentUserAvatar = localStorage.getItem('userAvatar') || null;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', value: 'overview' },
    { icon: Map, label: 'Destinations', value: 'destinations' },
    { icon: Ticket, label: 'Bookings', value: 'bookings' },
    { icon: Users, label: 'Users', value: 'users' },
    { icon: MessageSquare, label: 'Reviews', value: 'reviews' },
    { icon: Settings, label: 'Settings', value: 'settings' },
  ];

  const handleDeleteBooking = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting booking:', selectedBooking);
    setDeleteDialogOpen(false);
    setSelectedBooking(null);
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
                {menuItems.find(item => item.value === activeTab)?.label}
              </h2>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here's what's happening with your travel business.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Badge variant="secondary" className="px-3 py-1">
                Admin
              </Badge>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Bookings
                    </CardTitle>
                    <Calendar className="h-5 w-5 opacity-80" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {statsData.totalBookings}
                    </div>
                    <p className="text-xs opacity-80 mt-2 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-5 w-5 opacity-80" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      ${statsData.totalRevenue.toLocaleString()}
                    </div>
                    <p className="text-xs opacity-80 mt-2 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +18% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Users
                    </CardTitle>
                    <Users className="h-5 w-5 opacity-80" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {statsData.activeUsers}
                    </div>
                    <p className="text-xs opacity-80 mt-2 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Destinations
                    </CardTitle>
                    <MapPin className="h-5 w-5 opacity-80" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {statsData.destinations}
                    </div>
                    <p className="text-xs opacity-80 mt-2 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +3 new this month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Booking Trends Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Trends</CardTitle>
                    <CardDescription>
                      Monthly bookings over the last 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={bookingChartConfig}
                      className="h-[300px]"
                    >
                      <AreaChart data={bookingTrends}>
                        <defs>
                          <linearGradient
                            id="fillBookings"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="var(--color-bookings)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-bookings)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="bookings"
                          stroke="var(--color-bookings)"
                          fill="url(#fillBookings)"
                          fillOpacity={0.4}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="font-medium">+12%</span>
                    </div>
                    <span className="text-muted-foreground">
                      from last period
                    </span>
                  </CardFooter>
                </Card>

                {/* Revenue Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Monthly revenue in USD</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={revenueChartConfig}
                      className="h-[300px]"
                    >
                      <LineChart data={bookingTrends}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={value => `${value / 1000}k`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="var(--color-revenue)"
                          strokeWidth={2}
                          dot={{
                            fill: 'var(--color-revenue)',
                            r: 4,
                          }}
                          activeDot={{
                            r: 6,
                          }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="font-medium">+24%</span>
                    </div>
                    <span className="text-muted-foreground">YoY growth</span>
                  </CardFooter>
                </Card>
              </div>

              {/* Popular Destinations & Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Popular Destinations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Destinations</CardTitle>
                    <CardDescription>
                      Top 5 most booked locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={destinationChartConfig}
                      className="h-[300px]"
                    >
                      <BarChart data={popularDestinations} layout="vertical">
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={false}
                        />
                        <XAxis
                          type="number"
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          width={100}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                          dataKey="bookings"
                          fill="var(--color-bookings)"
                          radius={[0, 8, 8, 0]}
                        />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Activity className="h-4 w-4" />
                      <span>Showing top performing destinations</span>
                    </div>
                  </CardFooter>
                </Card>

                {/* Category Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tour Categories</CardTitle>
                    <CardDescription>Distribution by tour type</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center pb-0">
                    <ChartContainer
                      config={{
                        value: {
                          label: 'Bookings',
                        },
                      }}
                      className="h-[300px]"
                    >
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={100}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-wrap gap-3 text-sm">
                      {categoryData.map(cat => (
                        <div key={cat.name} className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="text-muted-foreground">
                            {cat.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </div>

              {/* Recent Bookings Table */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                      Latest booking transactions
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
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                              Booking ID
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                              User
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                              Destination
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                              Date
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                              Amount
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
                          {recentBookings.map(booking => (
                            <tr
                              key={booking.id}
                              className="border-b transition-colors hover:bg-muted/50"
                            >
                              <td className="p-4 align-middle font-medium">
                                #{booking.id}
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.user}`}
                                      />
                                      <AvatarFallback className="text-xs bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                                        {booking.avatar}
                                      </AvatarFallback>
                                    </Avatar>
                                    {/* Show pulsing dot if this is the current user */}
                                    {booking.email === currentUserEmail && (
                                      <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-card"></span>
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">
                                      {booking.user}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {booking.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                {booking.destination}
                              </td>
                              <td className="p-4 align-middle">
                                {booking.date}
                              </td>
                              <td className="p-4 align-middle font-semibold">
                                ${booking.amount}
                              </td>
                              <td className="p-4 align-middle">
                                <Badge
                                  variant={
                                    booking.status === 'confirmed'
                                      ? 'default'
                                      : booking.status === 'pending'
                                      ? 'secondary'
                                      : 'destructive'
                                  }
                                  className="gap-1"
                                >
                                  {getStatusIcon(booking.status)}
                                  {booking.status}
                                </Badge>
                              </td>
                              <td className="p-4 align-middle text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
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
                                    <DropdownMenuItem className="gap-2">
                                      <Edit className="h-4 w-4" />
                                      Edit Booking
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="gap-2 text-destructive focus:text-destructive"
                                      onClick={() =>
                                        handleDeleteBooking(booking.id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      Delete Booking
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
                  <div className="flex items-center justify-between px-2 py-4">
                    <p className="text-sm text-muted-foreground">
                      Showing 5 of 1,234 bookings
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'destinations' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Destination Management</CardTitle>
                  <CardDescription>
                    Manage your tourist destinations
                  </CardDescription>
                </div>
                <Dialog
                  open={addDestinationOpen}
                  onOpenChange={setAddDestinationOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Destination
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Destination</DialogTitle>
                      <DialogDescription>
                        Create a new tourist destination. Fill in the details
                        below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Destination Name</Label>
                        <Input
                          id="name"
                          placeholder="e.g., Bali Paradise Beach"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="e.g., Bali, Indonesia"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price (USD)</Label>
                          <Input id="price" type="number" placeholder="1299" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beach">Beach</SelectItem>
                              <SelectItem value="city">City</SelectItem>
                              <SelectItem value="adventure">
                                Adventure
                              </SelectItem>
                              <SelectItem value="cultural">Cultural</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setAddDestinationOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => setAddDestinationOpen(false)}>
                        Create Destination
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Destination management interface coming soon...
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'bookings' && (
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>View and manage all bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Booking management interface coming soon...
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'users' && (
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage users</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  User management interface coming soon...
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'reviews' && (
            <Card>
              <CardHeader>
                <CardTitle>Review Moderation</CardTitle>
                <CardDescription>
                  Manage user reviews and ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Review moderation interface coming soon...
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Configure your admin preferences
                </CardDescription>
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

      {/* Delete Confirmation AlertDialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              booking
              <span className="font-semibold"> #{selectedBooking}</span> from
              the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
