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

// Create a challenge function to check if the objective is achieved.
const challengeFunction = function (array) {
    const regexEnd = /Z$/;
    const totalLenght = array.length;
    const challengeLength = array.filter((entry) => entry.match(regexEnd)).length;
    return totalLenght === challengeLength
}

// Create a function to update the point in a starting array
const swapAndReplace = function (array, direction) {
    if (direction === 'L') {
        const arrayOfDestinations = array.map((entry) => entry.goingLeft)
        const updatedArray = arrayOfPoints.filter((entry) => arrayOfDestinations.includes(entry.currentlyAt))
        return updatedArray
    } else {
        const arrayOfDestinations = array.map((entry) => entry.goingRight)
        const updatedArray = arrayOfPoints.filter((entry) => arrayOfDestinations.includes(entry.currentlyAt))
        return updatedArray
    }
}

// Initialize a set of useful variables.
let numberOfSteps = 0;
let targetInstruction = 0
const initialPointArray = startingPointArrayConstructor();
let startingPointArray = null;
let challengeSolved = false;


for (let i = 0; !challengeSolved; i++) {
    // When initializing the loop, set the starting point array as the 'initialPointArray'
    if (i === 0) { startingPointArray = initialPointArray };
    // console.log('startingPointArray is ', startingPointArray)
    // Filter the arrayOfPoints to only target the expected point where we are.
    // const targetObject = arrayOfPoints.filter((entry) => entry.currentlyAt === currentPoint)[0];
    // Process the instruction left or right.
    // arrayOfInstructions[targetInstruction] === 'L' ? currentPoint = targetObject.goingLeft : currentPoint = targetObject.goingRight;
    if (arrayOfInstructions[targetInstruction] === 'L') {
        // console.log('Instruction is LEFT')
        const arrayOfDestination = startingPointArray.map((entry) => entry.goingLeft)
        // console.log('arrayOfDestination is ', arrayOfDestination)
        // console.log('The result of the challenge function is ', challengeFunction(arrayOfDestination))
        challengeFunction(arrayOfDestination) ? challengeSolved = true : startingPointArray = swapAndReplace(startingPointArray, 'L');
    }
    if (arrayOfInstructions[targetInstruction] === 'R') {
        // console.log('Instruction is RIGHT')
        const arrayOfDestination = startingPointArray.map((entry) => entry.goingRight)
        // console.log('arrayOfDestination is ', arrayOfDestination)
        // console.log('The result of the challenge function is ', challengeFunction(arrayOfDestination))
        challengeFunction(arrayOfDestination) ? challengeSolved = true : startingPointArray = swapAndReplace(startingPointArray, 'R');
    }

    // Move to the next instruction and increase the number of step
    // Add a logic to reset the set of instructions if it reaches the end of the instruction list.
    targetInstruction >= arrayOfInstructions.length - 1 ? targetInstruction = 0 : targetInstruction++;
    numberOfSteps++;
    // console.log(`At the end of the loop targetInstruction is `, targetInstruction)
    // console.log(`At the end of the loop numberOfSteps is `, numberOfSteps)
    // console.log('At the end of the loop challengeSolved is ', challengeSolved)
    console.log(`Attempt looping ${i}`)
}

// console.log(arrayOfPoints)
// console.log(startingPointArray)

// Printing out the results
console.log(`The amount of necessary steps to reach all arrivals with a ending 'Z' should be ${numberOfSteps}`)