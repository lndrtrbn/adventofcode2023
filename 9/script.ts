import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const rows = data.split("\r\n");

// ==============
// === PART 1 ===
// ==============

const initialHistory = rows.map((r) => r.split(" ").map(Number));

// const pouet = initialHistory
//   .map((history) => {
//     let finished = false;
//     let tmpHistory: number[] = [...history];
//     const values: number[] = [history[history.length - 1]];
//     const result: number[] = [0];
//     while (!finished) {
//       tmpHistory = tmpHistory.reduce((acc, val, i) => {
//         if (i === tmpHistory.length - 1) {
//           values.push(acc[acc.length - 1]);
//           return acc;
//         }
//         return [...acc, tmpHistory[i + 1] - val];
//       }, [] as number[]);
//       if (tmpHistory.every((v) => v === 0)) finished = true;
//     }
//     values.reverse().shift();
//     values.forEach((v, i) => {
//       result.push(result[i] + v);
//     });
//     return result[result.length - 1];
//   })
//   .reduce((a, c) => a + c, 0);

// console.log(pouet);

// ==============
// === PART 2 ===
// ==============

const pouet = initialHistory
  .map((history) => {
    let finished = false;
    let tmpHistory: number[] = [...history];
    const values: number[] = [history[0]];
    const result: number[] = [0];
    while (!finished) {
      tmpHistory = tmpHistory.reduce((acc, val, i) => {
        if (i === tmpHistory.length - 1) {
          values.push(acc[0]);
          return acc;
        }
        return [...acc, tmpHistory[i + 1] - val];
      }, [] as number[]);
      if (tmpHistory.every((v) => v === 0)) finished = true;
    }
    values.reverse().shift();
    values.forEach((v, i) => {
      result.push(v - result[i]);
    });
    return result[result.length - 1];
  })
  .reduce((a, c) => a + c, 0);

console.log(pouet);
