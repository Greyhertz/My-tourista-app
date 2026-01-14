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

// Promote a user to admin - FIXED
router.patch('/promote/:uid', requireAuth, requireAdmin, async c => {
  try {
    const uid = c.req.param('uid');

    // Don't require role in body, just set it to admin
    await firestore.collection('users').doc(uid).update({ role: 'admin' });

    return c.json({ message: 'User promoted to admin successfully' });
  } catch (err) {
    console.error('Promote user error:', err);
    return c.json({ error: 'Failed to promote user' }, 500);
  }
});

// Demote a user to regular user - FIXED
router.patch('/demote/:uid', requireAuth, requireAdmin, async c => {
  try {
    const uid = c.req.param('uid');

    // Don't require role in body, just set it to user
    await firestore.collection('users').doc(uid).update({ role: 'user' });

    return c.json({ message: 'User demoted to user successfully' });
  } catch (err) {
    console.error('Demote user error:', err);
    return c.json({ error: 'Failed to demote user' }, 500);
  }
});

// Delete a user - Enhanced with better error handling
router.delete('/delete/:uid', requireAuth, requireAdmin, async c => {
  try {
    const uid = c.req.param('uid');
    const requestingUserId = c.get('userId');

    // Prevent admin from deleting themselves
    if (uid === requestingUserId) {
      return c.json({ error: 'Cannot delete your own account' }, 400);
    }

    // Delete from Firestore
    await firestore.collection('users').doc(uid).delete();

    // Optionally delete from Firebase Auth too
    try {
      await admin.auth().deleteUser(uid);
    } catch (authErr) {
      console.error('Failed to delete from Firebase Auth:', authErr);
      // Continue anyway since Firestore deletion succeeded
    }

    return c.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    return c.json({ error: 'Failed to delete user' }, 500);
  }
});

// router.delete('/delete/:uid', requireAuth, requireAdmin, async c => {
//   try {
//     const uid = c.req.param('uid');
//     await firestore.collection('users').doc(uid).delete();

//     return c.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     console.error('Delete user error:', err);
//     return c.json({ error: 'Failed to delete user' }, 500);
//   }
// });

export default router;
