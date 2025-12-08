// Advent of Code 2025 - Day 7: Laboratories

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
    part2()
});

function part1() {
    const startTime = performance.now()
    const splits = new Set<string>()

    const startIndex = fileLines[0].indexOf('S')
    fileLines[1][startIndex] = '|'

    for (let index = 2; index < fileLines.length; index++) {
        const newLine = fileLines[index]
        fileLines[index].forEach((value: string, internalIndex) => {
            if (fileLines[index-1][internalIndex] === '|'){
                if (value === '^'){
                    newLine[internalIndex - 1] = '|'
                    newLine[internalIndex + 1] = '|'
                    splits.add(`${index}-${internalIndex}`)
                } else {
                    newLine[internalIndex] = '|'
                }
            }
        })
        fileLines[index] = newLine
    }

    const endTime = performance.now()
    console.log(`${splits.size} - Time Taken: ${endTime - startTime}ms`)
}

function part2() {
    const startTime = performance.now()
    const part2Input = fileLines.filter((_, index) => index % 2 === 0);
    const paths = new Map<string, number>();

    let startIndex = part2Input[0].indexOf('S');

    function countPaths(row: number, col: number): number {
        if (row >= part2Input.length) {
            return 1;
        }
        const key = `${row}-${col}`;
        if (paths.has(key)) {
            return paths.get(key)!;
        }

        let route = 0;

        if (col >= 0 && col < part2Input[row].length && part2Input[row][col] === '^') {
                route = countPaths(row + 1, col - 1) + countPaths(row + 1, col + 1);
        } else {
            route = countPaths(row + 1, col);
        }

        paths.set(key, route);
        return route;
    }

    const total = countPaths(1, startIndex);
    const endTime = performance.now()
    console.log(`${total} - Time Taken: ${endTime - startTime}ms`)
}