import * as fs from 'fs';
import * as readline from 'readline';

const fileStream = fs.createReadStream('./input.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});


rl.on('line', (line) => {
    part1(line.split(''));
    part2(line.split(''));
});

rl.on('close', () => {

})

function part1(line: string[]) {
    const startTime = performance.now()
    let coordinates: [number,number] = [0,0]
    const coordinateMap = new Set<string>()
    coordinateMap.add('0,0')
    for (const char of line) {
        switch (char) {
            case '^':
                coordinates[1] += 1
                break;
            case 'v':
                coordinates[1] -= 1
                break;
            case '>':
                coordinates[0] += 1
                break;
            case '<':
                coordinates[0] -= 1
                break;
        }
        coordinateMap.add(coordinates.toString())
    }
    const endTime = performance.now()
    console.log(`${coordinateMap.size} Execution time: ${endTime - startTime} ms`)
}
function part2(line: string[]) {
    const startTime = performance.now()
    let santaCoordinates: [number,number] = [0,0]
    let roboCoordinates: [number,number] = [0,0]
    const coordinateMap = new Set<string>()
    coordinateMap.add('0,0')
    line.forEach((char, index) =>{
        if (index % 2 === 0) {
            switch (char) {
                case '^':
                    santaCoordinates[1] += 1
                    break;
                case 'v':
                    santaCoordinates[1] -= 1
                    break;
                case '>':
                    santaCoordinates[0] += 1
                    break;
                case '<':
                    santaCoordinates[0] -= 1
                    break;
            }
            coordinateMap.add(santaCoordinates.toString())
        } else {
            switch (char) {
                case '^':
                    roboCoordinates[1] += 1
                    break;
                case 'v':
                    roboCoordinates[1] -= 1
                    break;
                case '>':
                    roboCoordinates[0] += 1
                    break;
                case '<':
                    roboCoordinates[0] -= 1
                    break;
            }
            coordinateMap.add(roboCoordinates.toString())
        }
    })
    const endTime = performance.now()
    console.log(`${coordinateMap.size} Execution time: ${endTime - startTime} ms`)
}
