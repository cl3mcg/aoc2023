// Import the Node.js file system
import { readFileSync } from 'fs';

// Use the file system to read the text file and encode it in UTF-8
const fileContent = readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, '')).filter((value) => value.length > 0);
const performCleaning = function (array, index) {
    return array[index].split(' ').filter((element) => !isNaN(element) && element.length).join('')
}
const time = performCleaning(arrayOfLines, 0)
const distance = performCleaning(arrayOfLines, 1)

console.log(arrayOfLines)
console.log(`Time registered is ${time}`)
console.log(`Distance registered is ${distance}`)

const winFunction = function (maxTime, distanceRecord) {
    let result = 0;
    let distance = 0;
    let speed = 0;
    for (let pushTime = 0; pushTime < maxTime; pushTime++) {
        speed = pushTime
        distance = speed * (maxTime - pushTime)
        if (distance > distanceRecord) {
            result++
        }
    }
    return result
}

const finalResult = winFunction(time, distance)
console.log(`The final result should be: ${finalResult}`)