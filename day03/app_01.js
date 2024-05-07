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

// Parse the file to retrieve all the numbers
const getAllNumbers = function () {
    let linesData = [];
    for (const line of arrayOfLines) {
        let lineData = {
            id: Number(arrayOfLines.indexOf(line) + 1),
            numbers: []
        };
        let number = {
            value: '',
            validationCoordinates: []
        };
        for (let i = 0; i < numberOfColumns; i++) {
            if (!isNaN(line[i])) {
                number.value = `${number.value}${line[i]}`
                number.validationCoordinates.push(
                    { x: arrayOfLines.indexOf(line) - 1, y: i - 1 },
                    { x: arrayOfLines.indexOf(line) - 1, y: i },
                    { x: arrayOfLines.indexOf(line) - 1, y: i + 1 },
                    { x: arrayOfLines.indexOf(line), y: i - 1 },
                    { x: arrayOfLines.indexOf(line), y: i },
                    { x: arrayOfLines.indexOf(line), y: i + 1 },
                    { x: arrayOfLines.indexOf(line) + 1, y: i - 1 },
                    { x: arrayOfLines.indexOf(line) + 1, y: i },
                    { x: arrayOfLines.indexOf(line) + 1, y: i + 1 })
            }
            if (isNaN(line[i]) || i === numberOfColumns - 1 || !line[i]) {
                if (number.value.length > 0) {
                    number.value = Number(number.value.trim())
                    lineData.numbers.push(number);
                    number = {
                        value: '',
                        validationCoordinates: []
                    };
                }
            }
        }
        linesData.push(lineData)
    }
    return linesData
}

const validateCaracter = function (x, y) {

    x = Number(x);
    y = Number(y);

    if (x >= 0 && y >= 0 && x < arrayOfLines.length && y < numberOfColumns) {
        let caracter = arrayOfLines[x][y];
        if (caracter !== '.' && isNaN(caracter)) {
            return true;
        }
    }

    return false
};

const validateNumbers = function () {
    let result = 0
    const allLinesNumbers = getAllNumbers()
    for (let i = 0; i < allLinesNumbers.length; i++) {
        const line = allLinesNumbers[i];
        for (const number of line.numbers) {
            for (const coordinates of number.validationCoordinates) {
                if (validateCaracter(coordinates.x, coordinates.y)) {
                    console.log(`From line num. ${line.id}, the number ${number.value} is flagged !`)
                    result = result + number.value
                    break
                }
            }
        }
    }
    return result
}

console.log(validateNumbers())