import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./input2.txt')
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
    console.log(`${count} - Time Taken: ${endTime - startTime}ms`)
}

function part2() {
    const startTime = performance.now()
    ingredientRanges.sort((a,b) => a[0] - b[0])
    let [lastStart, lastEnd] = ingredientRanges[0]
    let count = 0
    for (const range of ingredientRanges.slice(1)) {
        if ((range[0] - 1) <= lastEnd) {
            lastEnd = Math.max(lastEnd, range[1]);
        } else {
            count += lastEnd - lastStart + 1
            lastStart = range[0]
            lastEnd = range[1]
        }
    }
    count += lastEnd - lastStart + 1

    const endTime = performance.now()
    console.log(`${count} - Time Taken: ${endTime - startTime}ms`)
}
