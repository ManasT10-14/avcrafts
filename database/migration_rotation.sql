-- Migration to add image_rotation to orders table

ALTER TABLE orders ADD COLUMN IF NOT EXISTS image_rotation INTEGER DEFAULT 0;
