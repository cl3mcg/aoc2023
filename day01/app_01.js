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

// Initialize a for loop
for (let value of arrayOfValues) {
    // Define the empty 'arrayOfDigits' used to store each individual digits contained in 
    // the 'value' from 'arrayOfValues' targeted by the for loop.
    const arrayOfDigits = []
    // Initialize a second for loop used to single out each 'caracter' from the
    // 'value' targeted by the first for loop.
    // Don't forget to trim 'value' !
    for (let caracter of value.trim()) {
        // 'caracter' will always be a string
        // check if isNaN() function returns false and push it to 'arrayOfDigit'
        // isNaN() will return false if the string passed doesn't contain number/digits.
        if (!isNaN(caracter)) {
            arrayOfDigits.push(caracter)
        }
    }
    // If 'arrayOfDigits' only has 1 single digit, concatenate these and
    // use the Number() function to turn it in a number.
    // The obtained number is ultimatly pushed to the 'solutionArray'.
    if (arrayOfDigits.length === 1) {
        solutionArray.push(Number(`${arrayOfDigits[0]}${arrayOfDigits[0]}`))
    }
    // If 'arrayOfDigits' has more than 1 digit, then concatenate the first digit and the
    // last one, then use the Number() function on it to turn it in a number.
    // The obtained number is ultimatly pushed to the 'solutionArray'.
    if (arrayOfDigits.length > 1) {
        solutionArray.push(Number(`${arrayOfDigits[0]}${arrayOfDigits[arrayOfDigits.length - 1]}`))
    }
}

// Declare the 'solution' variable
// Use the .reduce() method on 'solutionArray' to add all the values to each other.
const solution = solutionArray.reduce(
    (accumulator, current) => accumulator + current, 0
)

// Log 'solution' in the console.
console.log(solution);