import { Context, Next } from 'hono';
import { auth } from '../firebase';
import { db } from '../db/index';
import { profiles, accounts } from '../db/schema';
import { eq } from 'drizzle-orm';

export interface AuthUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  role: 'guest' | 'user' | 'verified_user' | 'suspended';
  profile: typeof profiles.$inferSelect | null;
  account: typeof accounts.$inferSelect | null;
}

// Auth middleware for protected routes
export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');

  // Check for token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized', message: 'No token provided' }, 401);
  }

  const token = authHeader.substring(7); // Remove 'Bearer '

  try {
    // Verify token with Firebase
    const decodedToken = await auth.verifyIdToken(token);
    
    // Fetch user from database
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.uid, decodedToken.uid))
      .limit(1);

    // If user doesn't exist, create profile for anonymous user
    if (!profile) {
      const [newProfile] = await db
        .insert(profiles)
        .values({
          uid: decodedToken.uid,
          email: decodedToken.email || null,
          role: 'guest',
          status: 'active',
        })
        .returning();

      c.set('user', {
        uid: decodedToken.uid,
        email: decodedToken.email || null,
        emailVerified: decodedToken.email_verified || false,
        role: 'guest',
        profile: newProfile,
        account: null,
      } as AuthUser);

      return next();
    }

    // Check if suspended
    if (profile.status === 'suspended') {
      return c.json({ error: 'Forbidden', message: 'Account suspended' }, 403);
    }

    // Fetch account data if not guest
    let account = null;
    if (profile.role !== 'guest') {
      [account] = await db
        .select()
        .from(accounts)
        .where(eq(accounts.uid, decodedToken.uid))
        .limit(1);
    }

    // Sync email verification status
    let currentRole = profile.role;
    if (decodedToken.email_verified && profile.role === 'user') {
      // Auto-promote to verified_user
      currentRole = 'verified_user';
      await db
        .update(profiles)
        .set({ role: 'verified_user', updatedAt: new Date() })
        .where(eq(profiles.uid, decodedToken.uid));
    }

    // Attach user to context
    c.set('user', {
      uid: decodedToken.uid,
      email: decodedToken.email || null,
      emailVerified: decodedToken.email_verified || false,
      role: currentRole,
      profile,
      account,
    } as AuthUser);

    await next();
  } catch (error) {
    console.error('Auth error:', error);
    return c.json({ error: 'Unauthorized', message: 'Invalid token' }, 401);
  }
};

// Optional auth (for public routes that can use user data if available)
export const optionalAuth = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    c.set('user', null);
    return next();
  }

  // If token exists, verify it (same logic as authMiddleware)
  // But don't return 401 if it fails, just set user to null
  const token = authHeader.substring(7);

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.uid, decodedToken.uid))
      .limit(1);

    if (profile && profile.status !== 'suspended') {
      const [account] = profile.role !== 'guest'
        ? await db.select().from(accounts).where(eq(accounts.uid, decodedToken.uid)).limit(1)
        : [null];

      c.set('user', {
        uid: decodedToken.uid,
        email: decodedToken.email || null,
        emailVerified: decodedToken.email_verified || false,
        role: profile.role,
        profile,
        account,
      } as AuthUser);
    } else {
      c.set('user', null);
    }
  } catch (error) {
    c.set('user', null);
  }

  await next();
};