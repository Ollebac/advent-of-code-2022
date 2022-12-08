const { group } = require('console');
const fs = require('fs');
const readline = require('readline');

let prioritySum = 0;
let groupSum = 0;
let Arr1 = [], Arr2 = [], matchArr = [];
let groupArr = [], tempArr = [];
let groupMatch;
let x = 0;

function priorityVals(val) {
    if (val === val.toUpperCase()) {
        prioritySum += (val.charCodeAt() - 38);
    } else {
        prioritySum += (val.charCodeAt() - 96);
    }
}

async function processLineByLine() {
    const myFile = fs.createReadStream('day3_input.txt');
  
    const eachLine = readline.createInterface({
      input: myFile,
      crlfDelay: Infinity
    });
  
    for await (const line of eachLine) {
        for (var i = 0; i < line.length; i++) {
            if (i < (line.length / 2)) {
                Arr1.push(line[i])
            } else {
                Arr2.push(line[i])
            }
        }

        // Part 1    
        matchArr = new Set(Arr1.filter(val => Arr2.includes(val)));
        matchArr.forEach(priorityVals);
        Arr1 = [], Arr2 = [], matchArr = [];

        // Part 2
        x += 1;
        if (x === 1) {
            groupArr = line.split('');
        } else if (x === 2) {
            tempArr = line.split('');
            groupArr = groupArr.filter(val => tempArr.includes(val));
        } else {
            tempArr = line.split('');
            groupArr = groupArr.filter(val => tempArr.includes(val));
            groupMatch = groupArr[0];
            if (groupMatch === groupMatch.toUpperCase()) {
                groupSum += (groupMatch.charCodeAt() - 38);
            } else {
                groupSum += (groupMatch.charCodeAt() - 96);
            }
            x = 0;
        }
    }

    console.log(`Sum of the priorities of matching item types is: ${prioritySum}`);
    console.log(`Sum of the group priorites of matching item types is: ${groupSum}`);
}

processLineByLine();