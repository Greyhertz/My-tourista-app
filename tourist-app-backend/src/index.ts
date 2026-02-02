import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { authMiddleware, optionalAuth, AuthUser } from './middleware/auth';
import { requireRole } from './middleware/requireRole';
import 'dotenv/config';
import { rateLimiter } from './middleware/rateLimiter';
import routes from './routes';
// Extend Hono types for user context
type Variables = {
  user: AuthUser | null;
};

const app = new Hono<{ Variables: Variables }>();

// Global middleware
app.use('*', logger());
app.use('*', cors({ 
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true,
}));


// Rate limiting (100 requests per minute)
app.use('*', rateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
}));

// Health check
app.get('/health', (c) => {
  return c.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Public route (optional auth)
app.get('/api/public', optionalAuth, (c) => {
  const user = c.get('user');
  return c.json({
    message: 'Public endpoint',
    authenticated: !!user,
    user: user ? { uid: user.uid, role: user.role } : null,
  });
});

// Mount routes 
app.route('/api', routes);

// Protected route (requires auth)
app.get('/api/profile', authMiddleware, (c) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  return c.json({
    uid: user.uid,
    email: user.email,
    role: user.role,
    emailVerified: user.emailVerified,
    profile: user.profile,
  });
});

// Verified users only
app.post('/api/reviews', authMiddleware, requireRole('verified_user'), (c) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  return c.json({ 
    message: 'Review created (verified users only)',
    user: { uid: user.uid, role: user.role },
  });
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  }, 500);
});

// Start server
const port = Number(process.env.PORT) || 3000;

console.log(`🚀 Server starting on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});