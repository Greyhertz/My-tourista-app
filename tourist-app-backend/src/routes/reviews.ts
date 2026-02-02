import { Hono } from 'hono';
import { authMiddleware, optionalAuth, AuthUser } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';
import { db }from '../db/index';
import { reviews } from '../db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

type Variables = { user: AuthUser | null };
const reviewsRouter = new Hono<{ Variables: Variables }>();

// Get reviews for a property (public)
reviewsRouter.get('/property/:propertyId', optionalAuth, async (c) => {
  const propertyId = c.req.param('propertyId');

  try {
    const propertyReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.propertyId, propertyId))
      .orderBy(reviews.createdAt);

    return c.json({ reviews: propertyReviews });
  } catch (error) {
    console.error('Fetch reviews error:', error);
    return c.json({ error: 'Failed to fetch reviews' }, 500);
  }
});

// Create review (verified users only)
reviewsRouter.post('/', authMiddleware, requireRole('verified_user'), async (c) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const body = await c.req.json();
    const { propertyId, propertyName, rating, title, content } = body;

    // Validation
    if (!propertyId || !propertyName || !rating || !title || !content) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    if (rating < 1 || rating > 5) {
      return c.json({ error: 'Rating must be between 1 and 5' }, 400);
    }

    const newReview = {
      id: nanoid(),
      userId: user.uid,
      propertyId,
      propertyName,
      rating: Number(rating),
      title,
      content,
    };

    const [created] = await db
      .insert(reviews)
      .values(newReview)
      .returning();

    return c.json({ review: created }, 201);
  } catch (error) {
    console.error('Create review error:', error);
    return c.json({ error: 'Failed to create review' }, 500);
  }
});

// Get user's own reviews
reviewsRouter.get('/my-reviews', authMiddleware, requireRole('user'), async (c) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const userReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.userId, user.uid))
      .orderBy(reviews.createdAt);

    return c.json({ reviews: userReviews });
  } catch (error) {
    console.error('Fetch user reviews error:', error);
    return c.json({ error: 'Failed to fetch reviews' }, 500);
  }
});

// Delete review (own reviews only)
reviewsRouter.delete('/:id', authMiddleware, requireRole('user'), async (c) => {
  const user = c.get('user');
  const reviewId = c.req.param('id');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const [review] = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, reviewId))
      .limit(1);

    if (!review) {
      return c.json({ error: 'Review not found' }, 404);
    }

    // Check ownership
    if (review.userId !== user.uid) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    await db.delete(reviews).where(eq(reviews.id, reviewId));

    return c.json({ message: 'Review deleted' });
  } catch (error) {
    console.error('Delete review error:', error);
    return c.json({ error: 'Failed to delete review' }, 500);
  }
});

export default reviewsRouter;