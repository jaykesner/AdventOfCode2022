const fullInput = require("./day7input");

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const input = testInput;

const instructions = input.split("\n");

let directoryList = ["/"];
instructions.forEach((line) => {
  if (parseLine(line) === 4) {
    if (line.includes("dir")) {
      directoryList.push(line.split(" ")[1]);
    }
  }
});
//console.log(directoryList);

/*
directoryList.forEach((name) =>
directories.push({ name: name, size: 0, contains: [] })
); */

const directories = [];
directories.push({ name: "/", size: 0, contains: [] });
const currentDirectory = ["/"];

console.log("START READING INSTRUCTIONS");

instructions.forEach((line, index) => {
  switch (parseLine(line)) {
    case 0: // cd /
      while (currentDirectory.length > 1) {
        currentDirectory.pop();
      }
      break;
    case 1: // cd ..
      currentDirectory.pop();
      break;
    case 2: // $ cd a
      const dir = line.split(" ")[2];
      currentDirectory.push(dir);
      break;
    case 3: // ls
      // find all the next valid outputs
      const foundOutput = [];
      for (let i = index + 1; i < instructions.length; i++) {
        if (parseLine(instructions[i]) === 4) {
          //console.log("found ls output");
          foundOutput.push(instructions[i]);
        } else {
          break;
        }
      }
      // add dirs to structure or add size of files to dir
      foundOutput.forEach((output) => {
        //console.log(output);
        if (output.split(" ")[0].includes("dir")) {
          // skip
          const currentDir = currentDirectory.pop();
          const dirIndex = directories.findIndex(
            (dir) => dir.name === currentDir
          );
          directories[dirIndex].contains.push(output.split(" ")[1]);
          currentDirectory.push(currentDir);
        } else {
          //console.log(parseInt(output.split(" ")[0]));
          const currentDir = currentDirectory.pop();
          const dirIndex = directories.findIndex(
            (dir) => dir.name === currentDir
          );
          currentDirectory.push(currentDir);
          directories[dirIndex].size += parseInt(output.split(" ")[0]);
        }
      });
      break;
    case 4: // output
      break;
  }
});

console.log(JSON.stringify(directories));

let sumOfAllSmallDirs = 0;
directories.forEach((dir) => {
  let sum = 0;
  if (dir.size < 100000) {
    let containsSum = 0;

    if (dir.contains.length > 0) {
      dir.contains.forEach((dir) => {
        const dirIndex = directories.findIndex((d) => d.name === dir);
        containsSum += directories[dirIndex].size;
      });
    }

    if (dir.size + containsSum < 100000) {
      sum += dir.size + containsSum;
    }
  }
  sumOfAllSmallDirs += sum;
});

let sum = 0;
//let testRecursive = ["a", "d"];
//sumSmall(testRecursive);

function sumSmall(arr) {
  if (arr.length > 0) {
    arr.forEach((dir) => {
      const dirIndex = directories.findIndex((d) => d.name === dir);
      const foundDir = directories[dirIndex];
      sum += foundDir.size;
      sumSmall(foundDir.contains);
    });
  } else {
  }
}

//const pruneDirectories = directories.filter((dir) => dir.size < 100000);
const badDirs = [];
const pruneZero = directories.filter((dir) => {
  if (dir.size !== 0) {
    return dir;
  } else if (dir.contains.length > 0) {
    return dir;
  } else {
    badDirs.push(dir.name);
  }
});

const badSet = new Set(badDirs);
const badDirsAll = Array.from(badSet);
//console.log(badDirsAll);
//console.log(JSON.stringify(pruneZero));

const removeBadContains = pruneZero.map((dir) => {
  //return dir;
  const newDir = { name: dir.name, size: dir.size, contains: dir.contains };
  badDirsAll.forEach((badDir) => {
    const foundIndex = newDir.contains.indexOf(badDir);
    if (foundIndex > -1) {
      newDir.contains.splice(foundIndex, 1);
    }
  });
  return newDir;
});

//console.log(JSON.stringify(directories[0]));
directories.forEach((val) => {
  //console.log(JSON.stringify(val));
});
//console.log(JSON.stringify(removeBadContains));

/*
const totalSize = removeBadContains.map((dir) => {
  let dirSize = dir.size;
  sum = 0;
  sumSmall(dir.contains);
  let dirContains = sum;
  return { name: dir.name, size: dirContains + dirSize };
});

const sumOfSmall = totalSize.reduce((total, dir) => {
  if (dir.size < 100000) {
    return (total += dir.size);
  } else {
    return (total += 0);
  }
}, 0);


console.log(JSON.stringify(totalSize));
console.log(sumOfSmall);
*/

// OLD
//console.log(JSON.stringify(directories));
//console.log(sumOfAllSmallDirs);

function parseLine(instruction) {
  if (firstCharIsDollar(instruction)) {
    if (changeDirectory(instruction)) {
      if (changeOuter(instruction)) {
        //console.log("/ to goto base");
        return 0;
      } else if (changeOutOneLevel(instruction)) {
        //console.log("move out one level");
        return 1;
      } else {
        //console.log("go to directory");
        return 2;
      }
    } else {
      //console.log("ls command");
      return 3;
    }
  } else {
    //console.log("output - basically do nothing");
    return 4;
  }
}

function firstCharIsDollar(str) {
  // $ cd /
  return str[0] === "$";
}

function changeDirectory(str) {
  // $ cd a
  return str[2] === "c";
}

function changeOutOneLevel(str) {
  // $ cd ..
  return str[5] === ".";
}

function changeOuter(str) {
  // $ cd /
  return str[5] === "/";
}

// oh no
// initialize empty stack to keep track of directories
/*
const stack = [];

// initialize root directory with size 0
stack.push({ name: "/", size: 0 });

// read each line of input
for (const line of input) {
  // split line into command and argument
  const [command, arg] = line.split(" ");

  if (command === "cd") {
    if (arg === "..") {
      // move out one level
      stack.pop();
    } else if (arg === "/") {
      // move to root directory
      while (stack.length > 1) {
        stack.pop();
      }
    } else {
      // move into specified directory
      stack.push({ name: arg, size: 0 });
    }
  } else if (command === "ls") {
    // add sizes of listed files and directories to current directory
    for (const item of arg) {
      if (
        item.endsWith(".txt") ||
        item.endsWith(".dat") ||
        item.endsWith(".lst")
      ) {
        // item is a file, add its size to current directory
        stack[stack.length - 1].size += parseInt(item.split(" ")[0]);
      } else {
        // item is a directory, add its size to current directory
        stack[stack.length - 1].size += parseInt(item.split("dir")[0].trim());
      }
    }
  }
}

// find all directories with total size <= 100000
const dirs = [];
for (const d of stack) {
  if (d.size <= 100000) {
    dirs.push(d);
  }
}

// calculate sum of total sizes
let sumSizes = 0;
for (const d of dirs) {
  sumSizes += d.size;
}

// print sum of total sizes
console.log(sumSizes);

*/
