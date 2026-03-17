// routes/admin.ts
import { Hono } from 'hono';
import { authMiddleware, AuthUser } from '../middleware/auth';
import { db } from '../db/index';
import { profiles, accounts, adminPermissions, auditLogs, bookings } from '../db/schema';
import { eq } from 'drizzle-orm';
import { auth as firebaseAuth } from '../firebase';
import { nanoid } from 'nanoid';
// import { fetchTouristCities, getAttractions, getHotels, getCityImage } from '../services/geoapify';
import { destinations, hotels } from '../db/schema';
// import { fetchTouristCities, getAttractions, getCityImage, getHotels } from '../services/geoapify';


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

    // Log action
    await db.insert(auditLogs).values({
      id: nanoid(),
      actorUid: user.uid,
      actorRole: user.role,
      action: 'suspend_user',
      targetUid: uid,
      metadata: JSON.stringify({ reason }),
      timestamp: new Date(),
    });

    return c.json({ message: 'User suspended' });
  } catch (error) {
    console.error('Suspend user error:', error);
    return c.json({ error: 'Failed to suspend user' }, 500);
  }
});

// Unsuspend user
adminRouter.post('/users/:uid/unsuspend', authMiddleware, requireAdmin, async (c) => {
  const uid = c.req.param('uid');
  const user = c.get('user') as AuthUser;

  try {
    await db
      .update(profiles)
      .set({ 
        status: 'active',
        updatedAt: new Date(),
      })
      .where(eq(profiles.uid, uid));

    // Log action
    await db.insert(auditLogs).values({
      id: nanoid(),
      actorUid: user.uid,
      actorRole: user.role,
      action: 'unsuspend_user',
      targetUid: uid,
      timestamp: new Date(),
    });

    return c.json({ message: 'User unsuspended' });
  } catch (error) {
    console.error('Unsuspend user error:', error);
    return c.json({ error: 'Failed to unsuspend user' }, 500);
  }
});

// Update user role (super admin only)
adminRouter.patch('/users/:uid/role', authMiddleware, requireAdmin, requireSuperAdmin, async (c) => {
  const uid = c.req.param('uid');
  const user = c.get('user') as AuthUser;
  const body = await c.req.json();
  const { role } = body;

  // Prevent self-modification
  if (uid === user.uid) {
    return c.json({ error: 'Cannot modify own role' }, 403);
  }

  // Validate role
  if (!['guest', 'user', 'verified_user'].includes(role)) {
    return c.json({ error: 'Invalid role' }, 400);
  }

  try {
    await db
      .update(profiles)
      .set({ 
        role,
        updatedAt: new Date(),
      })
      .where(eq(profiles.uid, uid));

    // Log action
    await db.insert(auditLogs).values({
      id: nanoid(),
      actorUid: user.uid,
      actorRole: user.role,
      action: 'change_user_role',
      targetUid: uid,
      metadata: JSON.stringify({ newRole: role }),
      timestamp: new Date(),
    });

    return c.json({ message: 'User role updated', newRole: role });
  } catch (error) {
    console.error('Update role error:', error);
    return c.json({ error: 'Failed to update role' }, 500);
  }
});

// Revoke user tokens (force logout)
adminRouter.post('/users/:uid/revoke-tokens', authMiddleware, requireAdmin, requireSuperAdmin, async (c) => {
  const uid = c.req.param('uid');
  const user = c.get('user') as AuthUser;

  try {
    // Revoke Firebase tokens
 await firebaseAuth.revokeRefreshTokens(uid);

    // Log action
    await db.insert(auditLogs).values({
      id: nanoid(),
      actorUid: user.uid,
      actorRole: user.role,
      action: 'revoke_tokens',
      targetUid: uid,
      timestamp: new Date(),
    });

    return c.json({ message: 'User tokens revoked' });
  } catch (error) {
    console.error('Revoke tokens error:', error);
    return c.json({ error: 'Failed to revoke tokens' }, 500);
  }
});

// Get audit logs
adminRouter.get('/audit-logs', authMiddleware, requireAdmin, async (c) => {
  try {
    const logs = await db
      .select()
      .from(auditLogs)
      .orderBy(auditLogs.timestamp)
      .limit(100);

    return c.json({ logs });
  } catch (error) {
    console.error('Get audit logs error:', error);
    return c.json({ error: 'Failed to get audit logs' }, 500);
  }
});

// Add to existing admin router
adminRouter.get('/bookings', authMiddleware, requireAdmin, async (c) => {
  try {
    const allBookings = await db
      .select()
      .from(bookings)
      .orderBy(bookings.createdAt)
      .limit(100);

    return c.json({ bookings: allBookings });
  } catch (error) {
    console.error('List bookings error:', error);
    return c.json({ error: 'Failed to list bookings' }, 500);
  }
});



// Sync real destinations from Geoapify (admin only)
adminRouter.post('/destinations/sync', authMiddleware, requireAdmin, async (c) => {
  try {
    const cities = await fetchTouristCities();
    const synced = [];

    for (const city of cities) {
      // Check if exists
      const [existing] = await db
        .select()
        .from(destinations)
        .where(eq(destinations.name, city.name))
        .limit(1);

      if (existing) {
        console.log(`Skipping ${city.name} - already exists`);
        continue;
      }

      // Get attractions (highlights)
      const attractions = await getAttractions(city.name, city.lat, city.lon);

      // Get image from Unsplash
      const imageUrl = await getCityImage(city.name, city.country);

      // Create destination
      const [destination] = await db
        .insert(destinations)
        .values({
          id: nanoid(),
          name: city.name,
          country: city.country,
          description: `Discover the beauty and culture of ${city.name}, ${city.country}`,
          imageUrl,
          highlights: JSON.stringify(attractions.length > 0 ? attractions : ['Historic Sites', 'Local Cuisine', 'Cultural Tours']),
          rating: 4.5 + Math.random() * 0.5, // 4.5-5.0
          reviewCount: Math.floor(Math.random() * 500) + 100,
          priceLevel: Math.floor(Math.random() * 3) + 1, // 1-3
          createdAt: new Date(),
        })
        .returning();

      // Get hotels for this destination
      const cityHotels = await getHotels(city.name, city.lat, city.lon);

      // Add 3-5 hotels
      for (const hotel of cityHotels.slice(0, 5)) {
        await db.insert(hotels).values({
          id: nanoid(),
          destinationId: destination.id,
          name: hotel.name,
          description: `Experience comfort and luxury in ${hotel.city}`,
          pricePerNight: Math.floor(Math.random() * 20000) + 5000, // $50-$250
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          images: JSON.stringify([]),
          amenities: JSON.stringify(['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym']),
          rating: 4.0 + Math.random(),
          reviewCount: Math.floor(Math.random() * 200),
          available: true,
          createdAt: new Date(),
        });
      }

      synced.push(destination);
      console.log(`✅ Synced ${city.name}`);
    }

    return c.json({ 
      message: 'Destinations synced',
      count: synced.length,
      destinations: synced,
    });
  } catch (error) {
    console.error('Sync destinations error:', error);
    return c.json({ error: 'Failed to sync destinations' }, 500);
  }
});
export default adminRouter;
