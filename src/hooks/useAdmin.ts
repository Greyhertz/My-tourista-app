import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export function useAdmin() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-check'],
    queryFn: async () => {
      try {
        await api.get('/admin/users');
        
        try {
          await api.get('/admin/audit-logs');
          return { isAdmin: true, isSuperAdmin: true, role: 'super' };
        } catch {
          return { isAdmin: true, isSuperAdmin: false, role: 'support' };
        }
      } catch {
        return { isAdmin: false, isSuperAdmin: false, role: null };
      }
    },
    enabled: !!user && !user.isAnonymous,
    retry: false,
  });

  return {
    isAdmin: data?.isAdmin || false,
    isSuperAdmin: data?.isSuperAdmin || false,
    adminRole: data?.role,
    isLoading, // 👈 Add this
  };
}