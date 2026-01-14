// routes/user.ts - Single source of truth for user profile operations
import { Hono } from 'hono';
import admin from 'firebase-admin';
import { requireAuth } from '../middleware/auth';

type UserContext = {
  userId: string;
};

const router = new Hono<{ Variables: UserContext }>();
const firestore = admin.firestore();

// GET logged-in user's profile
router.get('/profile', requireAuth, async c => {
  try {
    const uid = c.get('userId');

    const userDoc = await firestore.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return c.json({ error: 'User not found' }, 404);
    }

    const data = userDoc.data();
    return c.json({
      uid,
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      role: data?.role,
      createdAt: data?.createdAt,
    });
  } catch (err) {
    console.error('Profile fetch error:', err);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// UPDATE logged-in user's profile
router.put('/profile', requireAuth, async c => {
  try {
    const uid = c.get('userId');
    const updates = await c.req.json();

    // Prevent role or uid changes (security)
    delete updates.role;
    delete updates.uid;
    delete updates.createdAt;

    // Validate that at least one field is being updated
    if (Object.keys(updates).length === 0) {
      return c.json({ error: 'No fields to update' }, 400);
    }

    // Update Firestore
    await firestore.collection('users').doc(uid).update(updates);

    // Fetch updated user data
    const updatedUserDoc = await firestore.collection('users').doc(uid).get();
    const data = updatedUserDoc.data();

    return c.json({
      message: 'Profile updated successfully',
      user: {
        uid,
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        role: data?.role,
        createdAt: data?.createdAt,
      },
    });
  } catch (err) {
    console.error('Profile update error:', err);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

export default router;
