// routes/profile.ts
import { Hono } from 'hono';
import admin from 'firebase-admin';
import { requireAuth } from '../middleware/auth';


type UserContext = {
  userId: any;
};
const router = new Hono<{ Variables: UserContext }>();
// Firestore reference
const firestore = admin.firestore();

// GET logged-in user's profile
router.get('/', requireAuth, async c => {
  try {
    const uid = c.get('userId'); // set by requireAuth middleware

    const userDoc = await firestore.collection('users').doc(uid).get();
    if (!userDoc.exists) return c.json({ error: 'User not found' }, 404);

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
router.put('/', requireAuth, async c => {
  try {
    const uid = c.get('userId');
    const updates = await c.req.json();

    // Prevent role or uid changes
    delete updates.role;
    delete updates.uid;

    await firestore.collection('users').doc(uid).update(updates);

    const updatedUserDoc = await firestore.collection('users').doc(uid).get();
    const data = updatedUserDoc.data();

    return c.json({
      uid,
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      role: data?.role,
      createdAt: data?.createdAt,
    });
  } catch (err) {
    console.error('Profile update error:', err);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

export default router;
