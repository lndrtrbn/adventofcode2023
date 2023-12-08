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

console.log(moveOn());

// ==============
// === PART 2 ===
// ==============
