const input = require("./day2input");

// A : Rock [1] : X
// B : Paper [2] : Y
// C : Scissors [3] : Z

// 0 lost, 3 draw, 6 win

const testInput = `A Y
B X
C Z`;

const testInput2 = `A Y
B X
C Z
C X`;

const scores = testInput.split("\n").map((round) => {
  // turn [A Y] into [1 2]
  const hand = round
    .replace("A", "1")
    .replace("B", "2")
    .replace("C", "3")
    .replace("X", "1")
    .replace("Y", "2")
    .replace("Z", "3");

  // 1
  const opponentHand = parseInt(hand[0]);
  // 2
  const myHand = parseInt(hand[2]);

  // 2 - 1 = 1
  const outcomeValue = myHand - opponentHand;
  // 2 > 1 = true
  let outcome = myHand > opponentHand;

  // draw on 0
  if (outcomeValue == 0) {
    return myHand + 3;
  }

  // flip winner on rock vs scissors games
  if (Math.abs(outcomeValue) == 2) {
    outcome = !outcome;
  }

  // win or lose
  if (outcome) {
    return myHand + 6;
  } else {
    return myHand;
  }
});

const roundSum = scores.reduce((total, value) => (total += value));
console.log(roundSum);

const scores2 = input.split("\n").map((round) => {
  // turn [C X] into [3 1]
  const hand = round
    .replace("A", "1")
    .replace("B", "2")
    .replace("C", "3")
    .replace("X", "1") // lose
    .replace("Y", "2") // draw
    .replace("Z", "3"); // win

  // 3
  const opponentHand = parseInt(hand[0]);
  // 1
  const myHand = parseInt(hand[2]);

  let myNewHand = myHand;

  // lose
  if (myHand == 1) {
    // 3 - 1 = 2
    myNewHand = opponentHand - 1;
    // if opponent has rock (1), need scissors (3) for a loss
    if (opponentHand == 1) {
      myNewHand = 3;
    }
    return myNewHand;
  }

  // draw
  if (myHand == 2) {
    return opponentHand + 3;
  }

  // win
  if (myHand == 3) {
    myNewHand = opponentHand + 1;
    if (opponentHand == 3) {
      myNewHand = 1;
    }
    return myNewHand + 6;
  }
});

const round2Sum = scores2.reduce((total, value) => (total += value));

console.log(round2Sum);
