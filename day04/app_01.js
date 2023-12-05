// Import the Node.js file system
const fs = require('fs');

// Use the file system to read the text file and encode it in UTF-8
const fileContent = fs.readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, ''));
// console.log(arrayOfLines);

let finalResult = 0;

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
        gameId: id,
        winningNumbers: arrayOfWinningNumbers,
        playedNumbers: arrayOfPlayedNumbers
    }

    allGamesData.push(gameData)
    console.log(`The game data`, gameData)
}

for (let game of allGamesData) {
    console.log(`Checking the values of game num. ${game.gameId}`)
    let gameResult = 0;
    let numberOfWins = 0;
    for (playedNumber of game.playedNumbers) {
        if (game.winningNumbers.includes(playedNumber)) {
            console.log(`In game num. ${game.gameId}, value ${playedNumber} is winning`)
            numberOfWins = numberOfWins + 1
        }
    }
    if (numberOfWins > 0) {
        console.log(`In game num. ${game.gameId}, there are ${numberOfWins} winning numbers`)
        for (let i = 0; i < numberOfWins; i++) {
            if (gameResult === 0) {
                gameResult++
                console.log(`In game num. ${game.gameId}, the first win set the gameResult to ${gameResult}`)
            } else {
                gameResult = gameResult * 2
                console.log(`In game num. ${game.gameId}, the next win set the gameResult from ${gameResult / 2} to ${gameResult}`)
            }
        }
        console.log(`The previous finalResult is ${finalResult}`)
        console.log(`The points to add are ${gameResult}`)
        finalResult = finalResult + gameResult
        console.log(`The updated finalResult is ${finalResult}`)
    } else {
        console.log(`In game num. ${game.gameId}, there is no winning numbers`)
    }
}

console.log(`The final result should be:`, finalResult)

