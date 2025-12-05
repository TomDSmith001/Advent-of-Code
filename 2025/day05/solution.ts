import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./input.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let ingredientRanges: [number,number][] = []
let ingredients: number[] = []

rl.on('line', (line) => {
    const splitLine = line.split('\n')[0].split('-');
    if (splitLine.length === 2) {
        ingredientRanges.push([parseInt(splitLine[0]), parseInt(splitLine[1])])
    }
    else {
        ingredients.push(parseInt(splitLine[0]));
    }
});

rl.on('close', () => {
    part1()
    part2()
});

function part1() {
    const startTime = performance.now()
    let count = 0
    for (const ingredient of ingredients) {
        for (const range of ingredientRanges) {
            if (ingredient >= range[0] && ingredient <= range[1]) {
                count++;
                break;
            }
        }
    }
    const endTime = performance.now()
    console.log(`${count} - Time Taken: ${Math.ceil(endTime - startTime)}ms`)
}

function part2() {
    const startTime = performance.now()
    let count = 0
    ingredientRanges.sort((a,b) => b[0] - a[0])
    const checkedRanges: [number,number][] = [[ingredientRanges[0][0], ingredientRanges[0][1]]];
    for (const range of ingredientRanges) {
        let extended = false
        for (let i = 0; i < checkedRanges.length; i++) {
            if (!(range[1] <= (checkedRanges[i][0] - 1))) {
                checkedRanges[i][0] = Math.min(checkedRanges[i][0], range[0]);
                checkedRanges[i][1] = Math.max(checkedRanges[i][1], range[1]);
                extended = true;
                break
            }
        }
        if (!extended) {
            checkedRanges.push([range[0], range[1]]);
        }
    }
    for (const range of checkedRanges) {
        count += (range[1] - range[0]) + 1;
    }
    const endTime = performance.now()
    console.log(`${count} - Time Taken: ${endTime - startTime}ms`)
}

