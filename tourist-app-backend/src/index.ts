// index.ts
import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import admin from 'firebase-admin';
import fs from 'fs';
import authRoutes from './routes/auth.ts';
import profileRoutes from './routes/profile.ts';
import bookingRoutes from './routes/bookings.ts';
import userRoutes from './routes/users.ts';
import adminRoutes from './routes/admin.ts';
import { logger } from './middleware/logger.ts';
import { requireAuth, requireAdmin } from './middleware/auth.ts';
import { cors } from 'hono/cors';

const app = new Hono();

const PORT = Number(process.env.PORT || 3000);

app.use(
  '/*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Frontend URLs
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

// In your Express/Node backend
app.use(cors({
  origin: 'http://localhost:5173', // Your React dev server
  credentials: true
}));

// CORS + preflight
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (c.req.method === 'OPTIONS') return c.text('ok', 200);
  await next();
});

// Logger
app.use('*', logger);

// Root
app.get('/', c => c.text('Tourist API (Hono + Firebase)'));

// Routes
app.route('/auth', authRoutes);
app.route('/profile', profileRoutes.use(requireAuth));
app.route('/bookings', bookingRoutes.use(requireAuth));
app.route('/users', userRoutes.use(requireAuth));
app.route('/admin', adminRoutes.use(requireAuth).use(requireAdmin));

// Start server
serve(app, info => {
  console.log(`Backend server running on http://localhost:${info.port}`);
});
