import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Calendar,
  DollarSign,
  Users,
  MapPin,
  TrendingUp,
  ArrowUpRight,
  Activity,
  MoreHorizontal,
  Eye,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
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
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import { format } from 'date-fns';

// Mock data - replace with real API data later
const statsData = {
  totalBookings: 0,
  totalRevenue: 0,
  activeUsers: 0,
  destinations: 5,
};

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

export function AdminOverviewPage() {
  // Fetch real stats from backend
  const { data: bookings } = useQuery({
    queryKey: ['admin-all-bookings'],
    queryFn: async () => {
      const res = await api.get<{ bookings: any[] }>('/admin/bookings');
      return res.bookings || [];
    },
  });

  const { data: users } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await api.get<{ users: any[] }>('/admin/users');
      return res.users || [];
    },
  });

  const { data: destinations } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const res = await api.get<{ destinations: any[] }>('/destinations');
      return res.destinations || [];
    },
  });

  // Calculate stats from real data
  const totalBookings = bookings?.length || 0;
  const totalRevenue = bookings?.reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0;
  const activeUsers = users?.filter(u => u.status === 'active').length || 0;
  const totalDestinations = destinations?.length || 0;

  // Recent bookings (last 5)
  const recentBookings = bookings?.slice(0, 5) || [];

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
    <div className="max-w-7xl space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalBookings}</div>
            <p className="text-xs opacity-80 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              All time bookings
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(totalRevenue / 100).toLocaleString()}
            </div>
            <p className="text-xs opacity-80 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Lifetime revenue
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeUsers}</div>
            <p className="text-xs opacity-80 mt-2">
              {users?.length || 0} total users
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Destinations</CardTitle>
            <MapPin className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalDestinations}</div>
            <p className="text-xs opacity-80 mt-2">Available destinations</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking transactions</CardDescription>
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
          {recentBookings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No bookings yet
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left font-medium">Booking ID</th>
                    <th className="h-12 px-4 text-left font-medium">Hotel</th>
                    <th className="h-12 px-4 text-left font-medium">Dates</th>
                    <th className="h-12 px-4 text-left font-medium">Amount</th>
                    <th className="h-12 px-4 text-left font-medium">Status</th>
                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">#{booking.id.slice(0, 8)}</td>
                      <td className="p-4">{booking.hotelName}</td>
                      <td className="p-4 text-sm">
                        {format(new Date(booking.checkIn), 'MMM dd')} -{' '}
                        {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                      </td>
                      <td className="p-4 font-semibold">
                        ${(booking.totalPrice / 100).toFixed(2)}
                      </td>
                      <td className="p-4">
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
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}