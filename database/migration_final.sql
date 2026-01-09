-- ==============================================================
-- AVCrafts Complete Database Schema - FINAL VERSION
-- Run this in Supabase SQL Editor
-- This CLEARS all product data and sets up clean structure
-- Customer data (users, addresses, orders) is preserved
-- ==============================================================

-- ============================================
-- PART 1: ENSURE ALL TABLES EXIST WITH PROPER STRUCTURE
-- ============================================

-- Users Table (Core - DO NOT DELETE DATA)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    google_id VARCHAR(255) UNIQUE,
    picture TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Addresses Table (DO NOT DELETE DATA)
CREATE TABLE IF NOT EXISTS user_addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'coming_soon',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    crafting_time_days VARCHAR(50),
    image_url TEXT,
    is_made_on_order BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Prices Table (for size-based pricing)
CREATE TABLE IF NOT EXISTS product_prices (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    shape VARCHAR(50),
    size VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table (DO NOT DELETE DATA - customer orders)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    shape VARCHAR(50),
    size VARCHAR(50),
    color VARCHAR(50),
    total_amount DECIMAL(10, 2) NOT NULL,
    customization_note TEXT,
    customer_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    payment_method VARCHAR(50) DEFAULT 'cod',
    image_data TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- PART 2: CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_product_prices_product_id ON product_prices(product_id);

-- ============================================
-- PART 3: CLEAR AND RESET PRODUCT DATA ONLY
-- ============================================

-- Clear product-related data (NOT customer data)
DELETE FROM product_prices;
DELETE FROM products;
DELETE FROM categories;

-- Reset sequences
SELECT setval('categories_id_seq', 1, false);
SELECT setval('products_id_seq', 1, false);
SELECT setval('product_prices_id_seq', 1, false);

-- ============================================
-- PART 4: INSERT FRESH CATEGORIES
-- ============================================

INSERT INTO categories (id, name, description, image_url, status) VALUES
(1, 'Photo Products', 'Custom photo magnets and frames', '/images/fridge-magnets.png', 'active'),
(2, 'Wall Art', 'Unique woven and painted wall pieces', '/images/gallery-wall.png', 'coming_soon'),
(3, 'Personalized Gifts', 'Custom gifts for your loved ones', '/images/polaroid-memories.png', 'coming_soon');

SELECT setval('categories_id_seq', 3, true);

-- ============================================
-- PART 5: INSERT GENERIC PRODUCTS
-- ============================================

INSERT INTO products (id, category_id, name, description, price, crafting_time_days, image_url, is_made_on_order) VALUES
(1, 1, 'Fridge Magnets', 'Custom photo magnets for your fridge. Available in circle and rectangle shapes. Upload your favorite photo and we will craft a beautiful magnet for you. Perfect for preserving memories on your refrigerator or any magnetic surface.', 99.00, '2-4 days', '/images/fridge-magnets.png', TRUE),
(2, 1, 'Magnetic Frames', 'Elegant magnetic photo frames with natural wood finish. Available in Mini (desk) and Wall sizes. Perfect for displaying your cherished memories with a rustic, handcrafted touch.', 149.00, '3-5 days', '/images/magnetic-frames.png', TRUE);

SELECT setval('products_id_seq', 2, true);

-- ============================================
-- PART 6: INSERT PRICE VARIATIONS
-- ============================================

-- Fridge Magnets (Product ID: 1)
INSERT INTO product_prices (product_id, shape, size, price) VALUES
(1, 'circle', '23mm', 99.00),      -- Circle shape - fixed 23mm size
(1, 'rectangle', '2x3', 129.00),   -- Rectangle 2x3 inches
(1, 'rectangle', '3x4', 159.00);   -- Rectangle 3x4 inches

-- Magnetic Frames (Product ID: 2)
INSERT INTO product_prices (product_id, shape, size, price) VALUES
(2, NULL, 'mini', 149.00),    -- Mini/Desk size (2x3 inch photo)
(2, NULL, 'wall', 249.00);    -- Wall size (3x5 inch photo)

-- ============================================
-- PART 7: ENSURE DEFAULT GUEST USER EXISTS
-- ============================================

INSERT INTO users (id, name, email) 
VALUES (1, 'Guest User', 'guest@avcrafts.com')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES (Run these to verify)
-- ============================================

-- Verify Products
SELECT 'PRODUCTS' as table_name, COUNT(*) as count FROM products;

-- Verify Price Variations  
SELECT p.name, pp.shape, pp.size, pp.price 
FROM product_prices pp 
JOIN products p ON p.id = pp.product_id 
ORDER BY p.id, pp.price;

-- Verify Categories
SELECT 'CATEGORIES' as table_name, COUNT(*) as count FROM categories;

-- Verify Users (should have at least guest user)
SELECT 'USERS' as table_name, COUNT(*) as count FROM users;

-- Verify User Addresses
SELECT 'USER_ADDRESSES' as table_name, COUNT(*) as count FROM user_addresses;

-- Verify Orders (your existing orders should be preserved)
SELECT 'ORDERS' as table_name, COUNT(*) as count FROM orders;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT 'Database restructured successfully!' as status;
