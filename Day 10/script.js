const { setServers } = require('dns');
const fs = require('fs');
const readline = require('readline');

let currentCycleX = [0,];
let signalStrength = [];
let x = 1;
let spriteLocation = [0,1,2,];
let messageCount = 0;
let currentMessage;
let pixel; 
let pixelVal = 1;

let message = [
    [],
    [],
    [],
    [],
    [],
    [],
]

function findSignalStrength(command) {
    if (command === 'noop') {
        currentCycleX.push(x);
    } else {
        currentCycleX.push(x)
        currentCycleX.push(x);
        x += Number(command.slice(5));
    }
}

function checkPixel(val) {
    let a = Math.floor(messageCount / 40);
    val = val - (a * 40);
    if (spriteLocation.includes(val)) {
        return ('#');
    } else {
        return ('.');
    }
}

function setSprite(val) {
    spriteLocation = [(val - 1), val, (val + 1)]
}

function writePixel(val) {
    currentMessage = Math.floor(messageCount / 40)
    message[currentMessage].push(val)
}

function createCRT(command) {
    pixel = checkPixel(messageCount);
    if (command === 'noop') {
        writePixel(pixel);
    } else {
        writePixel(pixel);
        messageCount += 1;
        pixel = checkPixel(messageCount);
        writePixel(pixel);
        pixelVal += Number(command.slice(5))
        setSprite(pixelVal);
    }
    messageCount += 1;
}

async function processLineByLine() {
    const myFile = fs.createReadStream('day10_input.txt');
  
    const eachLine = readline.createInterface({
      input: myFile,
      crlfDelay: Infinity
    });
    
    for await (const line of eachLine) {
        findSignalStrength(line);
        createCRT(line);
    }

    let i = 20;
    while (i < currentCycleX.length) {
        signalStrength.push(i * currentCycleX[i]);
        i += 40;
    }

    let totalSignalStrength = signalStrength.reduce((partialSum, x) => partialSum + x, 0);
    console.log(`Total Signal Strength: ${totalSignalStrength}`);

    for (let i = 0; i < 6; i++) {
        console.log(message[i].join(''))
    }
}

processLineByLine();