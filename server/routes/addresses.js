const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Get all addresses for a user
router.get('/addresses/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM user_addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC',
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching addresses:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add new address
router.post('/addresses', async (req, res) => {
    const { userId, name, phone, address, city, state, pincode, isDefault } = req.body;

    if (!userId || !name || !phone || !address || !city || !state || !pincode) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // If this is the first address or set as default, update other addresses
        if (isDefault) {
            await pool.query(
                'UPDATE user_addresses SET is_default = FALSE WHERE user_id = $1',
                [userId]
            );
        }

        // Check if this is the first address for the user
        const countResult = await pool.query(
            'SELECT COUNT(*) FROM user_addresses WHERE user_id = $1',
            [userId]
        );
        const isFirstAddress = parseInt(countResult.rows[0].count) === 0;

        const result = await pool.query(
            `INSERT INTO user_addresses (user_id, name, phone, address, city, state, pincode, is_default)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [userId, name, phone, address, city, state, pincode, isDefault || isFirstAddress]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding address:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update address
router.put('/addresses/:id', async (req, res) => {
    const { id } = req.params;
    const { name, phone, address, city, state, pincode } = req.body;

    try {
        const result = await pool.query(
            `UPDATE user_addresses 
             SET name = $1, phone = $2, address = $3, city = $4, state = $5, pincode = $6
             WHERE id = $7 RETURNING *`,
            [name, phone, address, city, state, pincode, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Address not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating address:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete address
router.delete('/addresses/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Get the address first to check if it was default
        const addressResult = await pool.query(
            'SELECT user_id, is_default FROM user_addresses WHERE id = $1',
            [id]
        );

        if (addressResult.rows.length === 0) {
            return res.status(404).json({ error: 'Address not found' });
        }

        const { user_id, is_default } = addressResult.rows[0];

        // Delete the address
        await pool.query('DELETE FROM user_addresses WHERE id = $1', [id]);

        // If deleted address was default, set another as default
        if (is_default) {
            await pool.query(
                `UPDATE user_addresses SET is_default = TRUE 
                 WHERE id = (SELECT id FROM user_addresses WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1)`,
                [user_id]
            );
        }

        res.json({ message: 'Address deleted successfully' });
    } catch (err) {
        console.error('Error deleting address:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Set address as default
router.put('/addresses/:id/default', async (req, res) => {
    const { id } = req.params;

    try {
        // Get user_id from this address
        const addressResult = await pool.query(
            'SELECT user_id FROM user_addresses WHERE id = $1',
            [id]
        );

        if (addressResult.rows.length === 0) {
            return res.status(404).json({ error: 'Address not found' });
        }

        const userId = addressResult.rows[0].user_id;

        // Remove default from all user's addresses
        await pool.query(
            'UPDATE user_addresses SET is_default = FALSE WHERE user_id = $1',
            [userId]
        );

        // Set this address as default
        const result = await pool.query(
            'UPDATE user_addresses SET is_default = TRUE WHERE id = $1 RETURNING *',
            [id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error setting default address:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
