// Import the Node.js file system
import { readFileSync } from 'fs';

// Use the file system to read the text file and encode it in UTF-8
const fileContent = readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n');
const numberOfRows = Number(arrayOfLines.length)
const numberOfColumns = Number(arrayOfLines[0].trim().length)
console.log(`Rows:`, numberOfRows, `Columns:`, numberOfColumns)

// Parse the file to retrieve all the stars by row
const allStarsByLine = function () {
    let linesData = [];
    for (const line of arrayOfLines) {
        let lineData = {
            lineNumber: Number(arrayOfLines.indexOf(line) + 1),
            starCollection: []
        };
        let starData = {
            index: '',
            validationCoordinates: []
        };
        for (let i = 0; i < numberOfColumns; i++) {
            if (line[i] === '*') {
                starData.index = Number(i)
                starData.validationCoordinates.push(
                    { row: arrayOfLines.indexOf(line) - 1, column: i - 1 },
                    { row: arrayOfLines.indexOf(line) - 1, column: i },
                    { row: arrayOfLines.indexOf(line) - 1, column: i + 1 },
                    { row: arrayOfLines.indexOf(line), column: i - 1 },
                    // { row: arrayOfLines.indexOf(line), column: i },
                    { row: arrayOfLines.indexOf(line), column: i + 1 },
                    { row: arrayOfLines.indexOf(line) + 1, column: i - 1 },
                    { row: arrayOfLines.indexOf(line) + 1, column: i },
                    { row: arrayOfLines.indexOf(line) + 1, column: i + 1 })
                lineData.starCollection.push(starData)
                starData = {
                    index: '',
                    validationCoordinates: []
                };
            }
        }
        linesData.push(lineData)

    }
    return linesData
}

const checkGear = function (validationCoordinates) {
    let checker = 0
    for (let coordinates of validationCoordinates) {
        if (coordinates.row >= 0 && coordinates.column >= 0 && coordinates.row < arrayOfLines.length && coordinates.column < numberOfColumns) {
            let caracter = arrayOfLines[coordinates.row][coordinates.column];
            if (!isNaN(caracter)) {
                checker++;
            }
        }
    }
    return checker > 1 ? true : false
}

const getValidStars = function () {
    let validatedStars = []
    for (let line of allStarsByLine()) {
        for (star of line.starCollection) {
            if (checkGear(star.validationCoordinates)) {
                validatedStars.push({
                    row: line.lineNumber,
                    column: star.index
                })
            }
        }
    }
    return validatedStars
}


const scanNumbersAround = function (starsCoordinates) {
    const valuesToAdd = [];

    for (const starCoordinates of starsCoordinates) {
        const row = starCoordinates.row;
        const column = starCoordinates.column;
        const allAdjacentValues = []
        // Extract adjacent values using array slicing
        if (arrayOfLines[row - 1]) {
            allAdjacentValues.push(`${arrayOfLines[starCoordinates.row - 1][starCoordinates.column - 3]}${arrayOfLines[starCoordinates.row - 1][starCoordinates.column - 2]}${arrayOfLines[starCoordinates.row - 1][starCoordinates.column - 1]}`);
            allAdjacentValues.push(`${arrayOfLines[starCoordinates.row - 1][starCoordinates.column - 2]}${arrayOfLines[starCoordinates.row - 1][starCoordinates.column - 1]}${arrayOfLines[starCoordinates.row - 1][starCoordinates.column - 0]}`);
            allAdjacentValues.push(`${arrayOfLines[starCoordinates.row - 1][starCoordinates.column - 1]}${arrayOfLines[starCoordinates.row - 1][starCoordinates.column - 0]}${arrayOfLines[starCoordinates.row - 1][starCoordinates.column + 1]}`);
            allAdjacentValues.push(`${arrayOfLines[starCoordinates.row - 1][starCoordinates.column - 0]}${arrayOfLines[starCoordinates.row - 1][starCoordinates.column + 1]}${arrayOfLines[starCoordinates.row - 1][starCoordinates.column + 2]}`);
            allAdjacentValues.push(`${arrayOfLines[starCoordinates.row - 1][starCoordinates.column + 1]}${arrayOfLines[starCoordinates.row - 1][starCoordinates.column + 2]}${arrayOfLines[starCoordinates.row - 1][starCoordinates.column + 3]}`);
        }

        allAdjacentValues.push(`${arrayOfLines[starCoordinates.row + 0][starCoordinates.column - 3]}${arrayOfLines[starCoordinates.row + 0][starCoordinates.column - 2]}${arrayOfLines[starCoordinates.row + 0][starCoordinates.column - 1]}`);
        allAdjacentValues.push(`${arrayOfLines[starCoordinates.row + 0][starCoordinates.column + 1]}${arrayOfLines[starCoordinates.row + 0][starCoordinates.column + 2]}${arrayOfLines[starCoordinates.row + 0][starCoordinates.column + 3]}`);

        if (arrayOfLines[row + 1]) {
            allAdjacentValues.push(`${arrayOfLines[starCoordinates.row + 1][starCoordinates.column - 3]}${arrayOfLines[starCoordinates.row + 1][starCoordinates.column - 2]}${arrayOfLines[starCoordinates.row + 1][starCoordinates.column - 1]}`);
            allAdjacentValues.push(`${arrayOfLines[starCoordinates.row + 1][starCoordinates.column - 2]}${arrayOfLines[starCoordinates.row + 1][starCoordinates.column - 1]}${arrayOfLines[starCoordinates.row + 1][starCoordinates.column - 0]}`);
            allAdjacentValues.push(`${arrayOfLines[starCoordinates.row + 1][starCoordinates.column - 1]}${arrayOfLines[starCoordinates.row + 1][starCoordinates.column - 0]}${arrayOfLines[starCoordinates.row + 1][starCoordinates.column + 1]}`);
            allAdjacentValues.push(`${arrayOfLines[starCoordinates.row + 1][starCoordinates.column - 0]}${arrayOfLines[starCoordinates.row + 1][starCoordinates.column + 1]}${arrayOfLines[starCoordinates.row + 1][starCoordinates.column + 2]}`);
            allAdjacentValues.push(`${arrayOfLines[starCoordinates.row + 1][starCoordinates.column + 1]}${arrayOfLines[starCoordinates.row + 1][starCoordinates.column + 2]}${arrayOfLines[starCoordinates.row + 1][starCoordinates.column + 3]}`);
        }
        console.log(allAdjacentValues)
        // Filter non-whole numbers using regular expressions
        const filteredAdjacentValues = allAdjacentValues.filter(value => {
            const regex = new RegExp(/^\d+$/);
            return regex.test(value);
        });

        let product; // Declare variable to store product

        if (filteredAdjacentValues.length > 1) {
            product = filteredAdjacentValues.reduce((acc, value) => acc * value, 1);
        } else if (filteredAdjacentValues.length === 1) {
            product = filteredAdjacentValues[0];
        } else {
            product = 0;
        }

        valuesToAdd.push(product)

    }

    return valuesToAdd;
};


// let test = allStarsByLine()
// console.log(test[1])
// console.log(checkGear(test[1].starCollection[0].validationCoordinates))
console.log(getValidStars())
let test = getValidStars()
let test2 = scanNumbersAround(test)
console.log(test2)
const solution = test2.reduce(
    (accumulator, current) => Number(accumulator) + Number(current), 0
)
console.log(solution)

