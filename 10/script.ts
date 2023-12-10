import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.resolve(__dirname, "test.txt"), "utf-8");

const SYMBOLS = ["|", "-", "L", "J", "7", "F", ".", "S"] as const;
type Symbol = (typeof SYMBOLS)[number];

type Side = "north" | "south" | "east" | "west";
type ConnectedSides = {
  [key in Symbol]: Side[];
};

type Position = readonly [number, number];

const cells = data.split("\r\n").map((row) => row.split("") as Symbol[]);
const start: [number, number] = cells.reduce(
  (acc, row, y) => {
    const x = row.indexOf("S");
    return x > -1 ? [y, x] : acc;
  },
  [0, 0]
);

const CONNECTIONS: ConnectedSides = {
  "|": ["north", "south"],
  "-": ["west", "east"],
  L: ["north", "east"],
  J: ["north", "west"],
  "7": ["west", "south"],
  F: ["east", "south"],
  ".": [],
  S: [],
};

const getCell = ([y, x]: Position) => cells[y][x];

const isConnected = (symbol: Symbol, side: Side) => CONNECTIONS[symbol].includes(side);

const checkY = (y: number) => y >= 0 && y < cells.length;
const checkX = (x: number) => x >= 0 && x < cells[0].length;

const north = ([y, x]: Position) => checkY(y - 1) && checkX(x) && ([y - 1, x] as const);
const south = ([y, x]: Position) => checkY(y + 1) && checkX(x) && ([y + 1, x] as const);
const west = ([y, x]: Position) => checkY(y) && checkX(x - 1) && ([y, x - 1] as const);
const east = ([y, x]: Position) => checkY(y) && checkX(x + 1) && ([y, x + 1] as const);

const startNorth = north(start);
const startSouth = south(start);
const startWest = west(start);
const startEast = east(start);
const pipeTrack: Position[] = [];
let side: Side;
if (startNorth && isConnected(getCell(startNorth), "south")) {
  console.log("north");
}
if (isConnected(getCell(start), "south")) {
  console.log("south");
}
if (isConnected(getCell(start), "west")) {
  console.log("west");
}
if (isConnected(getCell(start), "east")) {
  console.log("east");
}

const pipes = data
  .replaceAll("|", "│")
  .replaceAll("-", "─")
  .replaceAll("L", "└")
  .replaceAll("J", "┘")
  .replaceAll("7", "┐")
  .replaceAll("F", "┌")
  .replaceAll(".", " ");

// ==============
// === PART 1 ===
// ==============

// ==============
// === PART 2 ===
// ==============
