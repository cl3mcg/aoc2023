// Import the Node.js file system
import { readFileSync } from 'fs';

// Use the file system to read the text file and encode it in UTF-8
// const fileContent = readFileSync('test_input_02.txt', 'utf8');
const fileContent = readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, '')).filter((value) => value.length > 0);
const arrayOfInstructions = arrayOfLines.shift().split('')
// The above .shift() method will mutate the arrayOfLines array removing the first element from it.

// Create a function to convert the mapping into a workable material.
const mapConstructor = function () {
    const workArray = [];
    arrayOfLines.map((entry) => workArray.push({
        currentlyAt: `${entry[0]}${entry[1]}${entry[2]}`,
        goingLeft: `${entry[7]}${entry[8]}${entry[9]}`,
        goingRight: `${entry[12]}${entry[13]}${entry[14]}`
    }));
    return workArray;
}

// Store the workable material in a variable.
const arrayOfPoints = mapConstructor();

// Create a function that retuns an array of all starting point possibilities.
const startingPointArrayConstructor = function () {
    const regexStart = /A$/;
    const workArray = arrayOfPoints.filter((entry) => entry.currentlyAt.match(regexStart))
    return workArray
}

const arrivalPointArrayConstructor = function () {
    const regexStart = /Z$/;
    const workArray = arrayOfPoints.filter((entry) => entry.currentlyAt.match(regexStart))
    return workArray
}

// Create a challenge function to check if the objective is achieved.
const challengeFunction = function (string) {
    const regexEnd = /Z$/;
    return string.match(regexEnd)
}

// Initialize a set of useful variables.

let startingPointArray = startingPointArrayConstructor();
const arrivalPointArray = arrivalPointArrayConstructor();

for (let startingPoint of startingPointArray) {
    const matchingdestinationArray = [];
    let numberOfSteps = 0;
    let targetInstruction = 0
    let currentPoint = null;
    // Create a for loop running until the currentPoint equals the expected arrivalPoint
    for (let i = 0; currentPoint !== startingPoint.currentlyAt; i++) {
        // Add a logic to reset the set of instructions if it reaches the end of the instruction list.
        if (targetInstruction === arrayOfInstructions.length) { targetInstruction = 0 };
        // When intializing the loop, set the starting point as 'AAA'
        if (i === 0) { currentPoint = startingPoint.currentlyAt };
        // Filter the arrayOfPoints to only target the expected point where we are.
        const targetObject = arrayOfPoints.filter((entry) => entry.currentlyAt === currentPoint)[0];
        console.log(targetObject)
        // Process the instruction left or right.
        if (arrayOfInstructions[targetInstruction] === 'L') {
            currentPoint = targetObject.goingLeft
        } else {
            currentPoint = targetObject.goingRight
        };
        // Break the loop if we are back to the starting point
        if (startingPoint.currentlyAt === currentPoint) { break }
        // Move to the next instruction and increase the number of step
        numberOfSteps++;
        console.log(`Solution array lenght is ${matchingdestinationArray.length} - Stating Point: (${startingPoint.currentlyAt} ${startingPointArray.indexOf(startingPoint) + 1}/${startingPointArray.length}) - Attempt looping ${i} - Instruction is ${arrayOfInstructions[targetInstruction]}, arrival point is ${currentPoint}`)
        targetInstruction++;
        if (challengeFunction(currentPoint)) { matchingdestinationArray.push(numberOfSteps) }
    }
}

// Printing out the results
console.log(`Find the LCM of that: ${matchingdestinationArray}`)
console.log(matchingdestinationArray)