import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const rows = data.split("\r\n");

type Hand = {
  origin: string;
  value: string;
  bid: number;
};

function sort(handA: Hand, handB: Hand) {
  return handA.value.localeCompare(handB.value);
}

function transform(row: string): Hand {
  const [handStr, bidStr] = row.split(" ");
  const hand = handStr
    .split("")
    .map((c) => CARDS.indexOf(c as Card) + 100)
    .join("");
  return {
    origin: handStr,
    value: `${strength(handStr)}${hand}`,
    bid: Number(bidStr),
  };
}

// ==============
// === PART 1 ===
// ==============

// function strength(hand: string) {
//   const max = Math.max(
//     ...Object.values(
//       hand.split("").reduce((acc, c) => {
//         acc[c] = (acc[c] ?? 0) + 1;
//         return acc;
//       }, {} as { [key: string]: number })
//     )
//   );
//   const set = new Set(hand);
//   return max - set.size + 5;
// }

// const CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"] as const;
// type Card = (typeof CARDS)[number];

// console.log(
//   rows
//     .map(transform)
//     .sort(sort)
//     .reduce((acc, h, i) => acc + h.bid * (i + 1), 0)
// );

// ==============
// === PART 2 ===
// ==============

const CARDS = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"] as const;
type Card = (typeof CARDS)[number];

function strength(hand: string) {
  const noJ = hand.replaceAll("J", "");
  const nbJ = hand.replaceAll(/[^J]/g, "").length;
  const max = Math.max(
    ...[
      0,
      ...Object.values(
        noJ.split("").reduce((acc, c) => {
          acc[c] = (acc[c] ?? 0) + 1;
          return acc;
        }, {} as { [key: string]: number })
      ),
    ]
  );
  const set = new Set(noJ);
  return max + nbJ - (set.size || 1) + 5;
}

console.log(
  rows
    .map(transform)
    .sort(sort)
    .reduce((acc, h, i) => acc + h.bid * (i + 1), 0)
);
