const fullInput = require("./day6input");
const testInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
const testInput2 = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;

const input = fullInput;

const splitInput = input.split("");

const firstFound = [];
splitInput.forEach((value, index) => checkForMarket(value, index, 14));

function checkForMarket(value, index, chars) {
  let fourToCheck = [];
  for (let i = index; i < index + chars; i++) {
    fourToCheck.push(splitInput[i]);
  }
  const checkSet = new Set(fourToCheck);
  let foundIndex = 0;
  if (checkSet.size < chars) {
    //console.log(`found dupes`);
  } else {
    //console.log(`found uniques ${index}`);
    foundIndex = index + chars;
    firstFound.push(foundIndex);
  }
  //console.log(foundIndex);
}

console.log(firstFound[0]);
