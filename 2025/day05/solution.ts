// Advent of Code 2025 - Day 5

import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./input.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let ingredientRanges: string[] = []
let part2Array: [number,number][] = [];

rl.on('line', (line) => {
    ingredientRanges.push(line)
    const splitLine = line.split('-')
    part2Array.push([parseInt(splitLine[0]), parseInt(splitLine[1])])
});

rl.on('close', () => {
    part1()
    part2()
});

function part1() {
    const startTime = performance.now()

    let count = 0
    const ingredientToCheck = ingredientRanges.slice(ingredientRanges.indexOf('break') + 1);
    ingredientRanges = ingredientRanges.slice(0, ingredientRanges.indexOf('break'))

    for (const ingredient of ingredientToCheck) {
        for (const range of ingredientRanges) {
            const min = parseInt(range.split('-')[0])
            const max = parseInt(range.split('-')[1])
            const value = parseInt(ingredient)
            if (value >= min && value <= max) {
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
    part2Array = part2Array.slice(0, 174)
    part2Array = part2Array.sort((a,b) => a[0] - b[0])
    let checkedRanges: [number,number][] = [[part2Array[0][0], part2Array[0][1]]];
    for (const range of part2Array) {
        const startI = range[0];
        const endI = range[1];

        let extended = false

        for (let i = 0; i < checkedRanges.length; i++) {
            let checkedStartI = checkedRanges[i][0];
            let checkedEndI = checkedRanges[i][1];

            if (endI < checkedStartI || startI > checkedEndI) {
                extended = false
            } else {
                checkedRanges[i][0] = Math.min(checkedStartI, startI);
                checkedRanges[i][1] = Math.max(checkedEndI, endI);
                extended = true;
            }
        }
        if (!extended) {
            checkedRanges.push([startI, endI]);
        }
    }
    for (const range of checkedRanges) {
        count += (range[1] - range[0]) + 1;
    }

    const endTime = performance.now()
    console.log(`${count} - Time Taken: ${endTime - startTime}ms`)
}
