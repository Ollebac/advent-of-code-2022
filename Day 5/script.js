const fs = require('fs');
const readline = require('readline');

let x = 0;
let topShelf = [];
let movingStack = [];

let testshipments = {
    1: ['Z', 'N',],
    2: ['M', 'C', 'D',],
    3: ['P',],
}

let shipments = {
    1: ['G', 'D', 'V', 'Z', 'J', 'S', 'B',],
    2: ['Z', 'S', 'M', 'G', 'V', 'P',],
    3: ['C', 'L', 'B', 'S', 'W', 'T', 'Q', 'F',],
    4: ['H', 'J', 'G', 'W', 'M', 'R', 'V', 'Q',],
    5: ['C', 'L', 'S', 'N', 'F', 'M', 'D',],
    6: ['R', 'G', 'C', 'D',],
    7: ['H', 'G', 'T', 'R', 'J', 'D', 'S', 'Q',],
    8: ['P', 'F', 'V',],
    9: ['D', 'R', 'S', 'T', 'J',],
}

function moveSingle(moves) {
    for (let i = 0; i < (Number(moves[0])); i++) {
        x = shipments[(moves[1])].pop();
        shipments[(moves[2])].push(x)
    }
};

function moveStack(moves) {
    movingStack = shipments[(moves[1])].splice(-(moves[0]));
    shipments[(moves[2])] = shipments[(moves[2])].concat(movingStack);
}

async function processLineByLine() {
    const myFile = fs.createReadStream('day5_input.txt');
  
    const eachLine = readline.createInterface({
      input: myFile,
      crlfDelay: Infinity
    });
  
    console.log(shipments);

    for await (const line of eachLine) {
        // moveSingle(line.match(/\d+/g));
        moveStack(line.match(/\d+/g));
    }

    console.log(shipments);
    
    for (const [key, value] of Object.entries(shipments)) {
        topShelf.push(value[value.length - 1])
    }
    console.log(topShelf.join(''))
}

processLineByLine();