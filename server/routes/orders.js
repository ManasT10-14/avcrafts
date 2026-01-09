const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Create a new order
router.post('/orders', async (req, res) => {
    const {
        productId, quantity, shape, size, color,
        totalAmount, customizationNote,
        customerName, email, phone, address, city, state, pincode,
        paymentMethod, imageData, imageRotation, customizationDetails
    } = req.body;

    if (!totalAmount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Ensure a default user exists
        const userIdToUse = 1;
        const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [userIdToUse]);

        if (userCheck.rows.length === 0) {
            await pool.query(
                "INSERT INTO users (id, name, email) VALUES ($1, 'Guest User', 'guest@avcrafts.com') ON CONFLICT (id) DO NOTHING",
                [userIdToUse]
            );
        }

        const result = await pool.query(
            `INSERT INTO orders (
                user_id, product_id, quantity, shape, size, color,
                total_amount, customization_note,
                customer_name, email, phone, address, city, state, pincode,
                payment_method, image_data, image_rotation, customization_details
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`,
            [
                userIdToUse, productId, quantity || 1, shape || '', size || '', color || '',
                totalAmount, customizationNote || '',
                customerName || '', email || '', phone || '', address || '', city || '', state || '', pincode || '',
                paymentMethod || 'cod', imageData || '', imageRotation || 0, customizationDetails || {}
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Order creation error:', err);
        res.status(500).json({ error: 'Server error creating order', details: err.message });
    }
});

// Get orders by user
router.get('/orders/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ADMIN: Get ALL orders with product info
router.get('/admin/orders', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT o.*, p.name as product_name, p.image_url as product_image
            FROM orders o
            LEFT JOIN products p ON p.id = o.product_id
            ORDER BY o.created_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ADMIN: Update order status
router.patch('/admin/orders/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'crafting', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        const result = await pool.query(
            'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
            [status, orderId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ADMIN: Delete ALL orders (Password protected)
router.delete('/admin/orders', async (req, res) => {
    const { password } = req.body;
    const ADMIN_PASSWORD = 'avcrafts2024'; // Ideally in ENV, matches frontend

    if (password !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: 'Invalid password' });
    }

    try {
        await pool.query('DELETE FROM orders');
        res.json({ message: 'All orders deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
