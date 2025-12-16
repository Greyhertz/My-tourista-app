// middleware/auth.ts
import { Context, Next } from 'hono';
import admin from 'firebase-admin';

export async function requireAuth(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const idToken = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Store UID for other middlewares or routes
    c.set('userId', decodedToken.uid);

    await next();
  } catch (err) {
    console.error('Firebase Auth error:', err);
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
}

export async function requireAdmin(c: Context, next: Next) {
  const uid = c.get('userId'); // read UID from requireAuth middleware

  if (!uid) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    const userData = userDoc.data();

    if (!userData || userData.role !== 'admin') {
      return c.json({ error: 'Forbidden: Admins only' }, 403);
    }

    await next();
  } catch (err) {
    console.error('Admin check error:', err);
    return c.json({ error: 'Failed to verify admin' }, 500);
  }
}
