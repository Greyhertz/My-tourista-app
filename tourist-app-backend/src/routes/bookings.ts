import { Hono } from 'hono';
import { authMiddleware, AuthUser } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';
import { db } from '../db/index';
import { bookings } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { nanoid } from 'nanoid';

type Variables = { user: AuthUser | null };
const bookingsRouter = new Hono<{ Variables: Variables }>();

// List user's bookings
bookingsRouter.get('/', authMiddleware, requireRole('user'), async (c) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const userBookings = await db
      .select()
      .from(bookings)
      .where(eq(bookings.userId, user.uid))
      .orderBy(bookings.createdAt);

    return c.json({ bookings: userBookings });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return c.json({ error: 'Failed to fetch bookings' }, 500);
  }
});

// Get single booking
bookingsRouter.get('/:id', authMiddleware, requireRole('user'), async (c) => {
  const user = c.get('user');
  const bookingId = c.req.param('id');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, bookingId))
      .limit(1);

    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    // Check ownership
    if (booking.userId !== user.uid) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    return c.json({ booking });
  } catch (error) {
    console.error('Fetch booking error:', error);
    return c.json({ error: 'Failed to fetch booking' }, 500);
  }
});

// Create booking
bookingsRouter.post('/', authMiddleware, requireRole('user'), async (c) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const body = await c.req.json();
    const { hotelId, hotelName, checkIn, checkOut, guests, totalPrice } = body;

    // Basic validation
    if (!hotelId || !hotelName || !checkIn || !checkOut || !guests || !totalPrice) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const newBooking = {
      id: nanoid(),
      userId: user.uid,
      hotelId,
      hotelName,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: Number(guests),
      totalPrice: Number(totalPrice),
      status: 'confirmed',
    };

    const [created] = await db
      .insert(bookings)
      .values(newBooking)
      .returning();

    return c.json({ booking: created }, 201);
  } catch (error) {
    console.error('Create booking error:', error);
    return c.json({ error: 'Failed to create booking' }, 500);
  }
});

// Cancel booking
bookingsRouter.delete('/:id', authMiddleware, requireRole('user'), async (c) => {
  const user = c.get('user');
  const bookingId = c.req.param('id');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, bookingId))
      .limit(1);

    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    // Check ownership
    if (booking.userId !== user.uid) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    // Check if already cancelled
    if (booking.status === 'cancelled') {
      return c.json({ error: 'Booking already cancelled' }, 400);
    }

    // Update status to cancelled
    const [updated] = await db
      .update(bookings)
      .set({ 
        status: 'cancelled',
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, bookingId))
      .returning();

    return c.json({ 
      message: 'Booking cancelled',
      booking: updated,
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    return c.json({ error: 'Failed to cancel booking' }, 500);
  }
});

export default bookingsRouter;