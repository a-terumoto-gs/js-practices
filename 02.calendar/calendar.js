#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const year = argv.y || today.getFullYear();
const month = argv.m || today.getMonth() + 1;

const first_day = new Date(year, month - 1, 1);
const last_day = new Date(year, month, 0);

const formattedTop = `      ${month}月 ${year}`;

console.log(formattedTop);

const weekday = ["日", "月", "火", "水", "木", "金", "土"];
const day_of_week = weekday.join(" ");

console.log(day_of_week);

const first_day_wday = first_day.getDay();
process.stdout.write("   ".repeat(first_day_wday));

let wday = first_day_wday;

for (let current_date = 1; current_date <= last_day.getDate(); current_date++) {
  process.stdout.write(current_date.toString().padStart(2, " ") + " ");
  wday++;

  if (wday % 7 === 0) {
    console.log();
  }
}

console.log();
