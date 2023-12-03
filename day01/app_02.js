// Import the Node.js file system
const fs = require('fs');

// Use the file system to read the text file and encode it in UTF-8
const fileContent = fs.readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfValues = fileContent.split('\n');

// Define a array used to store the digits extracted from
// each value stored in the arrayOfValues 
let solutionArray = []

const replacementObject = {
    'one': 'o1e',
    'two': 't2o',
    'three': 't3e',
    'four': 'f4r',
    'five': 'f5e',
    'six': 's6x',
    'seven': 's7n',
    'eight': 'e8t',
    'nine': 'n9e'
}

const numbersArray = Object.keys(replacementObject);

for (let value of arrayOfValues) {
    value = value.trim();
    for (let number of numbersArray) {
        for (let i = 0; i < 10; i++) {
            if (value.includes(number)) {
                value = value.replace(number, replacementObject[number]);
            } else {
                break
            }
        }
    }
    const arrayOfDigits = []
    for (let caracter of value.trim()) {
        if (!isNaN(caracter)) {
            arrayOfDigits.push(caracter)
        }
    }

    if (arrayOfDigits.length === 1) {
        solutionArray.push(Number(`${arrayOfDigits[0]}${arrayOfDigits[0]}`))
    }

    if (arrayOfDigits.length > 1) {
        solutionArray.push(Number(`${arrayOfDigits[0]}${arrayOfDigits[arrayOfDigits.length - 1]}`))
    }
}

const solution = solutionArray.reduce(
    (accumulator, current) => accumulator + current, 0
)

console.log(solution);