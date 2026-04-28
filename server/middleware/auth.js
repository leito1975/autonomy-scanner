const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'autonomy-scanner-v2-secret-key-change-in-prod';

function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required.' });
    }

    const token = header.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
}

module.exports = { authMiddleware, JWT_SECRET };
