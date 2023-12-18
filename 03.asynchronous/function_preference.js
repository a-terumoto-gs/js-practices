export function run_query(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID });
      }
    });
  });
}


export function get_all(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, function (err, book) {
      if (err) {
        reject(err);
      } else {
        resolve(book);
      }
    });
  });
}


export function close_db(db) {
  return new Promise((resolve, reject) => {
    db.close(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
