import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

function parseGame(strGame: string) {
  const [, ID, strDraws] = /Game (\d+): (.*)/.exec(strGame) as unknown as [
    string,
    string,
    string
  ];
  return {
    ID: Number(ID),
    draws: strDraws
      .split("; ")
      .map((draws) => draws.split(", ").map((draw) => draw.split(" ")))
      .map((draws) => {
        return {
          r: Number(draws.find((draw) => draw[1] === "red")?.[0] ?? 0),
          g: Number(draws.find((draw) => draw[1] === "green")?.[0] ?? 0),
          b: Number(draws.find((draw) => draw[1] === "blue")?.[0] ?? 0),
        };
      }),
  };
}

// ==============
// === PART 1 ===
// ==============

// const max = {
//   r: 12,
//   g: 13,
//   b: 14,
// };

// let result = 0;
// const games = data.split("\r\n");
// for (const row of games) {
//   let valid = true;
//   const { ID, draws } = parseGame(row);
//   draws.forEach((draw) => {
//     if (draw.r > max.r || draw.g > max.g || draw.b > max.b) {
//       valid = false;
//     }
//   });
//   if (valid) {
//     result += ID;
//   }
// }
// console.log(result);

// ==============
// === PART 2 ===
// ==============

let result = 0;
const games = data.split("\r\n");
for (const row of games) {
  const min = {
    r: 0,
    g: 0,
    b: 0,
  };
  const { draws } = parseGame(row);
  draws.forEach((draw) => {
    min.r = draw.r > min.r ? draw.r : min.r;
    min.g = draw.g > min.g ? draw.g : min.g;
    min.b = draw.b > min.b ? draw.b : min.b;
  });
  result += min.r * min.g * min.b;
}
console.log(result);
