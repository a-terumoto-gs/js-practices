import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function main() {
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run(
        "INSERT INTO reports(title) VALUES(?)",
        ["SampleReport"],
        (err) => {
          if (err) {
            console.error(err.message);
          }
          db.all("SELECT report_id FROM books", (err) => {
            if (err) {
              console.error(err.message);
            }
            db.run("DROP TABLE books", () => {
              db.close();
            });
          });
        },
      );
    },
  );
}

main();
