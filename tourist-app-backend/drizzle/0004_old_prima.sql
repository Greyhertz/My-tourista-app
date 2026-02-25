CREATE TABLE "cart" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"item_type" text NOT NULL,
	"item_id" text NOT NULL,
	"item_name" text NOT NULL,
	"item_image" text NOT NULL,
	"destination_id" text NOT NULL,
	"destination_name" text NOT NULL,
	"check_in" timestamp,
	"check_out" timestamp,
	"guests" integer DEFAULT 1,
	"price_per_night" integer,
	"total_price" integer NOT NULL,
	"metadata" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_profiles_uid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE no action ON UPDATE no action;