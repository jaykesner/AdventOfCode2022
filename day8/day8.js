const fullInput = require("./day8input");

const testInput = `30373
25512
65332
33549
35390`;

/*
30373   vvvvv
25512   vvvnv
65332   vvnvv
33459   vnvvv
35390   vvvvv
*/

const coords = [];
let xMax = 0;
let yMax = 0;
function main(useRealData) {
  const input = useRealData ? fullInput : testInput;
  // fill coord array
  input.split("\n").forEach((line, index) => {
    if (index > yMax) {
      yMax = index;
    }
    [...line].forEach((treeH, rowPos) => {
      coords.push({
        x: rowPos,
        y: index,
        treeH: treeH,
        visible: false,
        scenicScore: 0,
      });
      if (rowPos > xMax) {
        xMax = index;
      }
    });
  });
  console.log(`xMax: ${xMax} yMax: ${yMax}`);
  input.split("\n").forEach((line, columnPos) => {
    [...line].forEach((treeH, rowPos) => {
      if (columnPos === 0) {
        // top edge
        setVisible(rowPos, columnPos, true);
      } else if (columnPos === yMax) {
        // bottom edge
        setVisible(rowPos, columnPos, true);
      } else if (rowPos === 0) {
        // left edge
        setVisible(rowPos, columnPos, true);
      } else if (rowPos === xMax) {
        setVisible(rowPos, columnPos, true);
        // right edge
      } else {
        const isVisible = checkTreeVisibility(rowPos, columnPos, treeH);
        setVisible(rowPos, columnPos, isVisible);
        const getSceneScore = checkTreeSceneScore(rowPos, columnPos, treeH);
        setSceneicScore(rowPos, columnPos, getSceneScore);
      }

      // test specific case
      /*
      let testX = 2;
      let testY = 3;
      if (columnPos === testY) {
        if (rowPos === testX) {
          console.log(
            `test tree ${JSON.stringify(findTreeData(testX, testY))}`
          );
          //console.log(treeH);
          /*
          const isVisible = checkTreeVisibility(
            testX,
            testY,
            xMax,
            yMax,
            treeH
          );
          //console.log(`checked tree ${isVisible}`);
          setVisible(testX, testY, isVisible);
          
          console.log(
            checkTreeScenicScore(testX, testY, findTreeDataHeight(testX, testY))
          );
        }
      } 
      */
    });
  });

  //console.log(JSON.stringify(coords));
}
main(true);

const coordsTotal = coords.reduce(
  (total, coord) => (coord.visible ? (total += 1) : (total += 0)),
  0
);

console.log(coordsTotal);

const coordsScores = coords
  .map((i) => i.scenicScore)
  .filter((i) => i)
  .sort((a, b) => b - a);
console.log(coordsScores[0]);

//console.log(JSON.stringify(coords));

function checkTreeVisibility(rowPos, columnPos, treeToTest) {
  let treeHeight = treeToTest;
  // look left
  let leftCheck = true;
  let rightCheck = true;
  let downCheck = true;
  let upCheck = true;
  for (let i = 0; i < rowPos; i++) {
    /*
    console.log(
      `looked left x:${i} treeH: ${findTreeDataHeight(i, columnPos)}`
    );
    */
    if (findTreeDataHeight(i, columnPos) >= treeHeight) {
      leftCheck = false;
    }
  }
  // look right
  for (let i = rowPos + 1; i <= xMax; i++) {
    /*
    console.log(
      `looked right x:${i} treeH: ${findTreeDataHeight(i, columnPos)}`
    );
    */
    if (findTreeDataHeight(i, columnPos) >= treeHeight) {
      rightCheck = false;
    }
  }
  // look down
  for (let i = columnPos + 1; i <= yMax; i++) {
    /*
    console.log(`looked down y:${i} treeH: ${findTreeDataHeight(rowPos, i)}`);
    */
    if (findTreeDataHeight(rowPos, i) >= treeHeight) {
      downCheck = false;
    }
  }
  // look up
  for (let i = 0; i < columnPos; i++) {
    /*
    console.log(`looked up y:${i} treeH: ${findTreeDataHeight(rowPos, i)}`);
    */
    if (findTreeDataHeight(rowPos, i) >= treeHeight) {
      upCheck = false;
    }
  }
  return leftCheck || rightCheck || upCheck || downCheck;
}

function checkTreeSceneScore(rowPos, columnPos, treeToTest) {
  let leftScore = 0;
  let rightScore = 0;
  let downScore = 0;
  let upScore = 0;

  let leftBlocked = false;
  let rightBlocked = false;
  let downBlocked = false;
  let upBlocked = false;
  // look left
  for (let i = rowPos - 1; i >= 0; i--) {
    /*
    console.log(
      `looked left x:${i} treeH: ${findTreeDataHeight(i, columnPos)}`
    );
    */
    if (findTreeDataHeight(i, columnPos) < treeToTest) {
      if (!leftBlocked) {
        leftScore += 1;
      }
    } else {
      //console.log("left blocked");
      leftBlocked = true;
    }
  }
  // look right
  for (let i = rowPos + 1; i <= xMax; i++) {
    /*
    console.log(
      `looked right x:${i} treeH: ${findTreeDataHeight(i, columnPos)}`
    );
    */
    if (findTreeDataHeight(i, columnPos) < treeToTest) {
      if (!rightBlocked) {
        rightScore += 1;
      }
    } else {
      //console.log("right blocked");
      rightBlocked = true;
    }
  }
  // look down
  for (let i = columnPos + 1; i <= yMax; i++) {
    //console.log(`looked down y:${i} treeH: ${findTreeDataHeight(rowPos, i)}`);
    if (findTreeDataHeight(rowPos, i) < treeToTest) {
      if (!downBlocked) {
        downScore += 1;
      }
    } else {
      //console.log("down blocked");
      downBlocked = true;
    }
  }
  // look up
  for (let i = columnPos - 1; i >= 0; i--) {
    //console.log(`looked up y:${i} treeH: ${findTreeDataHeight(rowPos, i)}`);
    if (findTreeDataHeight(rowPos, i) < treeToTest) {
      if (!upBlocked) {
        upScore += 1;
      }
    } else {
      //console.log("up blocked");
      upBlocked = true;
    }
  }
  if (rightBlocked) {
    rightScore += 1;
  }
  if (leftBlocked) {
    leftScore += 1;
  }
  if (upBlocked) {
    upScore += 1;
  }
  if (downBlocked) {
    downScore += 1;
  }
  //console.log(`${upScore} ${leftScore} ${downScore} ${rightScore}`);
  return leftScore * upScore * downScore * rightScore;
}

function findTreeData(x, y) {
  return coords.filter((coord) => x === coord.x && y === coord.y)[0];
}

function findTreeDataHeight(x, y) {
  return findTreeData(x, y).treeH;
}

function findTreeIndex(x, y) {
  //const coord = coords.filter((coord) => x === coord.x && y === coord.y);
  const coord = coords.findIndex((coord) => x === coord.x && y === coord.y);
  return coord;
}

function setVisible(x, y, visible) {
  const treeIndex = findTreeIndex(x, y);
  coords[treeIndex].visible = visible;
}

function setSceneicScore(x, y, score) {
  const treeIndex = findTreeIndex(x, y);
  coords[treeIndex].scenicScore = score;
}
