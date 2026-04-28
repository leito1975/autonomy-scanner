const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'scanner.db');

let db;

function getDb() {
    if (!db) {
        db = new Database(DB_PATH);
        db.pragma('journal_mode = WAL');
        db.pragma('foreign_keys = ON');
        initSchema();
    }
    return db;
}

function initSchema() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS assessments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            organization_name TEXT NOT NULL,
            assessor_name TEXT NOT NULL,
            assessment_date TEXT NOT NULL,
            notes TEXT,
            branding_image BLOB,
            branding_mime TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS systems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            assessment_id INTEGER NOT NULL,
            system_name TEXT NOT NULL,
            process_name TEXT NOT NULL,
            description TEXT,
            autonomy_level INTEGER DEFAULT NULL,
            governance_level INTEGER DEFAULT NULL,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE
        );
    `);
}

module.exports = { getDb };
