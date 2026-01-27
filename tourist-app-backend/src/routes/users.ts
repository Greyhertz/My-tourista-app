// routes/users.ts
import { Hono } from 'hono';
import admin from 'firebase-admin';
import { requireAuth } from '../middleware/auth';

type UserContext = {
  userId: string;
};

const users = new Hono<{ Variables: UserContext }>();
const firestore = admin.firestore();

// GET logged-in user's profile
users.get('/profile', requireAuth, async c => {
  try {
    const uid = c.get('userId');

    const userDoc = await firestore.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return c.json({ error: 'User not found' }, 404);
    }

    const userData = userDoc.data();
    return c.json({
      uid: uid,
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone,
      role: userData?.role,
      createdAt: userData?.createdAt,
    });
  } catch (err) {
    console.error('Fetching user profile error:', err);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// UPDATE logged-in user's profile
users.put('/profile', requireAuth, async c => {
  try {
    const uid = c.get('userId');
    const updates = await c.req.json();

    // Prevent role or sensitive fields from being updated by regular users
    delete updates.role;
    delete updates.createdAt;

    await firestore.collection('users').doc(uid).update(updates);

    const updatedUserDoc = await firestore.collection('users').doc(uid).get();
    const userData = updatedUserDoc.data();

    return c.json({
      uid: uid,
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone,
      role: userData?.role,
      createdAt: userData?.createdAt,
    });
  } catch (err) {
    console.error('Updating user profile error:', err);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

export default users;
