const fs = require('fs');
const readline = require('readline');

let visitedSpaces = [[0,0]];
let count = 1;
let snake = [
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
];

function followTheLeader(command) {
    let toMove = command.match(/\d+/g);
    direction = command.match(/[A-Z]/g);
    let moved = 0;
    while (moved < toMove) {
        if (direction == 'U') {
            snake[0][0] += 1;
            moveTail();            
        } else if (direction == 'D') {
            snake[0][0] -= 1;
            moveTail();
        } else if (direction == 'L') {
            snake[0][1] -= 1;
            moveTail();
        } else if (direction == 'R') {
            snake[0][1] += 1;
            moveTail();
        } 
        moved += 1;
    }
}

function moveTail() {
    for (let i = 1; i < 10; i++) {
        let xDif = (snake[(i - 1)][0] - (snake[i][0]));
        let yDif = (snake[(i - 1)][1]) - (snake[i][1]);
        
        if (Math.abs(xDif) === 2) {
            snake[i][0] += Math.sign(xDif);
            if (Math.abs(yDif) === 1) {
                snake[i][1] += Math.sign(yDif);  
            }        
        } else if (Math.abs(yDif) === 2) {
            snake[i][1] += Math.sign(yDif);
            if (Math.abs(xDif) === 1) {
                snake[i][0] += Math.sign(xDif);
            }
        }
    }

    let includes = visitedSpaces.some(a => snake[9].every((x, y) => x === a[y]));
    let newElement = snake[9].slice(0);

    if (!includes) {
        visitedSpaces.push(newElement);
        count += 1;
    }

}

async function processLineByLine() {
    const myFile = fs.createReadStream('day9_input.txt');
  
    const eachLine = readline.createInterface({
      input: myFile,
      crlfDelay: Infinity
    });
    
    for await (const line of eachLine) {
        followTheLeader(line);
    }

    console.log(`Count: ${count}`);
    console.log(`Spaces where the tail has traveled at least once: ${visitedSpaces.length}`);
}

processLineByLine();