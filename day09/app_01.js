// Import the Node.js file system
import { readFileSync } from 'fs';

// Use the file system to read the text file and encode it in UTF-8
const fileContent = readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, '')).filter((value) => value.length > 0);
const arrayOfSequences = arrayOfLines.map(string => string.split(' ').map(element => element * 1))

console.log(arrayOfLines)
console.log(arrayOfSequences)

const processing = function () {

}
