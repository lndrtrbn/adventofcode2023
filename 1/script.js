import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

// ==============
// === PART 1 ===
// ==============

// const numbers = data.split("\r\n").map(l => l.split("").map(Number).filter(Number.isInteger));
// const total = numbers.reduce((prev, curr) => prev + Number(`${curr[0]}${curr[curr.length - 1]}`), 0)
// console.log(total)

// ==============
// === PART 2 ===
// ==============

function findNumber(line, fromEnd = false) {
  const possibilities = [
    "0",
    "zero",
    "1",
    "one",
    "2",
    "two",
    "3",
    "three",
    "4",
    "four",
    "5",
    "five",
    "6",
    "six",
    "7",
    "seven",
    "8",
    "eight",
    "9",
    "nine",
  ];
  let index;
  for (const possibility of possibilities) {
    if (
      (!fromEnd && line.startsWith(possibility)) ||
      (fromEnd && line.endsWith(possibility))
    ) {
      index = possibilities.indexOf(possibility);
      break;
    }
  }

  if (index !== undefined) {
    if (index % 2 !== 0) {
      index = index - 1;
    }
    return Number(possibilities[index]);
  } else {
    return findNumber(fromEnd ? line.slice(0, -1) : line.slice(1), fromEnd);
  }
}

const numbers = data
  .split("\r\n")
  .map((row) => [findNumber(row), findNumber(row, true)]);
const total = numbers.reduce(
  (prev, curr) => prev + Number(`${curr[0]}${curr[curr.length - 1]}`),
  0
);
console.log(total);
