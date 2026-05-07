const express = require('express');
const crypto = require('crypto');
const { pool } = require('../db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { sendInviteEmail } = require('../utils/email');

const router = express.Router();
router.use(authMiddleware);
router.use(adminMiddleware);

const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/admin/users
router.get('/users', wrap(async (req, res) => {
    const { rows } = await pool.query(`
        SELECT id, email, role, is_active,
               (invite_token IS NOT NULL AND invite_token_expires_at > NOW()) AS has_pending_invite,
               created_at
        FROM users
        ORDER BY created_at DESC
    `);
    res.json(rows);
}));

// POST /api/admin/users/invite
router.post('/users/invite', wrap(async (req, res) => {
    const { email, role = 'user' } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });
    if (!['user', 'admin'].includes(role)) return res.status(400).json({ error: 'Invalid role.' });

    const { rows: existing } = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existing.length > 0) return res.status(409).json({ error: 'An account with this email already exists.' });

    const inviteToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const { rows } = await pool.query(
        `INSERT INTO users (email, role, is_active, invite_token, invite_token_expires_at)
         VALUES ($1, $2, false, $3, $4) RETURNING id`,
        [email.toLowerCase(), role, inviteToken, expiresAt]
    );

    await sendInviteEmail(email.toLowerCase(), inviteToken);

    res.status(201).json({ id: rows[0].id, email: email.toLowerCase(), role });
}));

// POST /api/admin/users/:id/resend-invite — resend invitation email
router.post('/users/:id/resend-invite', wrap(async (req, res) => {
    const { rows } = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [req.params.id]
    );
    const user = rows[0];
    if (!user) return res.status(404).json({ error: 'User not found.' });
    if (user.is_active && user.password_hash) {
        return res.status(400).json({ error: 'User is already active.' });
    }

    const inviteToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await pool.query(
        'UPDATE users SET invite_token = $1, invite_token_expires_at = $2 WHERE id = $3',
        [inviteToken, expiresAt, user.id]
    );

    await sendInviteEmail(user.email, inviteToken);
    res.json({ message: 'Invitation resent.' });
}));

// PATCH /api/admin/users/:id — update role or active status
router.patch('/users/:id', wrap(async (req, res) => {
    const { role, is_active } = req.body;
    const userId = parseInt(req.params.id);

    if (userId === req.userId) {
        return res.status(400).json({ error: 'Cannot modify your own account.' });
    }

    const updates = [];
    const values = [];
    let idx = 1;

    if (role !== undefined) {
        if (!['user', 'admin'].includes(role)) return res.status(400).json({ error: 'Invalid role.' });
        updates.push(`role = $${idx++}`);
        values.push(role);
    }
    if (is_active !== undefined) {
        updates.push(`is_active = $${idx++}`);
        values.push(Boolean(is_active));
    }

    if (updates.length === 0) return res.status(400).json({ error: 'Nothing to update.' });

    values.push(userId);
    const { rows } = await pool.query(
        `UPDATE users SET ${updates.join(', ')} WHERE id = $${idx} RETURNING id, email, role, is_active`,
        values
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found.' });
    res.json(rows[0]);
}));

// DELETE /api/admin/users/:id — only if user has no assessments
router.delete('/users/:id', wrap(async (req, res) => {
    const userId = parseInt(req.params.id);
    if (userId === req.userId) return res.status(400).json({ error: 'Cannot delete your own account.' });

    const { rows: counts } = await pool.query(
        'SELECT COUNT(*) AS c FROM assessments WHERE user_id = $1',
        [userId]
    );
    if (parseInt(counts[0].c) > 0) {
        return res.status(400).json({ error: 'Cannot delete a user with assessments. Deactivate instead.' });
    }

    const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found.' });
    res.json({ message: 'User deleted.' });
}));

module.exports = router;
