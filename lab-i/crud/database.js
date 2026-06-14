const Database = require('better-sqlite3');

const db = new Database('auto.db');

db.exec(
`CREATE TABLE IF NOT EXISTS auto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    year TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT);`

);

module.exports = db;