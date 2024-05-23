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

function findNextNumberInExponentialSeries(series) {
    // Step 1: Calculate the differences between the numbers in the series
    const differences = series.slice(1).map((num, i) => num - series[i]);

    // Step 2: Use the first two differences to find the a and b values for the exponential function
    const n1 = 1;
    const n2 = 2;
    const d1 = differences[0];
    const d2 = differences[1];

    const b = (d2 / d1) ** (1 / (n2 - n1));
    const a = d1 / (b ** n1);

    // Step 3: Use the exponential function to calculate the next difference
    const nextN = series.length;
    const nextDifference = a * (b ** nextN);

    // Step 4: Add the next difference to the last number in the series to find the next number
    const nextNumber = series[series.length - 1] + nextDifference;

    return nextNumber;
}

for (let sequence of arrayOfSequences) {
    console.log(findNextNumberInExponentialSeries(sequence))
}