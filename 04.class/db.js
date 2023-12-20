import sqlite3 from 'sqlite3';

class DB {
  constructor() {
    this.db = new sqlite3.Database('memos.db');
    this.initDatabase();
  }

  initDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS memos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL
      );
    `;

    this.db.run(createTableQuery);
  }

  addMemo(content) {
    this.db.run('INSERT INTO memos (content) VALUES (?)', [content]);
  }

  listMemos() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM memos', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getMemo(id) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM memos WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  deleteMemo(id) {
    this.db.run('DELETE FROM memos WHERE id = ?', [id]);
  }
}

export default DB;
