// Advent of Code 2025 - Day 2

import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./input.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let ranges: string[] = [];

rl.on('line', (line: string) => {
    ranges = line.split(',')
})

rl.on('close', () => {
    part1();
    part2();
})

function part1() {
    const startTime = performance.now();
    let total = 0;
    for (const str of ranges) {
        const firstAndLast = str.split('-');
        const first = parseInt(firstAndLast[0]);
        const last = parseInt(firstAndLast[1]);
        for (let i = first; i <= last; i++) {
            const strI = i.toString();
            const firstHalf = strI.slice(0, strI.length / 2);
            const secondHalf = strI.slice(strI.length / 2);
            if (firstHalf === secondHalf) {
                total += i;
            }
        }
    }
    const endTime = performance.now();
    console.log(`Part 1: Total = ${total} (Time: ${(endTime - startTime).toFixed(2)} ms)`);
}

function part2() {
    const startTime = performance.now();
    let total = 0;
    for (const str of ranges) {
        const firstAndLast = str.split('-');
        const first = parseInt(firstAndLast[0]);
        const last = parseInt(firstAndLast[1]);
        for (let i = first; i <= last; i++) {
            const strI = i.toString();
            for (let j = 1; j < strI.length; j++) {
                const sliced = strI.slice(0, j);
                const repeated = sliced.repeat(Math.floor(strI.length / sliced.length));
                if (repeated === strI) {
                    total += i;
                    break;
                }
            }
        }
    }
    const endTime = performance.now();
    console.log(`Part 1: Total = ${total} (Time: ${(endTime - startTime).toFixed(2)} ms)`);
}