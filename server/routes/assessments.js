const express = require('express');
const { pool } = require('../db');
const { authMiddleware } = require('../middleware/auth');
const { calculateScores } = require('../utils/scoring');

const router = express.Router();
router.use(authMiddleware);

const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/assessments
router.get('/', wrap(async (req, res) => {
    const { rows } = await pool.query(`
        SELECT a.*,
            (SELECT COUNT(*) FROM systems s WHERE s.assessment_id = a.id)::int AS system_count,
            (SELECT COUNT(*) FROM systems s WHERE s.assessment_id = a.id
                AND s.autonomy_level IS NOT NULL AND s.governance_level IS NOT NULL)::int AS evaluated_count
        FROM assessments a
        WHERE a.user_id = $1
        ORDER BY a.created_at DESC
    `, [req.userId]);
    res.json(rows);
}));

// POST /api/assessments
router.post('/', wrap(async (req, res) => {
    const { organizationName, assessorName, assessmentDate, notes } = req.body;
    if (!organizationName || !assessorName || !assessmentDate) {
        return res.status(400).json({ error: 'Organization name, assessor name, and date are required.' });
    }
    const { rows } = await pool.query(`
        INSERT INTO assessments (user_id, organization_name, assessor_name, assessment_date, notes)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [req.userId, organizationName, assessorName, assessmentDate, notes || null]);
    res.status(201).json(rows[0]);
}));

// GET /api/assessments/:id
router.get('/:id', wrap(async (req, res) => {
    const { rows: aRows } = await pool.query(
        'SELECT * FROM assessments WHERE id = $1 AND user_id = $2',
        [req.params.id, req.userId]
    );
    if (aRows.length === 0) return res.status(404).json({ error: 'Assessment not found.' });
    const assessment = aRows[0];

    const { rows: systems } = await pool.query(
        'SELECT * FROM systems WHERE assessment_id = $1 ORDER BY id',
        [assessment.id]
    );
    const scores = calculateScores(systems);
    const { branding_image, ...assessmentData } = assessment;
    res.json({ ...assessmentData, hasBranding: !!branding_image, systems, scores });
}));

// DELETE /api/assessments/:id
router.delete('/:id', wrap(async (req, res) => {
    const { rows } = await pool.query(
        'SELECT id FROM assessments WHERE id = $1 AND user_id = $2',
        [req.params.id, req.userId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Assessment not found.' });
    await pool.query('DELETE FROM assessments WHERE id = $1', [req.params.id]);
    res.json({ message: 'Assessment deleted.' });
}));

module.exports = router;
