import sqlite3 from "sqlite3";
import { run_query, get_all, close_db } from "./function_preference.js";

const db = new sqlite3.Database(':memory:');

async function main() {
  await run_query(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  try {
    await run_query(db, "INSERT INTO book(title) VALUES(?)", ["Test"]);
  } catch (e) {
    if (e instanceof Error && e.errno === 1 && e.code === "SQLITE_ERROR") {
      console.log(e.message);
    }
  }
  try {
    await get_all(db, "SELECT books_id FROM books");
  } catch (e) {
    if (e instanceof Error && e.errno === 1 && e.code === "SQLITE_ERROR") {
      console.log(e.message);
    }
  }
  await run_query(db, "DROP TABLE books");
  await close_db(db);
}

main();
