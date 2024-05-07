// Import the Node.js file system
import { readFileSync } from 'fs';

// Use the file system to read the text file and encode it in UTF-8
const fileContent = readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, '')).filter((value) => value.length > 0);
const arrayOfInstructions = arrayOfLines.shift().split('')
// The above .shift() method will mutate the arrayOfLines array removing the first element from it.

// Create a function to convert the mapping into a workable material.
const mapConstructor = function () {
    const workArray = []
    arrayOfLines.map((entry) => workArray.push({
        currentlyAt: `${entry[0]}${entry[1]}${entry[2]}`,
        goingLeft: `${entry[7]}${entry[8]}${entry[9]}`,
        goingRight: `${entry[12]}${entry[13]}${entry[14]}`
    }))
    return workArray
}

// Store the workable material in a variable.
const arrayOfPoints = mapConstructor();

// Initialize a set of useful variables.
let numberOfSteps = 0;
let targetInstruction = 0
let currentPoint = null;
let startingPoint = 'AAA';
const arrivalPoint = 'ZZZ';

// Create a for loop running until the currentPoint equals the expected arrivalPoint
for (let i = 0; currentPoint !== arrivalPoint; i++) {
    // Add a logic to reset the set of instructions if it reaches the end of the instruction list.
    if (targetInstruction === arrayOfInstructions.length) { targetInstruction = 0 };
    // When intializing the loop, set the starting point as 'AAA'
    if (i === 0) { currentPoint = startingPoint };
    // Filter the arrayOfPoints to only target the expected point where we are.
    const targetObject = arrayOfPoints.filter((entry) => entry.currentlyAt === currentPoint)[0];
    // Process the instruction left or right.
    arrayOfInstructions[targetInstruction] === 'L' ? currentPoint = targetObject.goingLeft : currentPoint = targetObject.goingRight;
    // Move to the next instruction and increase the number of step
    targetInstruction++;
    numberOfSteps++;
    // console.log(`Attempt looping ${i} - Instruction is ${arrayOfInstructions[targetInstruction]}, arrival point is ${currentPoint}`)
}

// console.log(arrayOfInstructions)
// console.log(arrayOfLines)

// Printing the result out.
console.log(`Processing...`)
console.log(`The amount of necessary steps to reach 'ZZZ' should be ${numberOfSteps}`)