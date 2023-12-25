import sqlite3 from "sqlite3";
import { runQuery, getAll, closeDb } from "./function_setting.js";

const db = new sqlite3.Database(":memory:");

function main() {
  runQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )

    .then(() => runQuery(db, "INSERT INTO books(title) VALUES(?)", ["SampleBook"]))

    .then((book) => {
      console.log(`id: ${book.lastID}`);
      return getAll(db, "SELECT * FROM books");
    })

    .then((books) => {
      console.log(`BookInfo`, books);
      return runQuery(db, "DROP TABLE books");
    })

    .then(() => {
      return closeDb(db);
    });
}

main();
