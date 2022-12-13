const fs = require('fs');
const readline = require('readline');

let directoryPath = [];
let allDirectories = {
    '/': 0,
};
let sum = 0;
let currentDir;
let value = 0;

function addFiles(value) {
    let path = [];
    for (let i = 0; i < directoryPath.length; i++) {
        path.push(directoryPath[i])
        allDirectories[path.toString()] += Number(value);
    }
}

function doCommand(command) {
    if (command.includes('$ cd')) {
        currentDir = command.slice(5);
        if (currentDir === '..') {
            directoryPath.pop();
        } else if (currentDir === '/') {
            directoryPath = ['/',]
        } else {
            directoryPath.push(currentDir);
            if (!Object.hasOwn(allDirectories, directoryPath.toString())) {
                Object.defineProperty(allDirectories, directoryPath.toString(), {
                    value: 0,
                    writable: true,
                    enumerable: true,
                });
            }
        }
    } else if (command.match(/\d+/g)) {
        value = command.match(/\d+/g);
        
        addFiles(value);
    }
}

async function processLineByLine() {
    const myFile = fs.createReadStream('day7_input.txt');
  
    const eachLine = readline.createInterface({
      input: myFile,
      crlfDelay: Infinity
    });
  
    for await (const line of eachLine) {
        doCommand(line);
    }

    let spaceNeeded = (allDirectories['/'] - 70000000) + 30000000;
    let smallestDeletion = allDirectories['/']

    for (const [key, value] of Object.entries(allDirectories)) {
        if (value <= 100000) {
            sum += value;
        };
        if (value >= spaceNeeded && value < smallestDeletion) {
            smallestDeletion = value;
        };
    }
    
    console.log(`All directories with total size of at most 100k, sum up to: ${sum}`);
    console.log(`The smallest directory to free up at least ${spaceNeeded} memory, has a total of: ${smallestDeletion}`);
}

processLineByLine();