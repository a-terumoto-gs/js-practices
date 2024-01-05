import sqlite3 from "sqlite3";
import { runQuery, getAll, closeDb } from "./common_operation_definition.js";

const db = new sqlite3.Database(":memory:");

function main() {
  runQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() =>
      runQuery(db, "INSERT INTO reports(title) VALUES(?)", ["SampleReport"]),
    )
    .catch((err) => {
      console.error(err.message);
      return getAll(db, "SELECT report_id FROM books");
    })
    .catch((err) => {
      console.error(err.message);
      return runQuery(db, "DROP TABLE books");
    })
    .then(() => closeDb(db));
}

main();
