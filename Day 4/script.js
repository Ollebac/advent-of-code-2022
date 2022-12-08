const fs = require('fs');
const readline = require('readline');

let enclosedPairs = 0;
let partialPairs = 0;
let A = [], B = [];
let tempString;

function stringToNumber(val) {
    return Number(val)
}

function fullOverlap(line) {
    tempString = line.substring(0, line.indexOf(','))
    A = (tempString.split('-')).map(stringToNumber);
    tempString = line.substring((line.indexOf(',') + 1))
    B = (tempString.split('-')).map(stringToNumber);
    if (A[0] >= B[0] && A[1] <= B[1]) {
        enclosedPairs += 1
    } else if (B[0] >= A[0] && B[1] <= A[1]) {
        enclosedPairs += 1
    }
}

function partialOverlap(line) {
    tempString = line.substring(0, line.indexOf(','))
    A = (tempString.split('-')).map(stringToNumber);
    tempString = line.substring((line.indexOf(',') + 1))
    B = (tempString.split('-')).map(stringToNumber);
    if ((A[0] >= B[0] && A[0] <= B[1]) || (A[1] >= B[0] && A[1] <= B[1])) {
        partialPairs += 1
    } else if ((B[0] >= A[0] && B[0] <= A[1]) || (B[1] >= A[0] && B[1] <= A[1])) {
        partialPairs += 1
    }
}

async function processLineByLine() {
    const myFile = fs.createReadStream('day4_input.txt');
  
    const eachLine = readline.createInterface({
      input: myFile,
      crlfDelay: Infinity
    });
  
    for await (const line of eachLine) {
        fullOverlap(line);
        partialOverlap(line);
    }

    console.log(`Total amount of pairs with full overlap: ${enclosedPairs}`)
    console.log(`Total amount of pairs with partial overlap: ${partialPairs}`)
}

processLineByLine();