import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { MoreHorizontal, Shield, ShieldOff, UserX, RefreshCw, Crown } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';

interface User {
  uid: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export function AdminUsersPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    type: 'suspend' | 'unsuspend' | 'revoke' | 'role' | null;
    user: User | null;
  }>({ open: false, type: null, user: null });
  const [newRole, setNewRole] = useState<string>('');

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await api.get<{ users: User[] }>('/admin/users');
      return res.users;
    },
  });

  // Check if current user is super admin
  const { data: isSuperAdmin = false } = useQuery({
    queryKey: ['is-super-admin'],
    queryFn: async () => {
      try {
        // Try an endpoint that requires super admin
        await api.get('/admin/audit-logs');
        return true;
      } catch {
        return false;
      }
    },
  });

  const suspendMutation = useMutation({
    mutationFn: async (uid: string) => {
      return api.post(`/admin/users/${uid}/suspend`, { reason: 'Admin action' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'User suspended' });
      setActionDialog({ open: false, type: null, user: null });
    },
  });

  const unsuspendMutation = useMutation({
    mutationFn: async (uid: string) => {
      return api.post(`/admin/users/${uid}/unsuspend`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'User unsuspended' });
      setActionDialog({ open: false, type: null, user: null });
    },
  });

  const revokeTokensMutation = useMutation({
    mutationFn: async (uid: string) => {
      return api.post(`/admin/users/${uid}/revoke-tokens`);
    },
    onSuccess: () => {
      toast({ title: 'User logged out' });
      setActionDialog({ open: false, type: null, user: null });
    },
  });

  const changeRoleMutation = useMutation({
    mutationFn: async ({ uid, role }: { uid: string; role: string }) => {
      return api.patch(`/admin/users/${uid}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'User role updated' });
      setActionDialog({ open: false, type: null, user: null });
      setNewRole('');
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to update role',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleAction = () => {
    if (!actionDialog.user) return;
    const uid = actionDialog.user.uid;

    if (actionDialog.type === 'suspend') suspendMutation.mutate(uid);
    else if (actionDialog.type === 'unsuspend') unsuspendMutation.mutate(uid);
    else if (actionDialog.type === 'revoke') revokeTokensMutation.mutate(uid);
    else if (actionDialog.type === 'role' && newRole) {
      changeRoleMutation.mutate({ uid, role: newRole });
    }
  };

  if (isLoading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="max-w-7xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {users?.length || 0} total users
              </p>
            </div>
            {isSuperAdmin && (
              <Badge variant="default" className="gap-1">
                <Crown className="h-3 w-3" />
                Super Admin
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left font-medium">Email</th>
                  <th className="h-12 px-4 text-left font-medium">Role</th>
                  <th className="h-12 px-4 text-left font-medium">Status</th>
                  <th className="h-12 px-4 text-left font-medium">Created</th>
                  <th className="h-12 px-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user.uid} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{user.email}</td>
                    <td className="p-4">
                      <Badge 
                        variant={
                          user.role === 'verified_user' ? 'default' : 'secondary'
                        }
                      >
                        {user.role.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          user.status === 'active' ? 'default' : 'destructive'
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.status === 'active' ? (
                            <DropdownMenuItem
                              onClick={() =>
                                setActionDialog({
                                  open: true,
                                  type: 'suspend',
                                  user,
                                })
                              }
                            >
                              <ShieldOff className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                setActionDialog({
                                  open: true,
                                  type: 'unsuspend',
                                  user,
                                })
                              }
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Unsuspend User
                            </DropdownMenuItem>
                          )}

                          {isSuperAdmin && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setNewRole(user.role);
                                  setActionDialog({
                                    open: true,
                                    type: 'role',
                                    user,
                                  });
                                }}
                              >
                                <Crown className="mr-2 h-4 w-4" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  setActionDialog({
                                    open: true,
                                    type: 'revoke',
                                    user,
                                  })
                                }
                                className="text-red-600"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Force Logout
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Confirmation Dialog */}
      <AlertDialog
        open={actionDialog.open}
        onOpenChange={(open) =>
          setActionDialog({ open, type: null, user: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionDialog.type === 'suspend' && 'Suspend User?'}
              {actionDialog.type === 'unsuspend' && 'Unsuspend User?'}
              {actionDialog.type === 'revoke' && 'Force Logout?'}
              {actionDialog.type === 'role' && 'Change User Role?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionDialog.type === 'suspend' &&
                `Suspend ${actionDialog.user?.email}? They won't be able to access the platform.`}
              {actionDialog.type === 'unsuspend' &&
                `Restore access for ${actionDialog.user?.email}?`}
              {actionDialog.type === 'revoke' &&
                `Force logout ${actionDialog.user?.email}? They'll need to sign in again.`}
              {actionDialog.type === 'role' && (
                <div className="space-y-4 pt-4">
                  <p>Change role for {actionDialog.user?.email}</p>
                  <Select value={newRole} onValueChange={setNewRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guest">Guest</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="verified_user">Verified User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 