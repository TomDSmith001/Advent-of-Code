// Advent of Code 2025 - Day 4

import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./input.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const tpRows: string[][] = []

rl.on('line', (line) => {
    tpRows.push(line.split(''))

});

rl.on('close', () => {
    part1()
    part2()
});

function part1() {
    const startTime = performance.now()
    let count = 0
    tpRows.forEach((row, rIndex) => {
        row.forEach((tp, cIndex) => {
            let adjacentTPs = 0
            if (tp === '@') {
                if (rIndex - 1 >= 0) {
                    if (tpRows[rIndex - 1][cIndex - 1] === '@') {
                        adjacentTPs += 1;
                    }
                    if (tpRows[rIndex - 1][cIndex] === '@') {
                        adjacentTPs += 1;
                    }
                    if (tpRows[rIndex - 1][cIndex + 1] === '@') {
                        adjacentTPs += 1;
                    }
                }
                if (tpRows[rIndex][cIndex - 1] === '@') {
                    adjacentTPs += 1;
                }
                if (tpRows[rIndex][cIndex + 1] === '@') {
                    adjacentTPs += 1;
                }
                if (rIndex + 1 < tpRows.length) {
                    if (tpRows[rIndex + 1][cIndex - 1] === '@') {
                        adjacentTPs += 1;
                    }
                    if (tpRows[rIndex + 1][cIndex] === '@') {
                        adjacentTPs += 1;
                    }
                    if (tpRows[rIndex + 1][cIndex + 1] === '@') {
                        adjacentTPs += 1;
                    }
                }
                if (adjacentTPs < 4) {
                    count += 1
                }
            }
        })
    })
    const endTime = performance.now()
    console.log(`${count} - Time Taken: ${Math.ceil(endTime - startTime)}ms`)
}

function part2() {
    const startTime = performance.now()
    let total = 0
    let count = 1
    while (count > 0) {
        const accessibleTPs: number[][] = []
        count = 0
        tpRows.forEach((row, rIndex) => {
            row.forEach((tp, cIndex) => {
                let adjacentTPs = 0
                if (tp === '@') {
                    if (rIndex - 1 >= 0) {
                        if (tpRows[rIndex - 1][cIndex - 1] === '@') {
                            adjacentTPs += 1;
                        }
                        if (tpRows[rIndex - 1][cIndex] === '@') {
                            adjacentTPs += 1;
                        }
                        if (tpRows[rIndex - 1][cIndex + 1] === '@') {
                            adjacentTPs += 1;
                        }
                    }
                    if (tpRows[rIndex][cIndex - 1] === '@') {
                        adjacentTPs += 1;
                    }
                    if (tpRows[rIndex][cIndex + 1] === '@') {
                        adjacentTPs += 1;
                    }
                    if (rIndex + 1 < tpRows.length) {
                        if (tpRows[rIndex + 1][cIndex - 1] === '@') {
                            adjacentTPs += 1;
                        }
                        if (tpRows[rIndex + 1][cIndex] === '@') {
                            adjacentTPs += 1;
                        }
                        if (tpRows[rIndex + 1][cIndex + 1] === '@') {
                            adjacentTPs += 1;
                        }
                    }
                    if (adjacentTPs < 4) {
                        count += 1
                        accessibleTPs.push([rIndex, cIndex])
                    }
                }
            })
        })
        total += count
        accessibleTPs.forEach(tp => {
            tpRows[tp[0]][tp[1]] = '.'
        })
    }
    const endTime = performance.now()
    console.log(`${total} - Time Taken: ${Math.ceil(endTime - startTime)}ms`)
}
