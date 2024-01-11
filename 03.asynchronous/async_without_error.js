import sqlite3 from "sqlite3";
import { runQuery, getAll, closeDb } from "./db_operation_execution.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  await runQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const insertResult = await runQuery(db, "INSERT INTO books(title) VALUES(?)", [
    "SampleBook",
  ]);
  console.log(`id: ${insertResult.lastID}`);
  const books = await getAll(db, "SELECT * FROM books");
  console.log(`books ${JSON.stringify(books)}`);
  await runQuery(db, "DROP TABLE books");
  await closeDb(db);
}

main();
