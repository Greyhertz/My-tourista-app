import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export function ProfilePage() {
  const { user, sendVerificationEmail } = useAuth();
  const navigate = useNavigate();

<<<<<<< Updated upstream
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/auth/profile'),
=======
  const { data: profile, isLoading, } = useQuery<ProfileData>({
    queryKey: ['profile'], 
    queryFn: async (): Promise<ProfileData> => {
      const res = await api.get<ProfileData>('/auth/profile');
      return res.data;
    },
>>>>>>> Stashed changes
    enabled: !!user && !user.isAnonymous,
  });

  if (!user || user.isAnonymous) {
    navigate('/signin');
    return null;
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{profile?.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <div className="flex items-center gap-2">
              <Badge variant={profile?.role === 'verified_user' ? 'default' : 'secondary'}>
                {profile?.role}
              </Badge>
              {!profile?.emailVerified && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={sendVerificationEmail}
                >
                  Verify Email
                </Button>
              )}
            </div>
          </div>

          {profile?.account && (
            <>
              <div>
                <p className="text-sm text-muted-foreground">Loyalty Points</p>
                <p className="font-medium">{profile.account.loyaltyPoints}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="font-medium">{profile.account.totalBookings}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
