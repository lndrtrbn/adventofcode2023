import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

type Position = {
  x: number;
  y: number;
};

const THEORETICAL_POS: Position[] = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

const NEUTRAL = ".";
const GEAR = "*";
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const NO_SYMBOL = [NEUTRAL, ...DIGITS];

// ==============
// === PART 1 ===
// ==============

// const rows = data.split("\r\n").map((r) => r.split(""));

// function nextToSymbol(positions: Position[]) {
//   for (const pos of positions) {
//     const allPos = THEORETICAL_POS.map((p) => ({
//       x: p.x + pos.x,
//       y: p.y + pos.y,
//     })).filter(
//       (p) => p.x >= 0 && p.y >= 0 && p.x < rows[0].length && p.y < rows.length
//     );
//     for (const p of allPos) {
//       if (!NO_SYMBOL.includes(rows[p.y][p.x])) {
//         return true;
//       }
//     }
//   }
//   return false;
// }

// let result = 0;
// rows.forEach((row, y) => {
//   let currentNumber = "";
//   let currentPos: Position[] = [];
//   function add() {
//     if (nextToSymbol(currentPos)) {
//       result += Number(currentNumber);
//     }
//     currentNumber = "";
//     currentPos = [];
//   }

//   row.forEach((char, x) => {
//     if (DIGITS.includes(char)) {
//       currentNumber += char;
//       currentPos.push({ x, y });
//     } else if (currentNumber.length > 0) {
//       add();
//     }
//     if (x === row.length - 1) {
//       add();
//     }
//   });
// });

// console.log(result);

// ==============
// === PART 2 ===
// ==============

const rows = data.split("\r\n").map((r) => r.split(""));

function posToString(pos: Position) {
  return `${pos.y}:${pos.x}`;
}

function gearPositions(positions: Position[]): string[] {
  const gearPositions: string[] = [];
  for (const pos of positions) {
    const allPos = THEORETICAL_POS.map((p) => ({
      x: p.x + pos.x,
      y: p.y + pos.y,
    })).filter(
      (p) => p.x >= 0 && p.y >= 0 && p.x < rows[0].length && p.y < rows.length
    );
    for (const p of allPos) {
      const pStr = posToString(p);
      if (rows[p.y][p.x] === GEAR && !gearPositions.includes(pStr)) {
        gearPositions.push(pStr);
      }
    }
  }
  return gearPositions;
}

let gears: { [key: string]: number[] } = {};
rows.forEach((row, y) => {
  let currentNumber = "";
  let currentPos: Position[] = [];
  function add() {
    const localGears = gearPositions(currentPos);
    localGears.forEach((g) => {
      if (!gears[g]) {
        gears[g] = [Number(currentNumber)];
      } else {
        gears[g] = [...gears[g], Number(currentNumber)];
      }
    });
    currentNumber = "";
    currentPos = [];
  }

  row.forEach((char, x) => {
    if (DIGITS.includes(char)) {
      currentNumber += char;
      currentPos.push({ x, y });
    } else if (currentNumber.length > 0) {
      add();
    }
    if (x === row.length - 1) {
      // check if something
      add();
    }
  });
});

const result = Object.values(gears)
  .filter((numbers) => numbers.length === 2)
  .map(([one, two]) => one * two)
  .reduce((prev, curr) => prev + curr, 0);

console.log(result);
