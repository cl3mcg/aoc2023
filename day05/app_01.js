// Import the Node.js file system
import { readFileSync } from 'fs';

// Use the file system to read the text file and encode it in UTF-8
const fileContent = readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, '')).filter((value) => value.length > 0);

const arrayOfSeeds = arrayOfLines[0].slice(7, arrayOfLines.length - 1).trim().split(' ').map((value) => Number(value))

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
        let lineData = {
            range: null,
            sourceArray: [],
            destinationArray: []
        }
        lineData.range = arrayOfLines[i].split(' ').map(element => Number(element));
        // for (let i = 0; i < lineData.range[2]; i++) {
        //     lineData.sourceArray.push(lineData.range[1] + i)
        //     lineData.destinationArray.push(lineData.range[0] + i)
        // }
        mapData.ranges.push(lineData)
    }
}
mapCollection.push(mapData)
console.log(mapCollection[0].ranges)
const numberOfSteps = mapCollection.length

// console.log(mapCollection[0].ranges)

const processToNextStep = function (seedNumber, i) {
    let output = null
    // console.log(`Function start. Parameters: input ${seedNumber}, step index ${i}, step name ${mapCollection[i].name}`)
    for (let range of mapCollection[i].ranges) {
        if (range.range[1] <= seedNumber && seedNumber < range.range[1] + range.range[2]) {
            // if (range.sourceArray.includes(seedNumber)) {
            // console.log(`It seems that ${seedNumber}, is contained within ${range.sourceArray}`)
            // console.log(`The value returned will be ${range.destinationArray[range.sourceArray.indexOf(seedNumber)]}`)
            output = range.range[0] + (seedNumber - range.range[1])
            break
        } else {
            // console.log(`It seems that ${seedNumber}, is NOT contained within ${range.sourceArray}`)
            // console.log(`The value returned will be ${seedNumber}`)
            output = seedNumber
        }
    }
    // console.log(`Function end. Returned value is ${output}`)
    return output
}

let locationArray = []

for (let i = 0; i < arrayOfSeeds.length; i++) {

    // console.log(`Processing seed with index ${i}, value ${arrayOfSeeds[i]}`)
    const seedNumber = arrayOfSeeds[i]

    let provisionalResult = seedNumber

    for (let j = 0; j < numberOfSteps; j++) {
        // console.log(`Processing the function for step ${j + 1}, ${mapCollection[j].name}`)
        provisionalResult = processToNextStep(provisionalResult, j)
    }
    locationArray.push(provisionalResult)

}

const finalResult = Math.min(...locationArray)
console.log(`The final result should be: ${finalResult}`)


