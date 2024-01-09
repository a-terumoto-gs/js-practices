import sqlite3 from "sqlite3";
import { runQuery, getAll, closeDb } from "./common_operation_definition.js";

const db = new sqlite3.Database(":memory:");

function main() {
  runQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() =>
      runQuery(db, "INSERT INTO books(title) VALUES(?)", ["SampleBook"]),
    )
    .then((bookID) => {
      console.log(`id: ${bookID.lastID}`);
      return getAll(db, "SELECT * FROM books");
    })
    .then((books) => {
      console.log(`books ${JSON.stringify(books)}`);
      return runQuery(db, "DROP TABLE books");
    })
    .then(() => closeDb(db));
}

main();
