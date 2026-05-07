const express = require('express');
const cors = require('cors');
const { initSchema } = require('./db');
const authRouter = require('./routes/auth');
const assessmentsRouter = require('./routes/assessments');
const systemsRouter = require('./routes/systems');
const reportsRouter = require('./routes/reports');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/assessments', assessmentsRouter);
app.use('/api/assessments', systemsRouter);
app.use('/api/assessments', reportsRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', version: '2.0.0' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error.' });
});

initSchema()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Autonomy Scanner v2 API running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    });
