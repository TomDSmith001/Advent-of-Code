// Advent of Code 2025 - Day 6
import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./input.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let groupsOfNumbers: number[][] = []
let fileLines: string[] = []
let operation: string[] = []

rl.on('line', (line: string) => {
    fileLines.push(line)
    let index = 0
    line.trimStart().split(' ').forEach((char: string) => {
        if (char === '+' || char === '*') {
            operation.push(char)
        } else if (char !== '') {
            groupsOfNumbers[index] = groupsOfNumbers[index] || []
            groupsOfNumbers[index].push(parseInt(char))
            index++
        }
    })
});

rl.on('close', () => {
    part1()
    part2()
});

function part1() {
    const startTime = performance.now()
    let total = 0
    for (let i = 0; i < groupsOfNumbers.length; i++) {
        let runningTotal = operation[i] === '+' ? 0 : 1
        for (const number of groupsOfNumbers[i]) {
            if (operation[i] === '+') {
                runningTotal += number
            } else if (operation[i] === '*') {
                runningTotal *= number
            }
        }
        total += runningTotal
    }
    const endTime = performance.now()
    console.log(`${total} - Time Taken: ${endTime - startTime}ms`)
}

function part2() {
    const startTime = performance.now()
    let groupsOfNumbersNormalized: string[][] = []

    for (let i = 0; i < groupsOfNumbers.length; i++) {
        const numbers = groupsOfNumbers[i]
        const sorted = numbers.sort((a,b) => b - a)
        let largest = sorted[0].toString().length
        for (let j = 0; j < fileLines.length -1; j++) {
            let line = fileLines[j]
            groupsOfNumbersNormalized[i] = groupsOfNumbersNormalized[i] || []
            const section = line.slice(0,largest)
            groupsOfNumbersNormalized[i].push(section)
            fileLines[j] = line.slice(largest + 1)
        }
    }

    let total = 0
    for (let i = 0; i < groupsOfNumbersNormalized.length -1; i++) {
        let rotated: string[][] = []
        const split = groupsOfNumbersNormalized[i].map(numStr => numStr.split(''))
        for (let j = 0; j < split.length; j++) {
            const reversed = split[j].reverse()
            for (let k = 0; k < reversed.length; k++) {
                rotated[k] = rotated[k] || []
                rotated[k].push(reversed[k])
            }
        }

        let runningTotal = operation[i] === '+' ? 0 : 1
        for (const nums of rotated) {
            const number = parseInt(nums.join(''))
            if (operation[i] === '+') {
                runningTotal += number
            } else if (operation[i] === '*') {
                runningTotal *= number
            }
        }
        total += runningTotal
    }
    const endTime = performance.now()
    console.log(`${total} - Time Taken: ${endTime - startTime}ms`)
}