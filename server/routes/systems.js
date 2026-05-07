const express = require('express');
const { pool } = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

const MAX_SYSTEMS = 10;
const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/assessments/:assessmentId/systems
router.get('/:assessmentId/systems', wrap(async (req, res) => {
    const { rows: aRows } = await pool.query(
        'SELECT id FROM assessments WHERE id = $1 AND user_id = $2',
        [req.params.assessmentId, req.userId]
    );
    if (aRows.length === 0) return res.status(404).json({ error: 'Assessment not found.' });

    const { rows } = await pool.query(
        'SELECT * FROM systems WHERE assessment_id = $1 ORDER BY id',
        [req.params.assessmentId]
    );
    res.json(rows);
}));

// POST /api/assessments/:assessmentId/systems
router.post('/:assessmentId/systems', wrap(async (req, res) => {
    const { rows: aRows } = await pool.query(
        'SELECT id FROM assessments WHERE id = $1 AND user_id = $2',
        [req.params.assessmentId, req.userId]
    );
    if (aRows.length === 0) return res.status(404).json({ error: 'Assessment not found.' });

    const { rows: countRows } = await pool.query(
        'SELECT COUNT(*) AS c FROM systems WHERE assessment_id = $1',
        [req.params.assessmentId]
    );
    if (parseInt(countRows[0].c) >= MAX_SYSTEMS) {
        return res.status(400).json({ error: `Maximum of ${MAX_SYSTEMS} systems per assessment reached.` });
    }

    const { systemName, processName, description } = req.body;
    if (!systemName || !processName) {
        return res.status(400).json({ error: 'System name and process name are required.' });
    }

    const { rows } = await pool.query(`
        INSERT INTO systems (assessment_id, system_name, process_name, description)
        VALUES ($1, $2, $3, $4) RETURNING *
    `, [req.params.assessmentId, systemName, processName, description || null]);
    res.status(201).json(rows[0]);
}));

// PUT /api/assessments/:assessmentId/systems/:id
router.put('/:assessmentId/systems/:id', wrap(async (req, res) => {
    const { rows: aRows } = await pool.query(
        'SELECT id FROM assessments WHERE id = $1 AND user_id = $2',
        [req.params.assessmentId, req.userId]
    );
    if (aRows.length === 0) return res.status(404).json({ error: 'Assessment not found.' });

    const { rows: sRows } = await pool.query(
        'SELECT * FROM systems WHERE id = $1 AND assessment_id = $2',
        [req.params.id, req.params.assessmentId]
    );
    if (sRows.length === 0) return res.status(404).json({ error: 'System not found.' });

    const { systemName, processName, description, autonomyLevel, governanceLevel, economicExposure, operationalImpact } = req.body;

    const validateLevel = (val, name) => {
        if (val !== undefined && val !== null && (val < 0 || val > 4)) return `${name} must be between 0 and 4.`;
        return null;
    };
    const err =
        validateLevel(autonomyLevel,     'Autonomy level')    ||
        validateLevel(governanceLevel,   'Governance level')  ||
        validateLevel(economicExposure,  'Economic exposure') ||
        validateLevel(operationalImpact, 'Operational impact');
    if (err) return res.status(400).json({ error: err });

    const { rows } = await pool.query(`
        UPDATE systems SET
            system_name        = COALESCE($1, system_name),
            process_name       = COALESCE($2, process_name),
            description        = COALESCE($3, description),
            autonomy_level     = COALESCE($4, autonomy_level),
            governance_level   = COALESCE($5, governance_level),
            economic_exposure  = COALESCE($6, economic_exposure),
            operational_impact = COALESCE($7, operational_impact)
        WHERE id = $8 RETURNING *
    `, [
        systemName     || null,
        processName    || null,
        description    !== undefined ? description    : null,
        autonomyLevel     !== undefined ? autonomyLevel     : null,
        governanceLevel   !== undefined ? governanceLevel   : null,
        economicExposure  !== undefined ? economicExposure  : null,
        operationalImpact !== undefined ? operationalImpact : null,
        req.params.id,
    ]);
    res.json(rows[0]);
}));

// DELETE /api/assessments/:assessmentId/systems/:id
router.delete('/:assessmentId/systems/:id', wrap(async (req, res) => {
    const { rows: aRows } = await pool.query(
        'SELECT id FROM assessments WHERE id = $1 AND user_id = $2',
        [req.params.assessmentId, req.userId]
    );
    if (aRows.length === 0) return res.status(404).json({ error: 'Assessment not found.' });

    const { rows: sRows } = await pool.query(
        'SELECT id FROM systems WHERE id = $1 AND assessment_id = $2',
        [req.params.id, req.params.assessmentId]
    );
    if (sRows.length === 0) return res.status(404).json({ error: 'System not found.' });

    await pool.query('DELETE FROM systems WHERE id = $1', [req.params.id]);
    res.json({ message: 'System deleted.' });
}));

module.exports = router;
