-- Clear existing products for Fridge Magnets (Category 1)
DELETE FROM products WHERE category_id = 1;

-- Reset sequence if needed (optional, safer to just insert)

INSERT INTO products (category_id, name, description, price, crafting_time_days, image_url, is_made_on_order) VALUES
(1, 'Miniature Dosa Platter Magnet', 'A delightful miniature replica of a South Indian Dosa platter, complete with chutney and sambar bowls. Hand-sculpted from polymer clay.', 399.00, 3, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400', true),

(1, 'Hand-Painted Warli Art Magnet', 'Traditional Warli tribal art hand-painted on a rustic wooden slice. unique cultural touch for your fridge.', 249.00, 2, 'https://images.unsplash.com/photo-1558244402-286dd748c593?auto=format&fit=crop&q=80&w=400', true),

(1, 'Quirky "Chai Lover" Magnet', 'For the tea enthusiast! A cute cup design with "Chai is Life" typography. Durable resin finish.', 199.00, 2, 'https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?auto=format&fit=crop&q=80&w=400', true),

(1, 'Succulent Planter Magnet (Set of 3)', 'Tiny faux succulent planters that attach strongly to your fridge. Adds a refreshing touch of green.', 599.00, 4, 'https://images.unsplash.com/photo-1459416493396-b4b941842ee2?auto=format&fit=crop&q=80&w=400', true),

(1, 'Retro Cassette Tape Magnet', 'Throwback to the 90s! Personalize the label with your favorite song title. Handcrafted from wood.', 299.00, 3, 'https://images.unsplash.com/photo-1594910078044-648dc8596664?auto=format&fit=crop&q=80&w=400', true),

(1, 'Floral Resin Initial Magnet', 'Your initial preserved in clear resin with real dried flowers. Elegant and personalized.', 349.00, 5, 'https://images.unsplash.com/photo-1582201942988-13e60e4556ec?auto=format&fit=crop&q=80&w=400', true),

(1, 'Comic Strip Speech Bubble', 'Write your own daily message! Re-writable surface marker included. Fun for the whole family.', 149.00, 1, 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=400', true),

(1, 'Miniature Book Stack Magnet', 'For the bibliophile. A stack of 3 classic novels modeled in clay. Customizable titles available.', 449.00, 4, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400', true),

(1, 'Abstract Boho Clay Magnet', 'Modern abstract shapes in earthy terracotta and beige tones. Perfect for minimalist decor.', 229.00, 2, 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=400', true),

(1, 'Polaroid Photo Frame Magnet', 'Wooden frame styled like a polaroid. Slide in your own mini photos.', 179.00, 2, 'https://images.unsplash.com/photo-1526436660161-12003c20c025?auto=format&fit=crop&q=80&w=400', true);
