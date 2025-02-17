import sqlite3 from "sqlite3";
import { runQuery, getAll, closeDb } from "./sqlite3-promise-adapter.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  await runQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  try {
    await runQuery(db, "INSERT INTO reports(title) VALUES(?)", [
      "SampleReport",
    ]);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      throw err;
    }
  }
  try {
    await getAll(db, "SELECT reports_id FROM books");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      throw err;
    }
  }
  await runQuery(db, "DROP TABLE books");
  await closeDb(db);
}

main();
