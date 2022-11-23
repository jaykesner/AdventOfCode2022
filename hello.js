console.log("press F5 to  using Node");

const string = "hello";

// Reverse a string

const reverse = (input) => {
  const splitInput = input.split("");
  const reversedInput = [];
  for (let i = 0; i < input.length; i++) {
    const reversedCharacter = splitInput[input.length - i - 1];
    reversedInput.push(reversedCharacter);
  }
  return reversedInput.join("");
};

const reverseStringBetter = (s) => [...s].reverse().join("");

//console.log(reverseStringBetter(string));

/*
Write a function toWeirdCase (weirdcase in Ruby) that accepts a string, and returns the same string with all even indexed characters in each word upper cased, and all odd indexed characters in each word lower cased. The indexing just explained is zero based, so the zero-ith index is even, therefore that character should be upper cased and you need to start over for each word.

The passed in string will only consist of alphabetical characters and spaces(' '). Spaces will only be present if there are multiple words. Words will be separated by a single space(' ').

toWeirdCase( "String" );//=> returns "StRiNg"
toWeirdCase( "Weird string case" );//=> returns "WeIrD StRiNg CaSe"
*/

const toWeirdCase = (strings) =>
  strings
    .split(" ")
    .map((string) =>
      [...string]
        .map((char, index) =>
          index % 2 ? char.toLowerCase() : char.toUpperCase()
        )
        .join("")
    )
    .join(" ");

//console.log(toWeirdCase("This is words"));

/*
You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1
*/

const calcArea = (height, minPos, maxPos) => {
  return Math.min(height[minPos], height[maxPos]) * (maxPos - minPos);
};

//let height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
let height = [2, 3, 4, 5, 18, 17, 6];
const maxArea2 = height.reduce((maxArea, value, index) => {
  let newArea = calcArea(height, index, height.length - 1);
  if (maxArea < newArea) {
    return (maxArea = newArea);
  } else {
    return maxArea;
  }
}, 0);

console.log(maxArea2);

var maxArea = function (height) {
  let minPos = 0;
  let maxPos = height.length - 1;
  let maximum = calcArea(height, minPos, maxPos);
  while (minPos != maxPos) {
    if (height[maxPos] > height[minPos]) {
      minPos += 1;
    } else {
      maxPos -= 1;
    }
    const newArea = calcArea(height, minPos, maxPos);
    if (maximum < newArea) maximum = newArea;
  }
  return maximum;
};

//console.log(maxArea(test));
