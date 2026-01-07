const { pool } = require('./db');

const seedData = async () => {
    try {
        console.log('Seeding data...');

        // 1. Clear existing data (only tables that exist based on schema.sql)
        await pool.query('TRUNCATE TABLE orders, products, categories RESTART IDENTITY CASCADE');

        // 2. Insert Categories
        const magnetsCat = await pool.query(
            "INSERT INTO categories (name, description, image_url) VALUES ('Fridge Magnets', 'Beautiful magnetic keepsakes.', 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1974') RETURNING *"
        );
        const framesCat = await pool.query(
            "INSERT INTO categories (name, description, image_url) VALUES ('Magnetic Frames', 'Handcrafted magnetic frames.', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070') RETURNING *"
        );

        console.log('Categories inserted. IDs:', magnetsCat.rows[0].id, framesCat.rows[0].id);

        // 3. Insert Exactly 2 Products
        // Product 1: Fridge Magnet
        await pool.query(
            "INSERT INTO products (name, description, price, category_id, image_url, crafting_time_days) VALUES ($1, $2, $3, $4, $5, $6)",
            [
                'Custom Fridge Magnet',
                'Turn your favorite photo into a delightful custom magnet. Perfect for fridges, lockers, or any magnetic surface.',
                299,
                magnetsCat.rows[0].id,
                'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1974&auto=format&fit=crop',
                '1-2 days'
            ]
        );

        // Product 2: Magnetic Frame
        await pool.query(
            "INSERT INTO products (name, description, price, category_id, image_url, crafting_time_days) VALUES ($1, $2, $3, $4, $5, $6)",
            [
                'Magnetic Wall Frame',
                'Elegantly holds your prints with hidden strong magnets. Easier than traditional framing, perfect for creating dynamic gallery walls.',
                899,
                framesCat.rows[0].id,
                'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop',
                '3-4 days'
            ]
        );

        console.log('Inserted 2 products. Product IDs are 1 and 2.');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
