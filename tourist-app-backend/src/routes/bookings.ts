// routes/bookings.ts
import { Hono } from 'hono';
import admin from 'firebase-admin';
import { requireAuth } from '../middleware/auth';
type UserContext = {
  userId: string;
};

const router = new Hono<{ Variables: UserContext }>();
// Firestore reference
const firestore = admin.firestore();

// CREATE a new booking
router.post('/', requireAuth, async c => {
  try {
    const uid = c.get('userId');
    const { hotelId } = await c.req.json();

    if (!hotelId) return c.json({ error: 'hotelId is required' }, 400);

    const bookingData = {
      userId: uid,
      hotelId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const bookingRef = await firestore.collection('bookings').add(bookingData);

    return c.json(
      { message: 'Booking created', bookingId: bookingRef.id },
      201
    );
  } catch (err) {
    console.error('Booking creation error:', err);
    return c.json({ error: 'Failed to create booking' }, 500);
  }
});

// GET all bookings for logged-in user
router.get('/', requireAuth, async c => {
  try {
    const uid = c.get('userId');

    const snapshot = await firestore
      .collection('bookings')
      .where('userId', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    const bookings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return c.json(bookings);
  } catch (err) {
    console.error('Fetching bookings error:', err);
    return c.json({ error: 'Failed to fetch bookings' }, 500);
  }
});

export default router;
