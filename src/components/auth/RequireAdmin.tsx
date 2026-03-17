import { useAuth } from '@/context/AuthContext';
import { useAdmin } from '@/hooks/use-admin';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface RequireAdminProps {
  children: React.ReactNode;
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.isAnonymous) {
      navigate('/signin');
    } else if (isAdmin === false) {
      // Not admin - redirect to dashboard home
      navigate('/dashboard');
    }
  }, [user, isAdmin, navigate]);

  if (!user || user.isAnonymous || !isAdmin) {
    return <div className="p-6">Checking permissions...</div>;
  }

  return <>{children}</>;
}