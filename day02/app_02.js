// Import the Node.js file system
import { readFileSync } from 'fs';

// Use the file system to read the text file and encode it in UTF-8
const fileContent = readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n');

const arrayOfGameId = []

for (let line of arrayOfLines) {
    let gameData = {
        id: null,
        draw: []
    }
    const targetIndex = line.indexOf(':');
    if (targetIndex >= 0) {
        const extract = line.slice(0, targetIndex).trim();
        const gameID = Number(extract.replace('Game ', '').trim());
        gameData.id = gameID

        const cubesGameData = line.slice(targetIndex + 2).trim();
        const drawData = cubesGameData.trim().split('; ');

        for (let colorSet of drawData) {
            if (colorSet.includes(', ')) {
                const draw = {
                    green: 0,
                    red: 0,
                    blue: 0
                }
                const colors = colorSet.trim().split(', ')
                for (let color of colors) {
                    if (color.includes('green')) { draw.green = Number(color.replace(' green', '').trim()) }
                    if (color.includes('red')) { draw.red = Number(color.replace(' red', '').trim()) }
                    if (color.includes('blue')) { draw.blue = Number(color.replace(' blue', '').trim()) }
                }
                gameData.draw.push(draw)
            }
            else {
                gameData.draw.push({
                    green: colorSet.includes('green') ? Number(colorSet.replace(' green', '').trim()) : 0,
                    red: colorSet.includes('red') ? Number(colorSet.replace(' red', '').trim()) : 0,
                    blue: colorSet.includes('blue') ? Number(colorSet.replace(' blue', '').trim()) : 0,
                })
            }
        }
    } else {
        break
    }
    arrayOfGameId.push(gameData)
}

let finalResult = 0

for (let game of arrayOfGameId) {
    let greenCubeAmount = 0;
    let redCubeAmount = 0;
    let blueCubeAmount = 0;
    for (let draw of game.draw) {
        if (draw.green > greenCubeAmount) {
            greenCubeAmount = draw.green
        }
        if (draw.red > redCubeAmount) {
            redCubeAmount = draw.red
        }
        if (draw.blue > blueCubeAmount) {
            blueCubeAmount = draw.blue
        }
    }
    const gameCubePowers = greenCubeAmount * redCubeAmount * blueCubeAmount
    finalResult = finalResult + gameCubePowers
}

console.log(finalResult)
