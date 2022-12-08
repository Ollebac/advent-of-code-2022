const fs = require('fs');
const readline = require('readline');

/*
    PART 1
        A & X = ROCK = 1
        B & Y = PAPER = 2
        C & Z = SCISSORS = 3
        WIN = 6
        TIE = 3
        LOSS = 0

    PART 2
        A = ROCK = 1
        B = PAPER = 2
        C = SCISSORS = 3
        X = LOSE = 0
        Y = TIE = 3
        Z = WIN = 6
*/

const scores_pt1 = {
    "A X": 4, 
    "A Y": 8, 
    "A Z": 3, 
    "B X": 1, 
    "B Y": 5, 
    "B Z": 9, 
    "C X": 7, 
    "C Y": 2, 
    "C Z": 6, 
}

const scores_pt2 = {
    "A X": 3, 
    "A Y": 4, 
    "A Z": 8, 
    "B X": 1, 
    "B Y": 5, 
    "B Z": 9, 
    "C X": 2, 
    "C Y": 6, 
    "C Z": 7, 
};

let sum = 0;

//Change below to current part of problem -> pt1 or pt2
function calculateScores(outcome) {
    sum += Number(scores_pt2[outcome]);
};

async function processLineByLine() {
    const myFile = fs.createReadStream('day2_input.txt');
  
    const eachLine = readline.createInterface({
      input: myFile,
      crlfDelay: Infinity
    });
  
    for await (const line of eachLine) {
        calculateScores(line);
    }

    console.log(`My total Rock Paper Scissors score is: ${sum}`);
}
  
processLineByLine();