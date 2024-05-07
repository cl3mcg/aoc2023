// Import the Node.js file system
import { readFileSync } from 'fs';

// Use the file system to read the text file and encode it in UTF-8
const fileContent = readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, ''));
// console.log(arrayOfLines);

let allGamesData = [];

for (let card of arrayOfLines) {
    const target = card.indexOf(':')
    let id = ''
    for (let i = -3; i < 0; i++) {
        id = `${id}${card[target + i]}`
    }
    id = Number(id)

    const startOfWinningNumbers = card.indexOf(': ')
    const endOfWinningNumbers = card.indexOf(' | ')
    const stringOfWinningNumbers = card.slice(startOfWinningNumbers + 1, endOfWinningNumbers + 1)
    const arrayOfWinningNumbers = stringOfWinningNumbers.split(' ').filter((entry) => entry.length > 0).map((entry) => Number(entry))

    const startOfPlayerNumbers = card.indexOf(' | ')
    const endOfPlayerNumbers = card.length - 1
    const stringOfPlayerNumbers = card.slice(startOfPlayerNumbers + 1, endOfPlayerNumbers + 1)
    const arrayOfPlayedNumbers = stringOfPlayerNumbers.split(' ').filter((entry) => entry.length > 0 && entry !== '|').map((entry) => Number(entry))

    const gameData = {
        gameIndex: id - 1,
        gameLine: id,
        winningNumbers: arrayOfWinningNumbers,
        playedNumbers: arrayOfPlayedNumbers
    }

    allGamesData.push(gameData)
    console.log(`The game data`, gameData)
}

let current = 0
for (let game of allGamesData) {

    let numberOfWins = 0;
    for (playedNumber of game.playedNumbers) {
        if (game.winningNumbers.includes(playedNumber)) {
            numberOfWins = numberOfWins + 1
        }
    }

    for (let i = 0; i < numberOfWins; i++) {
        allGamesData.push(allGamesData[game.gameIndex + 1 + i])
    }

    current++;
    const percentage = Math.floor((current / allGamesData.length) * 100);
    console.log(`Status: ${percentage}% ${current}/${allGamesData.length}`);
}

const result = allGamesData.length
console.log(`The final result should be:`, result)

