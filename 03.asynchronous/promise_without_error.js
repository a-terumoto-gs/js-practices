import sqlite3 from "sqlite3";
import { run_query, get_all, close_db } from "./function_preference.js";

const db = new sqlite3.Database(":memory:");

function main() {
  run_query(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => {
      return run_query(db, "INSERT INTO books(title) VALUES(?)", [
        "SampleBook",
      ]);
    })

    .then((book) => {
      console.log(`record_id: ${book.lastID}`);
      console.log("book_info");
      return get_all(db, "SELECT * FROM books");
    })

    .then((books) => {
      console.log(books);
      return run_query(db, "DROP TABLE books");
    })

    .then(() => {
      return close_db(db);
    });
}

main();
