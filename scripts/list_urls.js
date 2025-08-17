const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../data/urls.db');

if (!fs.existsSync(dbPath)) {
  console.error('Database not found:', dbPath);
  process.exit(1);
}

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Failed to open DB:', err.message);
    process.exit(1);
  }
});

const limit = parseInt(process.argv[2], 10) || 100;

db.all(`SELECT id, shortcode, original_url, created_at FROM urls ORDER BY id DESC LIMIT ?`, [limit], (err, rows) => {
  if (err) {
    console.error('Query error:', err.message);
    db.close();
    process.exit(1);
  }

  if (!rows || rows.length === 0) {
    console.log('No rows found in', dbPath);
  } else {
    console.table(rows.map(r => ({
      id: r.id,
      code: r.shortcode,
      url: r.original_url,
      created_at: r.created_at
    })));
  }

  db.close();
});