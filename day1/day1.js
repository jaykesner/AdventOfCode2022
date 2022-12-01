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

console.log(largestInventory);
console.log(topThreeInventories);
