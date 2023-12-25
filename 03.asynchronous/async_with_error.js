import sqlite3 from "sqlite3";
import { runQuery, getAll, closeDb } from "./function_setting.js";

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
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
  try {
    await getAll(db, "SELECT reports_id FROM books");
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
  await runQuery(db, "DROP TABLE books");
  await closeDb(db);
}

main();
