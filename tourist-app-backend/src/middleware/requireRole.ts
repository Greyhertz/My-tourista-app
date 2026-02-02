import { Context, Next } from 'hono';
import { AuthUser } from './auth';

const roleHierarchy = {
  guest: 0,
  user: 1,
  verified_user: 2,
};

export const requireRole = (minRole: keyof typeof roleHierarchy) => {
  return async (c: Context, next: Next) => {
    const user = c.get('user') as AuthUser | null;

    if (!user) {
      return c.json({ error: 'Unauthorized', message: 'Authentication required' }, 401);
    }

    const userRoleLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] ?? -1;
    const requiredRoleLevel = roleHierarchy[minRole];

    if (userRoleLevel < requiredRoleLevel) {
      return c.json({
        error: 'Forbidden',
        message: `${minRole} role required`,
        requiredRole: minRole,
        currentRole: user.role,
      }, 403);
    }

    await next();
  };
};