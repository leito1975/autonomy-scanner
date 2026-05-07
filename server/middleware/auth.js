const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'autonomy-scanner-v2-secret-key-change-in-prod';

function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    const queryToken = req.query.token;

    let token;
    if (header && header.startsWith('Bearer ')) {
        token = header.split(' ')[1];
    } else if (queryToken) {
        token = queryToken;
    } else {
        return res.status(401).json({ error: 'Authentication required.' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        req.userRole = payload.role || 'user';
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
}

function adminMiddleware(req, res, next) {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Admin access required.' });
    }
    next();
}

module.exports = { authMiddleware, adminMiddleware, JWT_SECRET };
