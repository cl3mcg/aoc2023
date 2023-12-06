// Import the Node.js file system
const fs = require('fs');

// Use the file system to read the text file and encode it in UTF-8
const fileContent = fs.readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, '')).filter((value) => value.length > 0);
const performCleaning = function (array, index) {
    return array[index].split(' ').filter((element) => !isNaN(element) && element.length).map((element) => Number(element))
}
const arrayOfTimes = performCleaning(arrayOfLines, 0)
const arrayOfDistances = performCleaning(arrayOfLines, 1)

console.log(arrayOfLines)
console.log(arrayOfTimes)
console.log(arrayOfDistances)

