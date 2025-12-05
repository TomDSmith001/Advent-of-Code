// Advent of Code 2025 - Day 1

import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./input.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const password: string[] = [];

rl.on('line', (line) => {
    password.push(line);
})

rl.on('close', () => {
    part1();
    part2();
})

function part1() {
    const startTime = performance.now();
    let totalScore = 0
    let passwordValue = 50;
    password.forEach((line) => {
        const direction = line[0] === 'L' ? -1 : 1;
        const distance = parseInt(line.slice(1))

        passwordValue += (distance % 100) * direction;

        if (passwordValue >= 100) {
            passwordValue -= 100;
        } else if (passwordValue < 0) {
            passwordValue += 100;
        }
        if (passwordValue === 0) {
            totalScore++;
        }
    })
    const endTime = performance.now();
    console.log(`Part 1: Total Score = ${totalScore} (Time: ${(endTime - startTime).toFixed(2)} ms)`);
}

function part2() {
    const startTime = performance.now();
    let totalScore = 0
    let passwordValue = 50;
    password.forEach((line) => {
        const direction = line[0] === 'L' ? -1 : 1;
        const distance = parseInt(line.slice(1))

        const distanceMod = distance % 100;
        const rotations = (distance - distanceMod) / 100;

        totalScore += rotations;

        passwordValue += (distanceMod) * direction;

        if (passwordValue >= 100) {
            if (passwordValue !== 100) {
                totalScore++;
            }
            passwordValue -= 100;
        } else if (passwordValue < 0) {
            if (passwordValue + distanceMod != 0) {
                totalScore++
            }
            passwordValue += 100;
        }
        if (passwordValue === 0) {
            totalScore++;
        }
    })
    const endTime = performance.now();
    console.log(`Part 1: Total Score = ${totalScore} (Time: ${(endTime - startTime).toFixed(2)} ms)`);
}
