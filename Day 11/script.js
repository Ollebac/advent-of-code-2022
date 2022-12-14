const fs = require('fs');
const readline = require('readline');

let itemsHeld = [
    [57, 58],
    [66, 52, 59, 79, 94, 73],
    [80],
    [82, 81, 68, 66, 71, 83, 75, 97],
    [55, 52, 67, 70, 69, 94, 90],
    [69, 85, 89, 91],
    [75, 53, 73, 52, 75],
    [94, 60, 79],
];

let monkeys = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
];

let inspections = [0, 0, 0, 0, 0, 0, 0, 0,];
let currentMonkey = 0;
let tempVal, newVal, currentVal;   
let round = 1;

function createMonkeys(line) {
    if (line.includes('Monkey')) {
        currentMonkey = line.match(/\d+/g);
    } else if (line.includes('Operation')) {
        monkeys[(currentMonkey)].push(line.slice(23,24))
        monkeys[(currentMonkey)].push(line.slice(25))
    } else if (line.includes('Test')) {
        monkeys[currentMonkey].push(Number(line.match(/\d+/g)));
    } else if (line.includes('true')) {
        monkeys[currentMonkey].push(Number(line.match(/\d+/g)));
    } else if (line.includes('false')) {
        monkeys[currentMonkey].push(Number(line.match(/\d+/g)));
    }
}

function monkeyShenanigans(line) {
    while (round < 21) {
        for (let a = 0; a < monkeys.length; a++) {
            inspections[a] += itemsHeld[a].length;
            for (let b = 0; b < itemsHeld[a].length; b++) {
                if (monkeys[a][1] == 'old') {
                    tempVal = itemsHeld[a][b];
                } else {
                    tempVal = monkeys[a][1];
                }
                // For part 2, simply removed a '/3' from newVal equations below
                currentVal = itemsHeld[a][b];
                if (monkeys[a][0] == '+') {
                    newVal = Math.floor((Number(currentVal) + Number(tempVal)) / 3);
                } else {
                    newVal = Math.floor((Number(currentVal) * Number(tempVal)) / 3);
                }

                if ((newVal % (monkeys[a][2])) > 0) {
                    itemsHeld[(monkeys[a][4])].push(newVal);
                } else {
                    itemsHeld[(monkeys[a][3])].push(newVal);
                }
            }
            itemsHeld[a] = [];
        }
        round += 1;
    }
}

async function processLineByLine() {
    const myFile = fs.createReadStream('day11_input.txt');
  
    const eachLine = readline.createInterface({
      input: myFile,
      crlfDelay: Infinity
    });
    
    for await (const line of eachLine) {
        createMonkeys(line);
    }

    monkeyShenanigans();

    inspections.sort((a, b) => a - b).reverse();
    console.log(inspections);
    let monkeybiz = inspections[0] * inspections[1];
    console.log(`Monkey Business: ${monkeybiz}`)
}

processLineByLine();