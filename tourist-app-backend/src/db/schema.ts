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
});