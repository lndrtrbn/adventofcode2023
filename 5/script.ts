import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const rows = data.split("\r\n");

type Seeds = [number, number][];

type Mapper = {
  source: number;
  destination: number;
  range: number;
};

function stringToMapper(str: string): Mapper {
  const parsed = str.split(" ");
  return {
    source: Number(parsed[1]),
    destination: Number(parsed[0]),
    range: Number(parsed[2]),
  };
}

function buildMappers(findSeeds: () => Seeds): [Seeds, ...Mapper[][]] {
  const sts = rows.findIndex((r) => r === "seed-to-soil map:");
  const stf = rows.findIndex((r) => r === "soil-to-fertilizer map:");
  const ftw = rows.findIndex((r) => r === "fertilizer-to-water map:");
  const wtl = rows.findIndex((r) => r === "water-to-light map:");
  const ltt = rows.findIndex((r) => r === "light-to-temperature map:");
  const tth = rows.findIndex((r) => r === "temperature-to-humidity map:");
  const htl = rows.findIndex((r) => r === "humidity-to-location map:");

  return [
    findSeeds(),
    rows.slice(sts + 1, stf - 1).map(stringToMapper),
    rows.slice(stf + 1, ftw - 1).map(stringToMapper),
    rows.slice(ftw + 1, wtl - 1).map(stringToMapper),
    rows.slice(wtl + 1, ltt - 1).map(stringToMapper),
    rows.slice(ltt + 1, tth - 1).map(stringToMapper),
    rows.slice(tth + 1, htl - 1).map(stringToMapper),
    rows.slice(htl + 1, rows.length).map(stringToMapper),
  ];
}

// function findLowestLocation(findSeeds: () => Seeds) {
//   const [seeds, ...mapperss] = buildMappers(findSeeds);
//   let minLocation: number = -1;
//   seeds.forEach((seed) => {
//     let position = seed;
//     mapperss.forEach((mappers) => {
//       const mapper = mappers.find(
//         (m) => position >= m.source && position < m.source + m.range
//       );
//       position = mapper
//         ? position + (mapper.destination - mapper.source)
//         : position;
//     });
//     if (minLocation === -1 || minLocation > position) {
//       minLocation = position;
//     }
//   });
//   console.log(minLocation);
// }

// ==============
// === PART 1 ===
// ==============

// findLowestLocation(() => {
//   return rows[0]
//     .split(": ")[1]
//     .split(" ")
//     .map((seed) => [Number(seed), 1]);
// });

// ==============
// === PART 2 ===
// ==============

function findLowestLocation(findSeeds: () => Seeds) {
  const [seeds, ...mapperss] = buildMappers(findSeeds);
  let minLocation: number = -1;
  seeds.forEach(([seed, range]) => {
    for (let i = 0; i < range; i++) {
      let position = seed + i;
      mapperss.forEach((mappers) => {
        const mapper = mappers.find(
          (m) => position >= m.source && position < m.source + m.range
        );
        position = mapper
          ? position + (mapper.destination - mapper.source)
          : position;
      });
      if (minLocation === -1 || minLocation > position) {
        minLocation = position;
      }
    }
  });
  console.log(minLocation);
}

findLowestLocation(() => {
  const seedsData = rows[0].split(": ")[1].split(" ").map(Number);
  const seedsPairing: Seeds = [];
  for (let i = 0; i < seedsData.length; i += 2) {
    seedsPairing.push([seedsData[i], seedsData[i + 1]]);
  }
  return seedsPairing;
});
