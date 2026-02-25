import { Hono } from 'hono';
import { authMiddleware, AuthUser } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';
import { db } from '../db/index';
import { cart } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { nanoid } from 'nanoid';

type Variables = { user: AuthUser | null };
const cartRouter = new Hono<{ Variables: Variables }>();

// Get user's cart
cartRouter.get('/', authMiddleware, requireRole('user'), async (c) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const items = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, user.uid))
      .orderBy(cart.createdAt);

    return c.json({ items });
  } catch (error) {
    console.error('Get cart error:', error);
    return c.json({ error: 'Failed to get cart' }, 500);
  }
});

// Add item to cart
cartRouter.post('/', authMiddleware, requireRole('user'), async (c) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const body = await c.req.json();
    const {
      itemType,
      itemId,
      itemName,
      itemImage,
      destinationId,
      destinationName,
      checkIn,
      checkOut,
      guests,
      pricePerNight,
      totalPrice,
      metadata,
    } = body;

    // Validate required fields
    if (!itemType || !itemId || !itemName || !destinationId || !totalPrice) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const newItem = {
      id: nanoid(),
      userId: user.uid,
      itemType,
      itemId,
      itemName,
      itemImage: itemImage || '',
      destinationId,
      destinationName,
      checkIn: checkIn ? new Date(checkIn) : null,
      checkOut: checkOut ? new Date(checkOut) : null,
      guests: guests || 1,
      pricePerNight: pricePerNight || null,
      totalPrice: Number(totalPrice),
      metadata: metadata ? JSON.stringify(metadata) : null,
    };

    const [created] = await db.insert(cart).values(newItem).returning();

    return c.json({ item: created }, 201);
  } catch (error) {
    console.error('Add to cart error:', error);
    return c.json({ error: 'Failed to add to cart' }, 500);
  }
});

// Remove item from cart
cartRouter.delete('/:id', authMiddleware, requireRole('user'), async (c) => {
  const user = c.get('user');
  const itemId = c.req.param('id');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    // Verify ownership
    const [item] = await db
      .select()
      .from(cart)
      .where(and(eq(cart.id, itemId), eq(cart.userId, user.uid)))
      .limit(1);

    if (!item) {
      return c.json({ error: 'Item not found' }, 404);
    }

    await db.delete(cart).where(eq(cart.id, itemId));

    return c.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    return c.json({ error: 'Failed to remove item' }, 500);
  }
});

// Clear entire cart
cartRouter.delete('/', authMiddleware, requireRole('user'), async (c) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    await db.delete(cart).where(eq(cart.userId, user.uid));
    return c.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Clear cart error:', error);
    return c.json({ error: 'Failed to clear cart' }, 500);
  }
});

export default cartRouter;