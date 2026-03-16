import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Award, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';

interface ProfileProps {
  role: string;
  profile?: {
    createdAt: string;
  };
  account?: {
    totalBookings: number;
    loyaltyPoints: number;
    lastLoginAt?: string;
  };
}

export function ProfilePage() {
  const { user, sendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const [sendingEmail, setSendingEmail] = useState(false);

  // FIX: Move the redirect into useEffect — calling navigate() during render causes loops
  useEffect(() => {
    if (!user || user.isAnonymous) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const { data: profile, isLoading } = useQuery<ProfileProps>({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get('/auth/profile');
      return res;
    },
    enabled: !!user && !user.isAnonymous,
  });

  const handleSendVerification = async () => {
    setSendingEmail(true);
    try {
      await sendVerificationEmail();
    } catch (error) {
      console.error(error);
    } finally {
      setSendingEmail(false);
    }
  };

  if (!user || user.isAnonymous) return null;
  if (isLoading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (!profile) return null;

  // FIX: Safe fallback for createdAt — profile.profile could be null/undefined,
  // which caused "Cannot read properties of undefined (reading 'createdAt')" crash
  const createdAt = profile?.profile?.createdAt;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl font-sans">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <div className="grid gap-6">
        {/* Account Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription>Your personal details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              {user.emailVerified ? (
                <Badge variant="default" className="bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSendVerification}
                  disabled={sendingEmail}
                >
                  {sendingEmail ? 'Sending...' : 'Verify Email'}
                </Button>
              )}
            </div>

            {/* Display Name */}
            {user.displayName && (
              <div className="flex items-center gap-3 py-3 border-b">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Display Name</p>
                  <p className="font-medium">{user.displayName}</p>
                </div>
              </div>
            )}

            {/* Role */}
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium capitalize">{profile.role?.replace('_', ' ')}</p>
                </div>
              </div>
              <Badge variant={profile.role === 'verified_user' ? 'default' : 'secondary'}>
                {profile.role}
              </Badge>
            </div>

            {/* Member Since */}
            {/* FIX: Conditionally render only if createdAt exists — avoids crash */}
            {createdAt && (
              <div className="flex items-center gap-3 py-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">
                    {format(new Date(createdAt), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Stats */}
        {profile.account && (
          <Card>
            <CardHeader>
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>Your booking history and rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">
                    {profile.account.totalBookings}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Total Bookings</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">
                    {profile.account.loyaltyPoints}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Loyalty Points</p>
                </div>
              </div>

              {profile.account.lastLoginAt && (
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Last login:{' '}
                    <span className="font-medium text-foreground">
                      {format(new Date(profile.account.lastLoginAt), 'MMM dd, yyyy h:mm a')}
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Email Verification Warning */}
        {!user.emailVerified && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-1">
                    Verify your email address
                  </h4>
                  <p className="text-sm text-yellow-800 mb-3">
                    Please verify your email to unlock all features including writing reviews
                    and accessing premium content.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSendVerification}
                    disabled={sendingEmail}
                    className="bg-white"
                  >
                    {sendingEmail ? 'Sending...' : 'Resend Verification Email'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate('/dashboard/bookings')}
            >
              View My Bookings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate('/dashboard/reviews')}
            >
              View My Reviews
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}