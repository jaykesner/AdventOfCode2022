const input = require("./day4input");

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const getInput = input.split("\n");

const foundFullPairs = getInput
  .map((input) => compareFullOverlap(input))
  .reduce((total, value) => (total += value));

const foundAnyPairs = getInput
  .map((input) => compareAnyOverlap(input))
  .reduce((total, value) => (total += value));

function compareFullOverlap(inputLine) {
  const splitLine = inputLine.split(",");
  const firstNumberSet = createNumberSet(splitLine, 0);
  const secondNumberSet = createNumberSet(splitLine, 1);

  const intersect = new Set(
    [...firstNumberSet].filter((i) => secondNumberSet.has(i))
  );

  let foundPair = 0;
  if (intersect.size == firstNumberSet.size) {
    foundPair++;
  } else if (intersect.size == secondNumberSet.size) {
    foundPair++;
  }
  return foundPair;
}

function compareAnyOverlap(inputLine) {
  const splitLine = inputLine.split(",");
  const firstSet = createNumberSet(splitLine, 0);
  const secondSet = createNumberSet(splitLine, 1);

  const intersect = new Set([...firstSet].filter((i) => secondSet.has(i)));
  if (intersect.size > 0) {
    return 1;
  }
  return 0;
}

function createNumberSet(line, position) {
  const pairSections = line[position].split("-");
  const startSection = pairSections[0];
  const endSection = pairSections[1];
  return new Set(createNumberArray(startSection, endSection));
}

function createNumberArray(start, end) {
  let sectionArray = [];
  let sectionCounter = parseInt(start);
  for (let i = 0; i <= end - start; i++) {
    sectionArray.push(sectionCounter);
    sectionCounter++;
  }
  return sectionArray;
}
