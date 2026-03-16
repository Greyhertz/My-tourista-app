import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { optionalAuth, AuthUser } from './middleware/auth';
import routes from './routes';

type Variables = { user: AuthUser | null };
const app = new Hono<{ Variables: Variables }>();

// CRITICAL: CORS MUST BE FIRST
app.use('*', cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Then other middleware
app.use('*', logger());

// Health check
app.get('/health', (c) => {
  return c.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Public test route
app.get('/api/public', optionalAuth, (c) => {
  const user = c.get('user');
  return c.json({
    message: 'Public endpoint',
    authenticated: !!user,
  });
});

// Mount all routes
app.route('/api', routes);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// Start server
const port = Number(process.env.PORT) || 3000;
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`🚀 Backend server running on http://localhost:${info.port}`);
});
