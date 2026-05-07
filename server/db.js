const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function initSchema() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT,
            role TEXT NOT NULL DEFAULT 'user',
            is_active BOOLEAN NOT NULL DEFAULT true,
            invite_token TEXT,
            invite_token_expires_at TIMESTAMPTZ,
            created_at TIMESTAMPTZ DEFAULT NOW()
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS assessments (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            organization_name TEXT NOT NULL,
            assessor_name TEXT NOT NULL,
            assessment_date TEXT NOT NULL,
            notes TEXT,
            branding_image BYTEA,
            branding_mime TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW()
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS systems (
            id SERIAL PRIMARY KEY,
            assessment_id INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
            system_name TEXT NOT NULL,
            process_name TEXT NOT NULL,
            description TEXT,
            autonomy_level INTEGER DEFAULT NULL,
            governance_level INTEGER DEFAULT NULL,
            economic_exposure INTEGER DEFAULT NULL,
            operational_impact INTEGER DEFAULT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
        )
    `);

    // Migrations: add new columns to users if they don't exist
    const migrations = [
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user'`,
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true`,
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS invite_token TEXT`,
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS invite_token_expires_at TIMESTAMPTZ`,
        `ALTER TABLE systems ADD COLUMN IF NOT EXISTS economic_exposure INTEGER DEFAULT NULL`,
        `ALTER TABLE systems ADD COLUMN IF NOT EXISTS operational_impact INTEGER DEFAULT NULL`,
    ];
    for (const sql of migrations) {
        await pool.query(sql).catch(() => {});
    }
}

module.exports = { pool, initSchema };
