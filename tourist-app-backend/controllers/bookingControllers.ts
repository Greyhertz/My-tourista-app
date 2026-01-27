import { Hono } from 'hono';
import { db } from '../db';
import { type Booking } from '../src/types';

export const createBooking = async (c: any) => {
  const body = await c.req.json().catch(() => null);
  if (!body || !body.user || !body.hotelId) {
    return c.json({ error: 'user and hotelId required' }, 400);
  }

  const booking: Booking = {
    user: body.user,
    hotelId: body.hotelId,
    createdAt: new Date(),
  };

  try {
    const result = await db.collection('bookings').insertOne(booking);
    const saved = { ...booking, _id: result.insertedId };
    return c.json({ message: 'Booking saved', booking: saved }, 201);
  } catch (error) {
    return c.json({ error: 'Failed to save booking' }, 500);
  }
};

export const getBookings = async (c: any) => {
  const list = await db.collection('bookings').find().toArray();
  return c.json(list);
};
