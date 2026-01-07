-- Reset and seed data for AVCrafts

-- Clear existing data
TRUNCATE TABLE order_items, orders, products, categories RESTART IDENTITY CASCADE;

-- Insert Categories
INSERT INTO categories (name, description, image_url) VALUES
('Fridge Magnets', 'Beautiful magnetic keepsakes.', 'https://images.unsplash.com/photo-1549416878-b9ca95ae7f68?q=80&w=2070'),
('Magnetic Frames', 'Handcrafted magnetic frames.', 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974');

-- Insert Products (IDs will be 1 and 2 due to RESTART IDENTITY)
INSERT INTO products (name, description, price, category_id, image_url, crafting_time_days) VALUES
('Custom Fridge Magnet', 'Turn your favorite photo into a delightful custom magnet. Perfect for fridges, lockers, or any magnetic surface.', 299, 1, 'https://images.unsplash.com/photo-1549416878-b9ca95ae7f68?q=80&w=2070', '1-2 days'),
('Magnetic Wall Frame', 'Elegantly holds your prints with hidden strong magnets. Easier than traditional framing, perfect for creating dynamic gallery walls.', 899, 2, 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974', '3-4 days');
