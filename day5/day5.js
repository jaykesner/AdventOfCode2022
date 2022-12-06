const input = require("./day5input");

const testInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const testSplit = testInput.split("\n");

testSplit.forEach((value) => {
  if (value.includes("move")) {
    console.log("move instruction");
  } else {
    //console.log(`not a movee ${value}`);
    if (value.includes("[")) {
      console.log(`found stack instruction`);
    } else if (value == "") {
      console.log("new line");
    } else if ([...value].filter((i) => parseInt(i) == 1)) {
      console.log("found numbers");
    }
  }
});

const testInstructions = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const testStacks = {
  stack1: ["Z", "N"],
  stack2: ["M", "C", "D"],
  stack3: ["P"],
};

const inputStacks = {
  stack1: ["F", "C", "P", "G", "Q", "R"],
  stack2: ["W", "T", "C", "P"],
  stack3: ["B", "H", "P", "M", "C"],
  stack4: ["L", "T", "Q", "S", "M", "P", "R"],
  stack5: ["P", "H", "J", "Z", "V", "G", "N"],
  stack6: ["D", "P", "J"],
  stack7: ["L", "G", "P", "Z", "F", "J", "T", "R"],
  stack8: ["N", "L", "H", "C", "F", "P", "T", "J"],
  stack9: ["G", "V", "Z", "Q", "H", "T", "C", "W"],
};

const stacks = inputStacks;

const instructions = input.split("\n");

for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i].split(" ").filter((i) => parseInt(i));
  moveCrate(instruction[0], instruction[1], instruction[2]);
}

let lastCrates = [];
Object.keys(stacks).forEach((key) => {
  lastCrates.push(stacks[key].pop());
});

console.log(lastCrates.join(""));

function moveCrate(quantity, firstPosition, secondPosition) {
  const retainOrder = true;
  let fillCrane = [];
  if (!retainOrder) {
    // part 1
    fillCrane = firstMove(firstPosition, quantity).reverse();
  } else {
    // part 2
    fillCrane = firstMove(firstPosition, quantity);
  }
  for (let i = 0; i < quantity; i++) {
    secondMove(secondPosition, fillCrane);
  }
}

function firstMove(position, quantity) {
  let inCrane = [];
  for (let i = 0; i < quantity; i++) {
    inCrane.push(Object.values(stacks)[position - 1].pop());
  }
  return inCrane;
}

function secondMove(position, inCrane) {
  for (let i = 0; i < inCrane.length; i++) {
    Object.values(stacks)[position - 1].push(inCrane.pop());
  }
}

/*
const test = testInstructions.split("\n");

for (let i = 0; i < test.length; i++) {
  const instruction = test[i].split(" ").filter((i) => parseInt(i));
  moveCrate(instruction[0], instruction[1], instruction[2]);
}

let lastCrates = [];
Object.keys(stacks).forEach((key, index) => {
  console.log(stacks[key]);
  lastCrates.push(stacks[key].pop());
});

console.log(lastCrates.join(""));
*/
