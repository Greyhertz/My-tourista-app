import { pgTable, text, timestamp, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const roleEnum = pgEnum('role', ['guest', 'user', 'verified_user', 'suspended']);
export const adminRoleEnum = pgEnum('admin_role', ['super', 'support']);
export const statusEnum = pgEnum('status', ['active', 'suspended', 'deleted']);

// Profiles table
export const profiles = pgTable('profiles', {
  uid: text('uid').primaryKey(),
  role: roleEnum('role').notNull().default('guest'),
  status: statusEnum('status').notNull().default('active'),
  email: text('email'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Accounts table
export const accounts = pgTable('accounts', {
  uid: text('uid').primaryKey().references(() => profiles.uid),
  email: text('email').notNull(),
  emailVerified: boolean('email_verified').notNull().default(false),
  loyaltyPoints: integer('loyalty_points').notNull().default(0),
  totalBookings: integer('total_bookings').notNull().default(0),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Admin permissions table
export const adminPermissions = pgTable('admin_permissions', {
  uid: text('uid').primaryKey().references(() => profiles.uid),
  adminRole: adminRoleEnum('admin_role').notNull(),
  grantedBy: text('granted_by').notNull(),
  grantedAt: timestamp('granted_at').notNull().defaultNow(),
});

// Audit logs table
export const auditLogs = pgTable('audit_logs', {
  id: text('id').primaryKey(),
  actorUid: text('actor_uid').notNull(),
  actorRole: text('actor_role').notNull(),
  action: text('action').notNull(),
  targetUid: text('target_uid'),
  targetResource: text('target_resource'),
  metadata: text('metadata'), // JSON string
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
});

// Token revocations table (optional)
export const tokenRevocations = pgTable('token_revocations', {
  uid: text('uid').primaryKey().references(() => profiles.uid),
  revokedAt: timestamp('revoked_at').notNull().defaultNow(),
  reason: text('reason'),
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
});

// Add to existing schema.ts (after other tables)

export const bookings = pgTable('bookings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => profiles.uid),
  hotelId: text('hotel_id').notNull(),
  hotelName: text('hotel_name').notNull(),
  checkIn: timestamp('check_in').notNull(),
  checkOut: timestamp('check_out').notNull(),
  guests: integer('guests').notNull(),
  totalPrice: integer('total_price').notNull(), // in cents
  status: text('status').notNull().default('confirmed'), // confirmed, cancelled
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Add to existing schema.ts (after bookings table)

export const reviews = pgTable('reviews', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => profiles.uid),
  propertyId: text('property_id').notNull(),
  propertyName: text('property_name').notNull(),
  rating: integer('rating').notNull(), // 1-5
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
<<<<<<< Updated upstream
=======
});

// Add after reviews table
export const destinations = pgTable('destinations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  country: text('country').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  highlights: text('highlights').notNull(), // JSON array as string
  rating: integer('rating').notNull().default(0), // Average rating 0-5
  reviewCount: integer('review_count').notNull().default(0),
  priceLevel: integer('price_level').notNull().default(2), // 1-4 ($-$$$$)
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const hotels = pgTable('hotels', {
  id: text('id').primaryKey(),
  destinationId: text('destination_id').notNull().references(() => destinations.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  pricePerNight: integer('price_per_night').notNull(), // in cents
  imageUrl: text('image_url').notNull(),
  images: text('images').notNull(), // JSON array
  amenities: text('amenities').notNull(), // JSON array
  rating: integer('rating').notNull().default(0),
  reviewCount: integer('review_count').notNull().default(0),
  available: integer('available').notNull().default(1), // 1 = true, 0 = false
  createdAt: timestamp('created_at').notNull().defaultNow(),
}); 

export const cart = pgTable('cart', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => profiles.uid),
  itemType: text('item_type').notNull(), // 'hotel' or 'activity'
  itemId: text('item_id').notNull(), // hotelId or activityId
  itemName: text('item_name').notNull(),
  itemImage: text('item_image').notNull(),
  destinationId: text('destination_id').notNull().references(() => destinations.id),
  destinationName: text('destination_name').notNull(),
  checkIn: timestamp('check_in'),
  checkOut: timestamp('check_out'),
  guests: integer('guests').default(1),
  pricePerNight: integer('price_per_night'), // in cents
  totalPrice: integer('total_price').notNull(), // in cents
  metadata: text('metadata'), // JSON for extra data
  createdAt: timestamp('created_at').notNull().defaultNow(),
>>>>>>> Stashed changes
>>>>>>> Stashed changes
>>>>>>> Stashed changes
});