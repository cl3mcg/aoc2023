// Import the Node.js file system
import { readFileSync } from 'fs';

// Use the file system to read the text file and encode it in UTF-8
const fileContent = readFileSync('input.txt', 'utf8');

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

const winArray = function (maxTime, distanceRecord) {
    let result = [];
    let distance = 0;
    let speed = 0;
    for (let pushTime = 0; pushTime < maxTime; pushTime++) {
        speed = pushTime
        distance = speed * (maxTime - pushTime)
        if (distance > distanceRecord) {
            result.push(pushTime)
        }
    }
    return result
}

const processOperations = function () {
    let result = null;
    if (arrayOfTimes.length === arrayOfDistances.length) {
        let arrayOfPossibilities = []
        for (let i = 0; i < arrayOfTimes.length; i++) {
            let provisionalResults = winArray(arrayOfTimes[i], arrayOfDistances[i])
            // console.log(provisionalResults)
            arrayOfPossibilities.push(provisionalResults.length)
        }
        result = arrayOfPossibilities.reduce((accumulator, currentValue) => { return accumulator * currentValue }, 1)
    }
    return result
}

const finalResult = processOperations();
console.log(`The final result should be: ${finalResult}`);