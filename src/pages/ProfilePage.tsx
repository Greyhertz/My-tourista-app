import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface ProfileData {
  data: ProfileData | PromiseLike<ProfileData>;
  role: string;
  account?: {
    loyaltyPoints: number;
    totalBookings: number;
  } | any;
}

export function ProfilePage() {
  const { user, sendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  const { data: profile, isLoading, } = useQuery<ProfileData>({
    queryKey: ['profile'],
    queryFn: async (): Promise<ProfileData> => {
      const res = await api.get<ProfileData>('/auth/profile');
      return res.data;
    },
    enabled: !!user && !user.isAnonymous,
    retry: false,
    onError: () => {
      navigate('/signin', { replace: true });
    },
  });

  if (!user || user.isAnonymous) return null;

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!profile){
    return null;
    <div  className="container mx-auto px-4 py-8">NO Profile Yet...</div>

  } 
  const { role, account } = profile as unknown as ProfileData;

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
            <p className="font-medium">{user.email}</p>
          </div>

          {user.displayName && (
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user.displayName}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <div className="flex items-center gap-2">
              <Badge variant={role === 'verified_user' ? 'default' : 'secondary'}>
                {role}
              </Badge>

              {!user.emailVerified && (
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

          {account ? (
            <>
              <div>
                <p className="text-sm text-muted-foreground">Loyalty Points</p>
                <p className="font-medium">{account.loyaltyPoints}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="font-medium">{account.totalBookings}</p>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
