const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../db');
const { JWT_SECRET, authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const db = getDb();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
    if (existing) {
        return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const result = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(
        email.toLowerCase(),
        passwordHash
    );

    const token = jwt.sign({ userId: result.lastInsertRowid }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
        token,
        user: { id: result.lastInsertRowid, email: email.toLowerCase() },
    });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
        token,
        user: { id: user.id, email: user.email },
    });
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
    const db = getDb();
    const user = db.prepare('SELECT id, email, created_at FROM users WHERE id = ?').get(req.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ user });
});

module.exports = router;
