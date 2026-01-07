const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Google OAuth Login/Signup
router.post('/auth/google', async (req, res) => {
    const { googleId, email, name, picture } = req.body;

    if (!googleId || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Check if user exists
        let result = await pool.query(
            'SELECT * FROM users WHERE google_id = $1 OR email = $2',
            [googleId, email]
        );

        let user;

        if (result.rows.length > 0) {
            // Update existing user
            user = result.rows[0];
            await pool.query(
                'UPDATE users SET google_id = $1, name = $2, picture = $3 WHERE id = $4',
                [googleId, name, picture, user.id]
            );
            user = { ...user, google_id: googleId, name, picture };
        } else {
            // Create new user
            const insertResult = await pool.query(
                'INSERT INTO users (name, email, google_id, picture) VALUES ($1, $2, $3, $4) RETURNING *',
                [name, email, googleId, picture]
            );
            user = insertResult.rows[0];
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            phone: user.phone
        });
    } catch (err) {
        console.error('Auth error:', err);
        res.status(500).json({ error: 'Server error during authentication' });
    }
});

// Get user profile
router.get('/auth/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            'SELECT id, name, email, picture, phone, created_at FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update user profile
router.put('/auth/user/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, phone } = req.body;

    try {
        const result = await pool.query(
            'UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone) WHERE id = $3 RETURNING id, name, email, picture, phone',
            [name, phone, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
