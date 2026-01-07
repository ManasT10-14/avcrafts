-- Database Schema for AVCrafts

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'coming_soon', -- 'active', 'coming_soon'
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

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'crafting', 'shipped', 'delivered'
    customization_note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data (Initial Data)
INSERT INTO categories (name, description, image_url, status)
VALUES 
('Fridge Magnets', 'Hand-painted magnets for your home', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400', 'active'),
('Wall Art', 'Unique woven and painted wall pieces', 'https://images.unsplash.com/photo-1582201942988-13e60e4556ec?auto=format&fit=crop&q=80&w=400', 'coming_soon'),
('Personalized Gifts', 'Custom gifts for your loved ones', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400', 'coming_soon')
ON CONFLICT DO NOTHING;

INSERT INTO products (category_id, name, description, price, crafting_time_days, image_url)
VALUES 
(1, 'Sunset Mountain Magnet', 'Miniature hand-painted sunset on wood slice.', 12.00, '2-3 days', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400'),
(1, 'Floral Resin Magnet', 'Real dried flowers preserved in clear resin.', 15.00, '3-4 days', 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=400'),
(1, 'Custom Name Magnet', 'Your name hand-lettered on a clay magnet.', 10.00, '2 days', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400')
ON CONFLICT DO NOTHING;
