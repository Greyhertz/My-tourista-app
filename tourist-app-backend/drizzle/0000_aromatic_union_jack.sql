CREATE TYPE "public"."admin_role" AS ENUM('super', 'support');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('guest', 'user', 'verified_user', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'suspended', 'deleted');--> statement-breakpoint
CREATE TABLE "accounts" (
	"uid" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"loyalty_points" integer DEFAULT 0 NOT NULL,
	"total_bookings" integer DEFAULT 0 NOT NULL,
	"last_login_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_permissions" (
	"uid" text PRIMARY KEY NOT NULL,
	"admin_role" "admin_role" NOT NULL,
	"granted_by" text NOT NULL,
	"granted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"actor_uid" text NOT NULL,
	"actor_role" text NOT NULL,
	"action" text NOT NULL,
	"target_uid" text,
	"target_resource" text,
	"metadata" text,
	"ip_address" text,
	"user_agent" text,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"uid" text PRIMARY KEY NOT NULL,
	"role" "role" DEFAULT 'guest' NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"email" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "token_revocations" (
	"uid" text PRIMARY KEY NOT NULL,
	"revoked_at" timestamp DEFAULT now() NOT NULL,
	"reason" text
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_uid_profiles_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."profiles"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin_permissions" ADD CONSTRAINT "admin_permissions_uid_profiles_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."profiles"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "token_revocations" ADD CONSTRAINT "token_revocations_uid_profiles_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."profiles"("uid") ON DELETE no action ON UPDATE no action;