const input = require("./day3input");

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const splitInput = input.split("\n");

function sameItem(currentSack) {
  const sack = currentSack;

  const firstHalf = sack.slice(0, sack.length / 2);
  const secondHalf = sack.slice(sack.length / 2, sack.length);

  return compareItems(firstHalf, secondHalf);
}

function compareItems(firstHalf, secondHalf) {
  const a = new Set(firstHalf);
  const b = new Set(secondHalf);
  const intersect = new Set([...a].filter((i) => b.has(i)));
  //console.log(intersect);

  // old
  const compareHalfs = [...firstHalf].filter((item) => {
    const foundSameItem = [...secondHalf].filter((item2) => item2 == item);
    return foundSameItem[0];
  });
  //compareHalfs[0]
  return intersect.values().next().value;
}

const sameItems = splitInput.map((currentSack) => sameItem(currentSack));

function packValue(item) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const test1 = alphabet.indexOf(item);
  const test2 = upperAlphabet.indexOf(item);

  const firstWins = test1 > -1;
  return firstWins ? test1 + 1 : test2 + 27;
}

const itemValues = sameItems.map((item) => packValue(item));

const sumValues = itemValues.reduce((total, value) => (total += value));
console.log(`Part 1: ${sumValues}`);

let groupSack = [];
for (let i = 0; i < splitInput.length; i += 6) {
  const firstSack = splitInput[i];
  const secondSack = splitInput[i + 1];
  const thirdSack = splitInput[i + 2];

  const findSameItem = compareThreeSacks(firstSack, secondSack, thirdSack);
  groupSack.push(findSameItem);

  const fourthSack = splitInput[i + 3];
  const fifthSack = splitInput[i + 4];
  const sixthSack = splitInput[i + 5];

  const findSameItem2 = compareThreeSacks(fourthSack, fifthSack, sixthSack);
  groupSack.push(findSameItem2);
}

function compareThreeSacks(sack1, sack2, sack3) {
  const a = new Set(sack1);
  const b = new Set(sack2);
  const c = new Set(sack3);

  const intersect = new Set([...a].filter((i) => b.has(i)));
  const intersect2 = new Set([...intersect].filter((i) => c.has(i)));
  return intersect2.values().next().value;

  // old
  const findSameItem = [...sack1].filter((item) => {
    const foundinSecond = [...sack2].filter((item2) => item2 == item);
    const foundinThird = [...sack3].filter(
      (item3) => item3 == foundinSecond[0]
    );
    return foundinThird[0];
  });
  const singleValue = new Set(findSameItem);
  const iterator = singleValue.values();
  // interator.next().value
  return intersect2.values().next().value;
}

const groupSackValues = groupSack.map((item) => packValue(item));

const sumGroupValues = groupSackValues.reduce(
  (total, value) => (total += value)
);
console.log(`Part 2: ${sumGroupValues}`);
