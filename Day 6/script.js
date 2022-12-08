const fs = require('fs');
const readline = require('readline');

let count = 0;
let found = false;
let codedText = [], currentPacket = [], tempSet = [];

//Part 1: Set {if count} to 4 and {tempSet.size} to 4
//Part 2: Set {if count} to 14 and {tempSet.size} to 14

function findMarker(code) {
    codedText = code.split('');
    while (count < codedText.length) {
        if (count < 14) {
            currentPacket.push(codedText[count]);
            count += 1;
        } else {
            tempSet = new Set(currentPacket);
            if (tempSet.size === 14) {
                console.log(`Found at ${count}`)
                console.log(tempSet);
                found = true;
                break;
            }
            currentPacket.push(codedText[count]);
            currentPacket.shift();
            count += 1;
        }
    }
}

async function processLineByLine() {
    const myFile = fs.createReadStream('day6_input.txt');
  
    const eachLine = readline.createInterface({
      input: myFile,
      crlfDelay: Infinity
    });

    for await (const line of eachLine) {
        findMarker(line);
    }

    console.log(`Characters process until first marker: ${count}`)
}

processLineByLine();