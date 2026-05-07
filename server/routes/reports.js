const express = require('express');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const { pool } = require('../db');
const { authMiddleware } = require('../middleware/auth');
const { calculateScores, AUTONOMY_LABELS, GOVERNANCE_LABELS } = require('../utils/scoring');

const router = express.Router();
router.use(authMiddleware);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files are allowed.'));
    },
});

const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// POST /api/assessments/:id/branding
router.post('/:id/branding', upload.single('branding'), wrap(async (req, res) => {
    const { rows } = await pool.query(
        'SELECT id FROM assessments WHERE id = $1 AND user_id = $2',
        [req.params.id, req.userId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Assessment not found.' });
    if (!req.file) return res.status(400).json({ error: 'No image file provided.' });

    await pool.query(
        'UPDATE assessments SET branding_image = $1, branding_mime = $2 WHERE id = $3',
        [req.file.buffer, req.file.mimetype, req.params.id]
    );
    res.json({ message: 'Branding image uploaded successfully.' });
}));

// DELETE /api/assessments/:id/branding
router.delete('/:id/branding', wrap(async (req, res) => {
    const { rows } = await pool.query(
        'SELECT id FROM assessments WHERE id = $1 AND user_id = $2',
        [req.params.id, req.userId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Assessment not found.' });

    await pool.query(
        'UPDATE assessments SET branding_image = NULL, branding_mime = NULL WHERE id = $1',
        [req.params.id]
    );
    res.json({ message: 'Branding image removed.' });
}));

// GET /api/assessments/:id/report
router.get('/:id/report', wrap(async (req, res) => {
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

    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
        'Content-Disposition',
        `attachment; filename="AGOM-Report-${assessment.organization_name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf"`
    );

    doc.pipe(res);

    // ─── Branding Header ───
    if (assessment.branding_image) {
        try {
            doc.image(assessment.branding_image, 50, 30, { width: 495, height: 80, fit: [495, 80], align: 'center' });
            doc.moveDown(4);
        } catch (_) {}
    }

    // ─── Title ───
    doc.fontSize(24).fillColor('#1a1a2e').text('AGOM Assessment Report', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#666').text('Autonomous Governance & Oversight Model', { align: 'center' });
    doc.moveDown(1.5);

    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#e0e0e0').stroke();
    doc.moveDown(1);

    // ─── Organization Info ───
    doc.fontSize(12).fillColor('#333');
    doc.text('Organization: ', { continued: true }).font('Helvetica-Bold').text(assessment.organization_name);
    doc.font('Helvetica');
    doc.text('Assessor: ', { continued: true }).font('Helvetica-Bold').text(assessment.assessor_name);
    doc.font('Helvetica');
    doc.text('Date: ', { continued: true }).font('Helvetica-Bold').text(assessment.assessment_date);
    doc.font('Helvetica');

    if (assessment.notes) {
        doc.moveDown(0.5);
        doc.fontSize(10).fillColor('#666').text(`Notes: ${assessment.notes}`);
    }

    doc.moveDown(1.5);

    // ─── Scores ───
    doc.fontSize(16).fillColor('#1a1a2e').text('Assessment Scores');
    doc.moveDown(0.5);

    const scoreBoxY = doc.y;
    const boxWidth = 120;
    const boxHeight = 60;
    const boxGap = 8;
    const startX = 50;

    const scoreItems = [
        { label: 'Autonomy Score',  value: scores.autonomyScore.toFixed(2),   color: '#4f46e5' },
        { label: 'Governance Score', value: scores.governanceScore.toFixed(2), color: '#0891b2' },
        { label: 'AGI Index',        value: scores.agi.toFixed(2),             color: '#7c3aed' },
        { label: 'Governance Gap',   value: scores.governanceGap.toFixed(2),   color: scores.governanceGap > 0 ? '#dc2626' : '#16a34a' },
    ];

    scoreItems.forEach((item, i) => {
        const x = startX + i * (boxWidth + boxGap);
        doc.roundedRect(x, scoreBoxY, boxWidth, boxHeight, 4).fillAndStroke('#f8f9fa', '#e5e7eb');
        doc.fontSize(18).fillColor(item.color).text(item.value, x, scoreBoxY + 10, { width: boxWidth, align: 'center' });
        doc.fontSize(7).fillColor('#666').text(item.label, x, scoreBoxY + 35, { width: boxWidth, align: 'center' });
    });

    doc.y = scoreBoxY + boxHeight + 20;
    doc.moveDown(1);

    // ─── Systems Table ───
    doc.fontSize(16).fillColor('#1a1a2e').text('Systems Evaluated');
    doc.moveDown(0.5);

    const tableTop = doc.y;
    const colWidths = [30, 150, 120, 100, 100];
    const headers = ['#', 'System', 'Process', 'Autonomy', 'Governance'];

    doc.rect(50, tableTop, 495, 22).fill('#1a1a2e');
    let xPos = 55;
    headers.forEach((header, i) => {
        doc.fontSize(9).fillColor('#fff').text(header, xPos, tableTop + 6, { width: colWidths[i] });
        xPos += colWidths[i];
    });

    let rowY = tableTop + 22;
    systems.forEach((sys, idx) => {
        if (rowY > 720) { doc.addPage(); rowY = 50; }

        doc.rect(50, rowY, 495, 20).fill(idx % 2 === 0 ? '#ffffff' : '#f8f9fa');

        xPos = 55;
        const rowData = [
            String(idx + 1),
            sys.system_name,
            sys.process_name,
            sys.autonomy_level !== null ? `${sys.autonomy_level} — ${AUTONOMY_LABELS[sys.autonomy_level]}` : 'Not evaluated',
            sys.governance_level !== null ? `${sys.governance_level} — ${GOVERNANCE_LABELS[sys.governance_level]}` : 'Not evaluated',
        ];

        rowData.forEach((text, i) => {
            doc.fontSize(8).fillColor('#333').text(text, xPos, rowY + 5, { width: colWidths[i], lineBreak: false });
            xPos += colWidths[i];
        });

        rowY += 20;
    });

    if (systems.length === 0) {
        doc.moveDown(0.5);
        doc.fontSize(10).fillColor('#999').text('No systems have been registered for this assessment.');
    }

    // ─── Footer ───
    doc.y = rowY + 30;
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#e0e0e0').stroke();
    doc.moveDown(0.5);
    doc.fontSize(8).fillColor('#999').text(
        `Generated by AGOM AutonomyScanner on ${new Date().toLocaleDateString()}`,
        { align: 'center' }
    );

    doc.end();
}));

module.exports = router;
