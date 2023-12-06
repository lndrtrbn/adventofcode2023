import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const rows = data.split("\r\n");

// ==============
// === PART 1 ===
// ==============`

// const times = rows[0].split(":")[1].trim().split(/\s+/).map(Number);
// const distances = rows[1].split(":")[1].trim().split(/\s+/).map(Number);

// const margin = times.reduce((prev, time, i) => {
//   let score = 0;
//   for (let j = 1; j <= time; j++) {
//     if (j * (time - j) > distances[i]) {
//       score++;
//     }
//   }
//   return prev * score;
// }, 1);

// console.log(margin);

// ==============
// === PART 2 ===
// ==============

const time = Number(rows[0].split(":")[1].trim().replace(/\s+/g, ""));
const distance = Number(rows[1].split(":")[1].trim().replace(/\s+/g, ""));

let score = 0;
for (let j = 1; j <= time; j++) {
  if (j * (time - j) > distance) {
    score++;
  }
}

console.log(score);
