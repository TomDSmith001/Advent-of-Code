// Advent of Code 2025 - Day 7

// Advent of Code 2025 - Day 6
import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./home.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const fileLines: string[][] = []

rl.on('line', (line: string) => {
    fileLines.push(line.split(''))
});

rl.on('close', () => {
    part1()
    // part2()
});

function part1() {
    const startTime = performance.now()
    const part1: string[][] = fileLines
    const splits = new Set<string>()

    const startIndex = part1[0].indexOf('S')
    part1[1][startIndex] = '|'

    for (let index = 2; index < part1.length; index++) {
        const newLine = part1[index]
        part1[index].forEach((value: string, internalIndex) => {
            if (part1[index-1][internalIndex] === '|'){
                if (value === '^'){
                    newLine[internalIndex - 1] = '|'
                    newLine[internalIndex + 1] = '|'
                    splits.add(`${index}-${internalIndex}`)
                } else {
                    newLine[internalIndex] = '|'
                }
            }
        })
        part1[index] = newLine
    }

    const endTime = performance.now()
    console.log(`${splits.size} - Time Taken: ${endTime - startTime}ms`)
}

// function part2() {
//     const startTime = performance.now()
//
//     const endTime = performance.now()
//     console.log(`${total} - Time Taken: ${endTime - startTime}ms`)
// }
