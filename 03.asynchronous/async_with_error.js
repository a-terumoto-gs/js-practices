import sqlite3 from "sqlite3";
import { run_query, get_all, close_db } from "./function_preference.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  await run_query(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  try {
    await run_query(db, "INSERT INTO book(title) VALUES(?)", ["SampleBook"]);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
  try {
    await get_all(db, "SELECT books_id FROM books");
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
  await run_query(db, "DROP TABLE books");
  close_db(db);
}

main();
