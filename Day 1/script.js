const fs = require('fs');
const readline = require('readline');

let highCal1 = 0, highCal2 = 0, highCal3 = 0;
let tempCal = 0;
let CalorieArray = [];

function checkCalories (value, index, array) {
    tempCal += Number(value);
    if (value.length === 0 || index === (array.length - 1)) {
        if (tempCal > highCal1) {
            [highCal1, tempCal] = [tempCal, highCal1]
            // console.log(`New highCal1 is ${highCal1}, tempCal is ${tempCal}`)
        }
        if (tempCal > highCal2) {
            [highCal2, tempCal] = [tempCal, highCal2]
            // console.log(`New highCal2 is ${highCal2}, tempCal is ${tempCal}`)
        }
        if (tempCal > highCal3) {
            [highCal3, tempCal] = [tempCal, highCal3]
            // console.log(`New highCal3 is ${highCal3}, tempCal is ${tempCal}`)
        }
        tempCal = 0;
    }
}

async function processLineByLine() {
    const myFile = fs.createReadStream('day1_input.txt');
  
    const eachLine = readline.createInterface({
      input: myFile,
      crlfDelay: Infinity
    });
  
    for await (const line of eachLine) {
        CalorieArray.push(line)
    }

    CalorieArray.forEach(checkCalories);

    let highCalTotal = highCal1 + highCal2 + highCal3;

    console.log(`Highest elf calories: 
        1: ${highCal1}
        2: ${highCal2}
        3: ${highCal3}
    Total: ${highCalTotal}`);
}
  
processLineByLine();