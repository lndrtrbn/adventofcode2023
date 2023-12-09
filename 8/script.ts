import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const rows = data.split("\r\n");

type Node = {
  label: string;
  L: string;
  R: string;
};

// ==============
// === PART 1 ===
// ==============

function init() {
  const template = rows[0].split("") as ("L" | "R")[];
  const nodes: Node[] = rows.slice(2).reduce((currNodes, nodeStr, i) => {
    const [label, , left, right] = nodeStr.split(" ");
    const L = left.slice(1, -1);
    const R = right.slice(0, -1);
    return [...currNodes, { label, L, R }];
  }, [] as Node[]);
  return [template, nodes] as const;
}

const [template, nodes] = init();

function moveOn(): number {
  let count = 0;
  let node: Node | undefined = nodes[0];
  while (true) {
    const direction = template[count % template.length];
    count++;
    node = nodes.find((n) => n.label === node?.[direction]);
    if (!node) throw Error("Impossible nextNode");
    if (node.label === "ZZZ") break;
  }
  return count;
}

// console.log(moveOn());

// ==============
// === PART 2 ===
// ==============

const startNodes = nodes.filter((node) => node.label.endsWith("A"));

const loopSizes = startNodes.map((node) => {
  let count = 0;
  let tmpNode = node;
  while (true) {
    const direction = template[count % template.length];
    count++;
    tmpNode = nodes.find((n) => n.label === tmpNode?.[direction]) as Node;
    if (!tmpNode) throw Error("Impossible nextNode");
    if (tmpNode.label.endsWith("Z")) break;
  }
  return count;
});

function ppcm(numbers: number[]) {
  const sorted = numbers.sort((a, b) => a - b);
  const max = sorted[numbers.length - 1];

  let found = false;
  let step = 1;
  let product = max * step;
  while (!found) {
    product = max * step++;
    found = numbers.every((n) => Number.isInteger(product / n));
  }
  console.log(product);
}

ppcm(loopSizes);
