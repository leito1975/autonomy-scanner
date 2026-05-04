const express = require('express');
const { getDb } = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

const MAX_SYSTEMS = 10;

// GET /api/assessments/:assessmentId/systems
router.get('/:assessmentId/systems', (req, res) => {
    const db = getDb();

    // Verify assessment belongs to user
    const assessment = db.prepare('SELECT id FROM assessments WHERE id = ? AND user_id = ?').get(
        req.params.assessmentId,
        req.userId
    );
    if (!assessment) {
        return res.status(404).json({ error: 'Assessment not found.' });
    }

    const systems = db.prepare('SELECT * FROM systems WHERE assessment_id = ? ORDER BY id').all(
        req.params.assessmentId
    );
    res.json(systems);
});

// POST /api/assessments/:assessmentId/systems — add system
router.post('/:assessmentId/systems', (req, res) => {
    const db = getDb();

    const assessment = db.prepare('SELECT id FROM assessments WHERE id = ? AND user_id = ?').get(
        req.params.assessmentId,
        req.userId
    );
    if (!assessment) {
        return res.status(404).json({ error: 'Assessment not found.' });
    }

    // Enforce max 10 systems
    const count = db.prepare('SELECT COUNT(*) as c FROM systems WHERE assessment_id = ?').get(
        req.params.assessmentId
    ).c;
    if (count >= MAX_SYSTEMS) {
        return res.status(400).json({ error: `Maximum of ${MAX_SYSTEMS} systems per assessment reached.` });
    }

    const { systemName, processName, description } = req.body;
    if (!systemName || !processName) {
        return res.status(400).json({ error: 'System name and process name are required.' });
    }

    const result = db.prepare(`
        INSERT INTO systems (assessment_id, system_name, process_name, description)
        VALUES (?, ?, ?, ?)
    `).run(req.params.assessmentId, systemName, processName, description || null);

    const system = db.prepare('SELECT * FROM systems WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(system);
});

// PUT /api/assessments/:assessmentId/systems/:id — update system (including evaluation)
router.put('/:assessmentId/systems/:id', (req, res) => {
    const db = getDb();

    const assessment = db.prepare('SELECT id FROM assessments WHERE id = ? AND user_id = ?').get(
        req.params.assessmentId,
        req.userId
    );
    if (!assessment) {
        return res.status(404).json({ error: 'Assessment not found.' });
    }

    const system = db.prepare('SELECT * FROM systems WHERE id = ? AND assessment_id = ?').get(
        req.params.id,
        req.params.assessmentId
    );
    if (!system) {
        return res.status(404).json({ error: 'System not found.' });
    }

    const { systemName, processName, description, autonomyLevel, governanceLevel, economicExposure, operationalImpact } = req.body;

    // Validate all dimension levels (0–4)
    const validateLevel = (val, name) => {
        if (val !== undefined && (val < 0 || val > 4)) {
            return `${name} must be between 0 and 4.`;
        }
        return null;
    };
    const err =
        validateLevel(autonomyLevel,    'Autonomy level')    ||
        validateLevel(governanceLevel,  'Governance level')  ||
        validateLevel(economicExposure, 'Economic exposure') ||
        validateLevel(operationalImpact,'Operational impact');
    if (err) return res.status(400).json({ error: err });

    db.prepare(`
        UPDATE systems SET
            system_name       = COALESCE(?, system_name),
            process_name      = COALESCE(?, process_name),
            description       = COALESCE(?, description),
            autonomy_level    = COALESCE(?, autonomy_level),
            governance_level  = COALESCE(?, governance_level),
            economic_exposure = COALESCE(?, economic_exposure),
            operational_impact= COALESCE(?, operational_impact)
        WHERE id = ?
    `).run(
        systemName    || null,
        processName   || null,
        description   !== undefined ? description   : null,
        autonomyLevel    !== undefined ? autonomyLevel    : null,
        governanceLevel  !== undefined ? governanceLevel  : null,
        economicExposure !== undefined ? economicExposure : null,
        operationalImpact!== undefined ? operationalImpact: null,
        req.params.id
    );

    const updated = db.prepare('SELECT * FROM systems WHERE id = ?').get(req.params.id);
    res.json(updated);
});

// DELETE /api/assessments/:assessmentId/systems/:id
router.delete('/:assessmentId/systems/:id', (req, res) => {
    const db = getDb();

    const assessment = db.prepare('SELECT id FROM assessments WHERE id = ? AND user_id = ?').get(
        req.params.assessmentId,
        req.userId
    );
    if (!assessment) {
        return res.status(404).json({ error: 'Assessment not found.' });
    }

    const system = db.prepare('SELECT id FROM systems WHERE id = ? AND assessment_id = ?').get(
        req.params.id,
        req.params.assessmentId
    );
    if (!system) {
        return res.status(404).json({ error: 'System not found.' });
    }

    db.prepare('DELETE FROM systems WHERE id = ?').run(req.params.id);
    res.json({ message: 'System deleted.' });
});

module.exports = router;
