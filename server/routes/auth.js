const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const { JWT_SECRET, authMiddleware } = require('../middleware/auth');

const router = express.Router();
const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// POST /api/auth/register
router.post('/register', wrap(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const { rows: existing } = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existing.length > 0) return res.status(409).json({ error: 'An account with this email already exists.' });

    const passwordHash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
        'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
        [email.toLowerCase(), passwordHash]
    );
    const userId = rows[0].id;
    const token = jwt.sign({ userId, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: userId, email: email.toLowerCase(), role: 'user' } });
}));

// POST /api/auth/login
router.post('/login', wrap(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });
    if (!user.is_active) return res.status(401).json({ error: 'Account is inactive. Contact an administrator.' });
    if (!user.password_hash) return res.status(401).json({ error: 'Account not yet activated. Check your invitation email.' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password.' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
}));

// GET /api/auth/invite/:token — validate invite token before showing the activation form
router.get('/invite/:token', wrap(async (req, res) => {
    const { rows } = await pool.query(
        'SELECT email FROM users WHERE invite_token = $1 AND invite_token_expires_at > NOW()',
        [req.params.token]
    );
    if (rows.length === 0) return res.status(400).json({ error: 'Invalid or expired invitation link.' });
    res.json({ email: rows[0].email });
}));

// POST /api/auth/activate — set password and activate account
router.post('/activate', wrap(async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'Token and password are required.' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const { rows } = await pool.query(
        'SELECT * FROM users WHERE invite_token = $1 AND invite_token_expires_at > NOW()',
        [token]
    );
    const user = rows[0];
    if (!user) return res.status(400).json({ error: 'Invalid or expired activation token.' });

    const passwordHash = await bcrypt.hash(password, 10);
    await pool.query(
        `UPDATE users
         SET password_hash = $1, is_active = true, invite_token = NULL, invite_token_expires_at = NULL
         WHERE id = $2`,
        [passwordHash, user.id]
    );

    const jwtToken = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: jwtToken, user: { id: user.id, email: user.email, role: user.role } });
}));

// GET /api/auth/me
router.get('/me', authMiddleware, wrap(async (req, res) => {
    const { rows } = await pool.query(
        'SELECT id, email, role, created_at FROM users WHERE id = $1',
        [req.userId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found.' });
    res.json({ user: rows[0] });
}));

module.exports = router;
