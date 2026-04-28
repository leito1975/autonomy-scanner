const express = require('express');
const { getDb } = require('../db');
const { authMiddleware } = require('../middleware/auth');
const { calculateScores } = require('../utils/scoring');

const router = express.Router();
router.use(authMiddleware);

// GET /api/assessments — list user's assessments
router.get('/', (req, res) => {
    const db = getDb();
    const assessments = db.prepare(`
        SELECT a.*,
            (SELECT COUNT(*) FROM systems s WHERE s.assessment_id = a.id) as system_count,
            (SELECT COUNT(*) FROM systems s WHERE s.assessment_id = a.id AND s.autonomy_level IS NOT NULL AND s.governance_level IS NOT NULL) as evaluated_count
        FROM assessments a
        WHERE a.user_id = ?
        ORDER BY a.created_at DESC
    `).all(req.userId);

    res.json(assessments);
});

// POST /api/assessments — create assessment
router.post('/', (req, res) => {
    const { organizationName, assessorName, assessmentDate, notes } = req.body;

    if (!organizationName || !assessorName || !assessmentDate) {
        return res.status(400).json({ error: 'Organization name, assessor name, and date are required.' });
    }

    const db = getDb();
    const result = db.prepare(`
        INSERT INTO assessments (user_id, organization_name, assessor_name, assessment_date, notes)
        VALUES (?, ?, ?, ?, ?)
    `).run(req.userId, organizationName, assessorName, assessmentDate, notes || null);

    const assessment = db.prepare('SELECT * FROM assessments WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(assessment);
});

// GET /api/assessments/:id — get assessment with systems and scores
router.get('/:id', (req, res) => {
    const db = getDb();
    const assessment = db.prepare('SELECT * FROM assessments WHERE id = ? AND user_id = ?').get(
        req.params.id,
        req.userId
    );

    if (!assessment) {
        return res.status(404).json({ error: 'Assessment not found.' });
    }

    const systems = db.prepare('SELECT * FROM systems WHERE assessment_id = ? ORDER BY id').all(assessment.id);
    const scores = calculateScores(systems);

    // Don't send branding blob in the main response
    const { branding_image, ...assessmentData } = assessment;

    res.json({
        ...assessmentData,
        hasBranding: !!branding_image,
        systems,
        scores,
    });
});

// DELETE /api/assessments/:id
router.delete('/:id', (req, res) => {
    const db = getDb();
    const assessment = db.prepare('SELECT id FROM assessments WHERE id = ? AND user_id = ?').get(
        req.params.id,
        req.userId
    );

    if (!assessment) {
        return res.status(404).json({ error: 'Assessment not found.' });
    }

    db.prepare('DELETE FROM assessments WHERE id = ?').run(req.params.id);
    res.json({ message: 'Assessment deleted.' });
});

module.exports = router;
