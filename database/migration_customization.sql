-- Add customization_details column to orders for storing zoom, rotation, etc.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customization_details JSONB DEFAULT '{}'::jsonb;
