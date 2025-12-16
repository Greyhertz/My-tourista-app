// routes/user.ts
import { Hono } from 'hono';
import admin from 'firebase-admin';
import { requireAuth } from '../middleware/auth';

type UserContext = {
  userId: string;
};

const user = new Hono<{ Variables: UserContext }>();

// Get logged-in user's profile
user.get('/profile', requireAuth, async c => {
  const uid = c.get('userId'); // from Firebase Auth middleware

  try {
    const userDoc = await admin.firestore().collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return c.json({ error: 'User not found' }, 404);
    }

    const userData = userDoc.data();

    return c.json({
      email: userData?.email,
      name: userData?.name,
      role: userData?.role,
      phone: userData?.phone,
      createdAt: userData?.createdAt,
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

export default user;
