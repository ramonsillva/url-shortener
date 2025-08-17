const path = require('path');
const fs = require('fs');

if (process.env.DATABASE_URL) {
    // Postgres via pg (usado quando você apontar DATABASE_URL)
    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    (async () => {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS urls (
                    id SERIAL PRIMARY KEY,
                    shortcode TEXT UNIQUE NOT NULL,
                    original_url TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT now()
                );
            `);
            console.log('Postgres: urls table ensured');
        } catch (err) {
            console.error('PG init error', err);
        }
    })();

    module.exports = {
        type: 'pg',
        query: (text, params) => pool.query(text, params),
        pool
    };
} else {
    // SQLite fallback
    const sqlite3 = require('sqlite3').verbose();
    const dbPath = path.resolve(__dirname, '../../data/urls.db');
    const dir = path.dirname(dbPath);

    // garante que a pasta exista
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log('Created directory:', dir);
    }

    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) console.error('SQLite open error', err);
        else console.log('SQLite DB opened at', dbPath);
    });

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            shortcode TEXT UNIQUE NOT NULL,
            original_url TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`);
    });

    const run = (sql, params = []) => new Promise((res, rej) => {
        db.run(sql, params, function (err) { if (err) rej(err); else res(this); });
    });
    const get = (sql, params = []) => new Promise((res, rej) => {
        db.get(sql, params, (err, row) => err ? rej(err) : res(row));
    });
    const all = (sql, params = []) => new Promise((res, rej) => {
        db.all(sql, params, (err, rows) => err ? rej(err) : res(rows));
    });

    module.exports = { type: 'sqlite', db, run, get, all, path: dbPath };
}