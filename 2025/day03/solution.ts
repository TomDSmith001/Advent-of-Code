// Advent of Code 2025 - Day 3

import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./home.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let batteryPack: string[] = [];

rl.on('line', (line: string) => {
    batteryPack.push(line);
})

rl.on('close', () => {
    part1();
    part2();
})

function part1() {
    scoreCalculator(2)
}

function part2() {
    scoreCalculator(12)
}

function scoreCalculator(scoreLength: number) {
    const startTime = performance.now();
    let total = 0;
    batteryPack.forEach((pack) => {
        let score = Array(scoreLength).fill('0');
        const lineArray = pack.split('');
        let splitIndex = 0;
        for (let i = 0; i < scoreLength; i++) {
            for(let index = splitIndex; index < lineArray.length; index++) {
                const maxIndex = lineArray.length - (scoreLength - i);
                if (index > maxIndex) {
                    break;
                }

                const power = parseInt(lineArray[index]);
                if (power > parseInt(score[i])) {
                    score[i] = power.toString();
                    splitIndex = index + 1;
                }
            }
        }
        total += parseInt(score.join(''));
    })
    const endTime = performance.now();
    console.log(`Total = ${total} (Time: ${(endTime - startTime).toFixed(2)} ms)`);
}
