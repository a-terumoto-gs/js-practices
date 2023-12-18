import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function main() {
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    function () {
      db.run(
        "INSERT INTO reports(title) VALUES(?)",
        ["SampleReport"],
        function (err) {
          if (err) {
            console.error(err.message);
          }
          db.all("SELECT report_id FROM books", function (err) {
            if (err) {
              console.error(err.message);
            }
            db.run("DROP TABLE books", function () {
              db.close();
            });
          });
        },
      );
    },
  );
}


main();
