import sqlite3 from "sqlite3";
import { run_query, get_all, close_db } from "./function_preference.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  await run_query(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const book = await run_query(db, "INSERT INTO books(title) VALUES(?)", [
    "SampleBook",
  ]);
  console.log(`record_id: ${book.lastID}`);
  const books = await get_all(db, "SELECT * FROM books");
  console.log(`book_info`);
  console.log(books);
  await run_query(db, "DROP TABLE books");
  await close_db(db);
}

main();
