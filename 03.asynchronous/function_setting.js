export function runQuery(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function getAll(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, book) => {
      if (err) { 
        reject(err);
      } else {
        resolve(book);
      }
    });
  });
}

export function closeDb(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
