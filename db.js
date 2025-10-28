// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'searchCounts.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err);
    process.exit(1);
  } else {
    console.log('데이터베이스 연결 성공');
    db.run(`CREATE TABLE IF NOT EXISTS counts (
      term TEXT PRIMARY KEY,
      count INTEGER
    )`, (err) => {
      if (err) {
        console.error('테이블 생성 오류:', err);
      }
    });
  }
});

// Promise 래퍼 함수들
const dbAsync = {
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  },
  
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
};

// 기존 콜백 방식과의 호환성을 위해 원본 db도 export
module.exports = { db, dbAsync };
