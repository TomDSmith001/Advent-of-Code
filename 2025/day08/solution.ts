// Advent of Code 2025 - Day 8

import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./input.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const breakers: number[][] = [];

rl.on('line', (line: string) => {
    const nums = line.split(',').map(num => parseInt(num));
    breakers.push(nums)
});

rl.on('close', () => {
    part1(1000)
    // part2()
});

function part1(iterations: number) {
    const coordDistances: Map<number[][], number> = new Map();
    breakers.forEach((breaker, index) => {
        for (let i = index + 1; i < breakers.length; i++) {
            const otherBreaker = breakers[i];
            const xDist = otherBreaker[0] - breaker[0];
            const yDist = otherBreaker[1] - breaker[1];
            const zDist = otherBreaker[2] - breaker[2];
            const totalDistance = Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist, 2) + Math.pow(zDist, 2));
            coordDistances.set([breaker, otherBreaker], totalDistance)
        }
    })

    let coordDistancesArray = Array.from(coordDistances.entries());
    coordDistancesArray.sort((a, b) => a[1] - b[1]);


    const circuits: Set<number[]>[] = []
    coordDistancesArray = coordDistancesArray.slice(0, iterations);
    coordDistancesArray.forEach(coord => {
        console.log(`${coord[0][0]} <-> ${coord[0][1]} : ${coord[1]}`)
        circuits.push(new Set(coord[0]))
    })

    function mergeSets(sets: Set<number[]>[]): Set<number[]>[] {
        if (sets.length <= 1) return sets;

        for (let i = 0; i < sets.length; i++){
            for (let j = i + 1; j < sets.length; j++) {
                const hasCommon = [...sets[i]].some(item => sets[j].has(item));
                if (hasCommon) {
                    // Merge the two sets
                    const merged = new Set([...sets[i], ...sets[j]]);

                    const remaining = sets.filter((_, index) => index !== i && index !== j);

                    return mergeSets([merged, ...remaining]);
                }
            }
        }
        // No more merges possible
        return sets;
    }

    const finalCircuits = mergeSets(circuits);


    const circuitArray = Array.from(finalCircuits);
    circuitArray.sort((a, b) => b.size - a.size);

    console.log(circuitArray);

    let finalScore = 1
    for( let i = 0; i < 3; i++) {
        finalScore *= circuitArray[i].size
    }

    console.log(finalScore);

}