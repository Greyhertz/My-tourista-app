import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        // User is logged in
        setIsAuthenticated(true);

        // Get fresh ID token
        const idToken = await user.getIdToken(true); // Force refresh
        localStorage.setItem('authToken', idToken);
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userEmail', user.email || '');

        // Fetch user role from backend
        try {
          const res = await fetch('http://localhost:3000/user/profile', {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (res.ok) {
            const userData = await res.json();
            setUserRole(userData.role);
            localStorage.setItem('userRole', userData.role);
            localStorage.setItem('userName', userData.name);
          } else {
            // Profile fetch failed, assume user role
            setUserRole('user');
            localStorage.setItem('userRole', 'user');
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
          setUserRole('user');
          localStorage.setItem('userRole', 'user');
        }
      } else {
        // User is not logged in
        setIsAuthenticated(false);
        setUserRole(null);
        // Clear localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && userRole !== requiredRole) {
    // User doesn't have required role
    if (userRole === 'admin' && requiredRole === 'user') {
      // Admin trying to access user route - redirect to admin dashboard
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'user' && requiredRole === 'admin') {
      // User trying to access admin route - redirect to user dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  // All checks passed - render children
  return <>{children}</>;
}
