import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

function main() {
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run("INSERT INTO books(title) VALUES(?)", ["SampleBook"],
      function () {
        console.log(`record_id: ${this.lastID}`);
        db.all("SELECT * FROM books", (_err, books) => {
          console.log(`book_info`)
          console.log(books);
          db.run("DROP TABLE books");
          db.close();
        });
      });
    },
  );
}

main();
