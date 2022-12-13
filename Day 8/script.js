const fs = require('fs');
const readline = require('readline');

let forest = [];
let forestWidth = 0;
let forestLength = 0;
let visibleTrees = 0;
let scenicScore = 0, currentScore = 0;
let currentTree;

function createForest(line) {
    forest.push(line.split(''));
}

function getScore() {
    let yPos = 1;
    while (yPos < (forestWidth - 1)) {
        let xPos = 1;
        while (xPos < (forestLength - 1)) {
            let left = 0, right = 0; top = 0, bottom = 0;
            //Get scenic score of top
            for (let x = (xPos - 1); x >= 0; x--) {
                if (forest[xPos][yPos] > forest[x][yPos]) {
                    top += 1;
                } else {
                    top += 1;
                    break;
                }            
            }
            //Get scenic score of bottom
            for (let x = (xPos + 1); x < forestLength; x++) {
                if (forest[xPos][yPos] > forest[x][yPos]) {
                    bottom += 1;
                } else {
                    bottom += 1;
                    break;
                }            
            }
            //Get scenic score of left
            for (let y = (yPos - 1); y >= 0; y--) {
                if (forest[xPos][yPos] > forest[xPos][y]) {
                    left += 1;
                } else {
                    left += 1;
                    break;
                }            
            }
            //Get scenic score of right
            for (let y = (yPos + 1); y < forestWidth; y++) {
                if (forest[xPos][yPos] > forest[xPos][y]) {
                    right += 1;
                } else {
                    right += 1;
                    break;
                }            
            }
            
            currentScore = (top * bottom * left * right);

            if (currentScore > scenicScore) {
                scenicScore = currentScore;
            }
            xPos += 1;
        } 
        yPos += 1;
    }
}

function invisiTrees() {
    let yPos = 1;
    while (yPos < (forestWidth - 1)) {
        let xPos = 1;
        while (xPos < (forestLength - 1)) {
            // Check if tree is visible from top.
            currentTree = 'notvisible';
            for (let x = 0; x < xPos; x++) {
                if (forest[xPos][yPos] <= forest[x][yPos]) {
                    currentTree = 'notvisible';
                    break;  
                } else {
                    currentTree = 'visible';
                }            
            }
            
            // If tree is not visible from top, check from bottom
            if (currentTree == 'notvisible') {
                for (let x = (xPos + 1); x < forestLength; x++) {
                    if (forest[xPos][yPos] <= forest[x][yPos]) {
                        currentTree = 'notvisible';
                        break;
                    } else {
                        currentTree = 'visible';
                    }             
                }
            }
            
            // If tree is not visible from bottom, check from left 
            if (currentTree == 'notvisible') {
                for (let y = 0; y < yPos; y++) {
                    if (forest[xPos][yPos] <= forest[xPos][y]) {
                        currentTree = 'notvisible';
                        break;
                    } else {
                        currentTree = 'visible';
                    }                  
                }
            }
            
            // If tree is not visible from left, check from right 
            if (currentTree == 'notvisible') {
                for (let y = (yPos + 1); y < forestWidth; y++) {
                    if (forest[xPos][yPos] <= forest[xPos][y]) {
                        currentTree = 'notvisible';
                        break;
                    } else {
                        currentTree = 'visible';
                    }                 
                }
            }
            
            if (currentTree == 'visible') {
                visibleTrees += 1;
            }
            xPos += 1;
        }
        yPos += 1;
    }
}

async function processLineByLine() {
    const myFile = fs.createReadStream('day8_input.txt');
  
    const eachLine = readline.createInterface({
      input: myFile,
      crlfDelay: Infinity
    });
  
    for await (const line of eachLine) {
        createForest(line);
        forestWidth = line.length;
    }
    
    forestLength = forest.length;
    let forestPerimeter = (forestLength * 2) + (forestWidth * 2) - 4;
    
    invisiTrees();
    getScore();
    visibleTrees += forestPerimeter;
  
    console.log(`Forest is ${forestWidth} trees wide and ${forestLength} trees long.`);
    console.log(`Forest perimeter consists of ${forestPerimeter} trees.`);
    console.log(`There are a total of ${visibleTrees} trees visible.`);
    console.log(`The tree with the highest scenic score has a score of: ${scenicScore}`);
}

processLineByLine();