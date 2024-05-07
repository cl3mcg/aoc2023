// Man... you can't just check the values of 1,031,184,463 of variables processed through 7 layers of transformtation.
// That will burn the computer and you'll need a dedicated nuclear reactor to process this mess.
// The process attempted in app_02.js is bad. You need to find another solution.
// Instead, do a reverse search. Consider the location value 0, and process the steps backward.
// Consider location as step 7 (the last step).
// Go from location 0, and check if it matches any range provided in step 6 (which is 'humidity').
// If not, break the chain, if it does, than go up one step further.
// Go up the chain of step till the first step which is the seed number.
// I am pretty sure that the answer will be retrieved faster, as you will reduce the number
// of operations


// Import the Node.js file system
import { readFileSync } from 'fs';

// Use the file system to read the text file and encode it in UTF-8
const fileContent = readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, '')).filter((value) => value.length > 0);

const arrayOfSeeds = arrayOfLines[0].slice(7, arrayOfLines.length - 1).trim().split(' ').map((value) => Number(value))

let allSeedsRanges = []

const getAllSeedsRanges = function () {

    let seedsRange = { start: null, end: null }

    for (let i = 0; i < arrayOfSeeds.length; i++) {
        if ((i + 1) % 2 !== 0) {
            let startValue = Number(arrayOfSeeds[i])
            seedsRange.start = startValue
            seedsRange.end = startValue + Number(arrayOfSeeds[i + 1])
            // console.log(`Start value is: ${startValue}`)
            // console.log(`End value is: ${startValue + arrayOfSeeds[i + 1]}`)
            // for (let j = startValue; j < startValue + arrayOfSeeds[i + 1]; j++) {
            //     seedAmount++
            // }
            // console.log(`A total of ${seedAmount} seeds is returned after the processing seed num. ${i + 1}`)
            allSeedsRanges.push(seedsRange)
            seedsRange = { start: null, end: null }
        }
    }

}
getAllSeedsRanges()
// console.log(allSeedsRanges)

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
            rangeStart: null,
            rangeEnd: null
        }
        lineData.range = arrayOfLines[i].split(' ').map(element => Number(element));
        lineData.rangeStart = Number(lineData.range[1]);
        lineData.rangeEnd = Number(lineData.range[0] + lineData.range[2])
        mapData.ranges.push(lineData)

    }

}
mapCollection.push(mapData)
// console.log(mapCollection)
const numberOfSteps = mapCollection.length

// const allLocationsRanges = []

// const getAllLocationsRanges = function () {
//     for (let range of mapCollection[numberOfSteps - 1].ranges) {
//         allLocationsRanges.push([range.range[0], range.range[0] + range.range[2]])
//     }
// }
// getAllLocationsRanges()
// console.log(allLocationsRanges)

const processToPreviousStep = function (locationNumber, i) {
    // console.log(`Function start. Parameters: locationNumber ${locationNumber}, step index ${i}, step name ${mapCollection[i].name} `)
    // console.log(`The value of mapCollection[i].ranges is ${mapCollection[i].ranges}`)
    for (let range of mapCollection[i].ranges) {
        // console.log(`Function compares the value of locationNumber ${locationNumber}, to the destination range ${range.range[0]} to ${range.range[0] + range.range[2]}`)
        if (locationNumber >= range.range[0] && locationNumber <= range.range[0] + range.range[2]) {
            // console.log(`Function matches locationNumber ${locationNumber}, within destination range ${range.range[0]} to ${range.range[0] + range.range[2]}`)
            // console.log(`Function output is ${Number(range.range[1] + (locationNumber - range.range[0]))}`)
            return Number(range.range[1] + (locationNumber - range.range[0]))
        }
        // console.log(`Function doesn't match locationNumber ${locationNumber}, within destination range ${range.range[0]} to ${range.range[0] + range.range[2]}`)
    }
    // console.log(`Function output is ${locationNumber}`)
    return locationNumber
}

let stopAllTheShit = false

const processAllOperations = function () {
    let finalResult = null
    let result = null;
    let iterator = 0
    while (finalResult === null && !stopAllTheShit) {
        iterator++
        for (let j = numberOfSteps; j > 0; j--) {
            if (result === null) {
                // console.log(`Trial with a value of ${iterator} on step ${j}`)
                result = processToPreviousStep(iterator, j - 1)
            } else {
                // console.log(`Trial with a value of ${result} on step ${j}`)
                result = processToPreviousStep(result, j - 1)
            }
        }
        // console.log(`The value of result is ${result}`)
        for (let seedRange of allSeedsRanges) {
            console.log(`Comparing the value of result (${result}) to the array of seed range ${seedRange.start} to ${seedRange.end}`)
            if (result >= seedRange.start && result <= seedRange.end) {
                console.log(`Match ! The result (${result}) seems to be between ${seedRange.start} and ${seedRange.end}`)
                finalResult = result
                stopAllTheShit = true
            }
        }
        result = null
    }
    return iterator;
};

console.log(`Processing...`)
let finalResult = processAllOperations()
console.log(`The final result should be: ${finalResult}`)
