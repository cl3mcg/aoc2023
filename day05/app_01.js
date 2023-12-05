// Import the Node.js file system
const fs = require('fs');

// Use the file system to read the text file and encode it in UTF-8
const fileContent = fs.readFileSync('test_input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, '')).filter((value) => value.length > 0);
// console.log(arrayOfLines);

const seedsArray = arrayOfLines[0].slice(7, arrayOfLines.length - 1).trim().split(' ')
// console.log(seedsArray)

let mapCollection = []
let mapData = { name: null, origin: null, destination: null, ranges: [] }

for (let i = 1; i < arrayOfLines.length; i++) {
    if (isNaN(arrayOfLines[i][0])) {
        if (mapData.name) { mapCollection.push(mapData) }
        mapData = { name: null, origin: null, destination: null, ranges: [] }
        mapData.name = arrayOfLines[i].slice(0, arrayOfLines[i].length - 5).trim()
        mapData.origin = mapData.name.split('-to-')[0]
        mapData.destination = mapData.name.split('-to-')[1]
    } else {
        let lineData = arrayOfLines[i].split(' ')
        lineData = lineData.map(element => Number(element));
        mapData.ranges.push(lineData)
    }
}

console.log(mapCollection)
