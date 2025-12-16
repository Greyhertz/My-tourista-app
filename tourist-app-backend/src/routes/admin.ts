// routes/admin.ts
import { Hono } from 'hono';
import admin from 'firebase-admin';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = new Hono();
const firestore = admin.firestore();

// GET all users (admin only)
router.get('/users', requireAuth, requireAdmin, async c => {
  try {
    const usersSnapshot = await firestore.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
    }));

    return c.json(users);
  } catch (err) {
    console.error('Fetching users error:', err);
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

// Promote a user to admin
router.put('/promote/:uid', requireAuth, requireAdmin, async c => {
  try {
    const uid = c.req.param('uid');
    await firestore.collection('users').doc(uid).update({ role: 'admin' });

    return c.json({ message: 'User promoted to admin' });
  } catch (err) {
    console.error('Promote user error:', err);
    return c.json({ error: 'Failed to promote user' }, 500);
  }
});

// Delete a user
router.delete('/delete/:uid', requireAuth, requireAdmin, async c => {
  try {
    const uid = c.req.param('uid');
    await firestore.collection('users').doc(uid).delete();

    return c.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    return c.json({ error: 'Failed to delete user' }, 500);
  }
});

router.put('/demote/:uid', requireAuth, requireAdmin, async c =>
{
  const uid = c.req.param('uid');
  try
  {
    await firestore.collection('users').doc(uid).update({ role: 'user' });
    return c.json({ message: 'User demoted to user' });

  } catch (err)
  {
    console.error('Demote user error:', err);
    return c.json({ error: 'Failed to demote user' }, 500);
  }
})

export default router;
