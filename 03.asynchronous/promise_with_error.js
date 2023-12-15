import sqlite3 from "sqlite3";
import { run_query, get_all, close_db } from "./function_preference.js";

const db = new sqlite3.Database(":memory:");

function main() {
  run_query(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() =>
      run_query(db, "INSERT INTO book(title) VALUES(?)", ["SampleBook"]),
    )
    .catch((err) => {
      console.error(err.message);
    })

    .then(() => get_all(db, "SELECT books_id FROM books"))
    .catch((err) => {
      console.error(err.message);
    })

    .then(() => {
      run_query(db, "DROP TABLE books");
    })

    .then(() => {
      close_db(db);
    });
}

main();
