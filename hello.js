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

console.log(toWeirdCase("This is words"));
