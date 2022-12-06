const fullInput = require("./day6input");
const testInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
const testInput2 = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;

const input = fullInput;

const splitInput = input.split("");

const firstFound = [];
splitInput.forEach((value, index) => checkForMarket(value, index, 4));

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

// AI
function findIndexOfUniqueCharacters(str) {
  // Check if the input string is at least 5 characters long
  if (str.length < 5) {
    return -1;
  }

  // Loop through the characters in the string, starting from the fifth character
  for (let i = 4; i < str.length; i++) {
    // Check if the previous 4 characters contain only unique characters
    if (new Set(str.slice(i - 4, i)).size === 4) {
      // If they do, return the index of the current character
      return i;
    }
  }

  // If no such character was found, return -1
  return -1;
}

console.log(firstFound[0]); // 1623
console.log(findIndexOfUniqueCharacters(input));
