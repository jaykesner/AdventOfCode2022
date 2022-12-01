const input = require("./day1input");

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const splitInventories = input.split("\n");
let largestInventory = 0;
let currentInventorysize = 0;
const totalInventories = [];

function checkInventory(reset) {
  if (currentInventorysize > largestInventory) {
    largestInventory = currentInventorysize;
  }
  if (reset) {
    totalInventories.push(currentInventorysize);
    currentInventorysize = 0;
  }
}

for (let i = 0; i < splitInventories.length; i++) {
  if (splitInventories[i] == "") {
    checkInventory(true);
  } else {
    if (i == splitInventories.length - 1) {
      currentInventorysize += parseInt(splitInventories[i]);
      checkInventory(true);
    } else {
      currentInventorysize += parseInt(splitInventories[i]);
      checkInventory(false);
    }
  }
}

const topThreeInventories = totalInventories
  .sort((a, b) => a - b)
  .splice(totalInventories.length - 3)
  .reduce((top, total) => (top += total));

//console.log(largestInventory); // 71124
//console.log(topThreeInventories); // 204639

const sortedTotals = input
  .split("\n")
  .map((item) => (parseInt(item) ? parseInt(item) : 0)) // map array of strings into numbers, replace newline with 0
  .reduce((totals, item, index) => {
    index == 0
      ? totals.push(item)
      : item == 0
      ? totals.push(0)
      : totals.push(totals.pop() + item);
    return totals;
  }, [])
  .sort((a, b) => a - b);

const largestCarry = sortedTotals.at(-1);

const topThree = sortedTotals
  .splice(sortedTotals.length - 3)
  .reduce((top, total) => (top += total));

console.log(largestCarry);
console.log(topThree);
