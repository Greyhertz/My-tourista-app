import { Hono } from 'hono';
import { authMiddleware, AuthUser } from '../middleware/auth';
import { db } from '../db/index';
import { profiles, accounts, adminPermissions, auditLogs } from '../db/schema';
import { eq } from 'drizzle-orm';
import { auth as firebaseAuth } from '../firebase';
import { nanoid } from 'nanoid';

type Variables = { user: AuthUser | null };
const adminRouter = new Hono<{ Variables: Variables }>();

// Check if user is admin
const requireAdmin = async (c: any, next: any) => {
  const user = c.get('user') as AuthUser;
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  // Check admin permissions
  const [admin] = await db
    .select()
    .from(adminPermissions)
    .where(eq(adminPermissions.uid, user.uid))
    .limit(1);

  if (!admin) {
    return c.json({ error: 'Forbidden', message: 'Admin access required' }, 403);
  }

  c.set('adminRole', admin.adminRole);
  await next();
};

// Check if super admin
const requireSuperAdmin = async (c: any, next: any) => {
  const adminRole = c.get('adminRole');
  
  if (adminRole !== 'super') {
    return c.json({ error: 'Forbidden', message: 'Super admin access required' }, 403);
  }

  await next();
};

// List all users
adminRouter.get('/users', authMiddleware, requireAdmin, async (c) => {
  try {
    const allUsers = await db
      .select({
        uid: profiles.uid,
        email: profiles.email,
        role: profiles.role,
        status: profiles.status,
        createdAt: profiles.createdAt,
      })
      .from(profiles)
      .limit(100);

    return c.json({ users: allUsers });
  } catch (error) {
    console.error('List users error:', error);
    return c.json({ error: 'Failed to list users' }, 500);
  }
});

// Get user details
adminRouter.get('/users/:uid', authMiddleware, requireAdmin, async (c) => {
  const uid = c.req.param('uid');

  try {
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.uid, uid))
      .limit(1);

    if (!profile) {
      return c.json({ error: 'User not found' }, 404);
    }

    const [account] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.uid, uid))
      .limit(1);

    return c.json({ 
      profile,
      account: account || null,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: 'Failed to get user' }, 500);
  }
});

// Suspend user
adminRouter.post('/users/:uid/suspend', authMiddleware, requireAdmin, async (c) => {
  const uid = c.req.param('uid');
  const user = c.get('user') as AuthUser;
  const body = await c.req.json();
  const { reason } = body;

  try {
    // Update profile status
    await db
      .update(profiles)
      .set({ 
        status: 'suspended',
        updatedAt: new Date(),
      })
      .where(eq(profiles.uid, uid));

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

export default adminRouter;