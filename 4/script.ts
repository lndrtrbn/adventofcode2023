import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const rows = data.split("\r\n");

function intersect<T>(one: T[], two: T[]): Set<T> {
  return new Set(one.filter((value) => two.includes(value)));
}

type Card = [number[], number[]];

function parseCard(card: string): Card {
  const [winningStr, elfStr] = card.split(":")[1].split("|");
  const winningNumbers = winningStr.trim().split(/\s+/).map(Number);
  const elfNumbers = elfStr.trim().split(/\s+/).map(Number);
  return [winningNumbers, elfNumbers];
}

// ==============
// === PART 1 ===
// ==============

// function count(index: number) {
//   let result = 0;
//   for (let i = 0; i < index; i++) {
//     result = result === 0 ? 1 : result * 2;
//   }
//   return result;
// }

// const result = rows
//   .map((row) => intersect(...parseCard(row)).size)
//   .map(count)
//   .reduce((prev, curr) => prev + curr, 0);

// console.log(result);

// ==============
// === PART 2 ===
// ==============

type CardCount = {
  count: number;
  matches: number;
};

const cards: CardCount[] = rows.map((row) => ({
  matches: intersect(...parseCard(row)).size,
  count: 1,
}));

for (let i = 0; i < cards.length; i++) {
  const { matches, count } = cards[i];
  for (let j = 0; j < matches; j++) {
    const copyIndex = i + j + 1;
    const copyCard = cards[copyIndex];
    if (copyCard) {
      copyCard.count += count;
    }
  }
}

console.log(cards.reduce((prev, curr) => prev + curr.count, 0));
