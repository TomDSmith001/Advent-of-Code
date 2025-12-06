// Advent of Code 2025 - Day 6
import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./input.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const groupsOfNumbers: string[][] = []
const fileLines: string[] = []

rl.on('line', (line: string) => {
    fileLines.push(line)
});

rl.on('close', () => {
    const preStartTime = performance.now()
    let endSlot: number | undefined = undefined;
    const operationIndex = fileLines.length - 1
    for (let index = fileLines[operationIndex].length -1; index >= 0; index--) {
        const operation = fileLines[operationIndex][index];
        if (operation === '*' || operation === '+') {
            groupsOfNumbers.push([])
            groupsOfNumbers[groupsOfNumbers.length - 1].push(operation)
            for (let i = 0; i < operationIndex; i++) {
                const value = fileLines[i].slice(index, endSlot);
                groupsOfNumbers[groupsOfNumbers.length - 1].push(value)
            }
            endSlot = index - 1;
        }
    }
    const preEndTime = performance.now()
    const preTime = preEndTime - preStartTime;
    const [part1Total, part1Time] = part1()
    console.log(`${part1Total} - Time Taken: ${preTime + part1Time}ms`)
    const [part2Total, part2Time] = part2()
    console.log(`${part2Total} - Time Taken: ${preTime + part2Time}ms`)
});

function part1(): [number,number] {
    const startTime = performance.now()
    let total = 0

    groupsOfNumbers.forEach((group) => {
        const operation = group[0]
        let runningTotal = 0;
        if (operation === '*') {
            runningTotal = 1
            group.slice(1).forEach(num => {
                runningTotal *= parseInt(num)
            })
        } else {
            group.slice(1).forEach(num => {
                runningTotal += parseInt(num)
            })
        }
        total += runningTotal
    })
    const endTime = performance.now()
    return [total, (endTime - startTime)]
}

function part2(): [number,number] {
    const startTime = performance.now()
    let total = 0
    groupsOfNumbers.forEach((group) => {
        const operation = group[0]
        let runningTotal = operation === '*' ? 1 : 0;
        const splitNumbers = group.slice(1).map(num => num.split(''))
        for (let i = 0; i < splitNumbers[0].length; i++) {
            let value = ''
            for (let j = 0; j < splitNumbers.length; j++) {
                value += splitNumbers[j][i]
            }
            if (operation === '+') {
                runningTotal += parseInt(value)
            } else {
                runningTotal *= parseInt(value)
            }
        }
        total += runningTotal
    })
    const endTime = performance.now()
    return [total,(endTime - startTime)]
}