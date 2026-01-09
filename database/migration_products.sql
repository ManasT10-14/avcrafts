-- Database Restructuring Migration for AVCrafts
-- Run this in Supabase SQL Editor
-- This migration restructures products for generic items with size-based pricing
-- IMPORTANT: Customer data (orders, users, user_addresses) is preserved

-- ============================================
-- STEP 1: CREATE NEW product_prices TABLE
-- ============================================
-- This stores prices based on shape/size combinations

CREATE TABLE IF NOT EXISTS product_prices (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    shape VARCHAR(50),           -- 'circle', 'rectangle', NULL for magnetic frames
    size VARCHAR(50) NOT NULL,   -- '23mm', '2x3', '3x4', 'mini', 'wall'
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- STEP 2: CLEAR OLD PRODUCTS (KEEP STRUCTURE)
-- ============================================
-- Remove the old specific products (Sunset Magnet, etc.)

DELETE FROM products;

-- ============================================
-- STEP 3: INSERT GENERIC PRODUCTS
-- ============================================

INSERT INTO products (id, category_id, name, description, price, crafting_time_days, image_url, is_made_on_order)
VALUES 
(1, 1, 'Fridge Magnets', 'Custom photo magnets for your fridge. Available in circle and rectangle shapes. Upload your favorite photo and we''ll craft a beautiful magnet for you.', 99.00, '2-4 days', '/images/fridge-magnets.png', TRUE),
(2, 1, 'Magnetic Frames', 'Elegant magnetic photo frames. Available in Mini (desk) and Wall sizes. Perfect for displaying your cherished memories.', 149.00, '3-5 days', '/images/magnetic-frames.png', TRUE)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    crafting_time_days = EXCLUDED.crafting_time_days,
    image_url = EXCLUDED.image_url;

-- Reset sequence to avoid ID conflicts
SELECT setval('products_id_seq', 2, true);

-- ============================================
-- STEP 4: INSERT PRICE VARIATIONS
-- ============================================

-- Clear existing prices
DELETE FROM product_prices;

-- Fridge Magnets (Product ID: 1)
-- Circle shape - fixed size 23mm
INSERT INTO product_prices (product_id, shape, size, price) VALUES
(1, 'circle', '23mm', 99.00);

-- Rectangle shapes - multiple sizes
INSERT INTO product_prices (product_id, shape, size, price) VALUES
(1, 'rectangle', '2x3', 129.00),
(1, 'rectangle', '3x4', 159.00);

-- Magnetic Frames (Product ID: 2)
INSERT INTO product_prices (product_id, shape, size, price) VALUES
(2, NULL, 'mini', 149.00),   -- Mini/Desk size (2x3 inch photo)
(2, NULL, 'wall', 249.00);   -- Wall size (3x5 inch photo)

-- ============================================
-- STEP 5: UPDATE CATEGORIES (CLEAN UP)
-- ============================================

-- Update existing categories
UPDATE categories SET 
    image_url = '/images/fridge-magnets.png',
    status = 'active'
WHERE id = 1;

-- Update or remove coming_soon categories
UPDATE categories SET status = 'coming_soon' WHERE id IN (2, 3);

-- ============================================
-- STEP 6: CREATE INDEX FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_product_prices_product_id ON product_prices(product_id);

-- ============================================
-- VERIFICATION QUERIES (Run to check data)
-- ============================================

-- Check products
-- SELECT * FROM products;

-- Check price variations
-- SELECT p.name, pp.shape, pp.size, pp.price 
-- FROM product_prices pp 
-- JOIN products p ON p.id = pp.product_id 
-- ORDER BY p.id, pp.shape, pp.price;

-- Check orders are intact
-- SELECT COUNT(*) as total_orders FROM orders;

-- Check users are intact
-- SELECT COUNT(*) as total_users FROM users;

-- Check user addresses are intact
-- SELECT COUNT(*) as total_addresses FROM user_addresses;
