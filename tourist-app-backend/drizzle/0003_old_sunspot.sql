CREATE TABLE "destinations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"country" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"highlights" text NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"price_level" integer DEFAULT 2 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotels" (
	"id" text PRIMARY KEY NOT NULL,
	"destination_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price_per_night" integer NOT NULL,
	"image_url" text NOT NULL,
	"images" text NOT NULL,
	"amenities" text NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"available" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE no action ON UPDATE no action;