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

// Create a function that retuns an array of all arrival point possibilities.
// const arrivalPointArrayConstructor = function () {
//     const regexStart = /Z$/;
//     const workArray = arrayOfPoints.filter((entry) => entry.currentlyAt.match(regexStart))
//     return workArray
// }

// Create a challenge function to check if the objective is achieved.
const challengeFunction = function (string) {
    const regexEnd = /Z$/;
    return string.match(regexEnd)
}

// Initialize a set of useful variables.

let startingPointArray = startingPointArrayConstructor();
// const arrivalPointArray = arrivalPointArrayConstructor();
const matchingdestinationArray = [];

// for (let startingPoint of startingPointArray) {
//     let numberOfSteps = 0;
//     let targetInstruction = 0
//     let currentPoint = null;
//     let firstMatch = null;
//     // Create a for loop running until the currentPoint equals the expected arrivalPoint
//     for (let i = 0; currentPoint !== startingPoint.currentlyAt; i++) {
//         // Add a logic to reset the set of instructions if it reaches the end of the instruction list.
//         if (targetInstruction === arrayOfInstructions.length) { targetInstruction = 0 };
//         // When intializing the loop, set the starting point as '__A'
//         if (i === 0) { currentPoint = startingPoint.currentlyAt };
//         // Filter the arrayOfPoints to only target the expected point where we are.
//         const targetObject = arrayOfPoints.filter((entry) => entry.currentlyAt === currentPoint)[0];
//         // console.log(targetObject)
//         // Process the instruction left or right.
//         if (arrayOfInstructions[targetInstruction] === 'L') {
//             currentPoint = targetObject.goingLeft
//         } else {
//             currentPoint = targetObject.goingRight
//         };
//         // Move to the next instruction and increase the number of step
//         numberOfSteps++;
//         console.log(`Solution array lenght is ${matchingdestinationArray.length} - Stating Point: (${startingPoint.currentlyAt} ${startingPointArray.indexOf(startingPoint) + 1}/${startingPointArray.length}) - Attempt looping ${i} - Instruction is ${arrayOfInstructions[targetInstruction]}, arrival point is ${currentPoint}`)
//         targetInstruction++;
//         // Evaluate if the solutions are matching the first record to break the loop.
//         if (challengeFunction(currentPoint)) { matchingdestinationArray.push(numberOfSteps) }
//         if (challengeFunction(currentPoint) && !firstMatch) { firstMatch = currentPoint } else if (challengeFunction(currentPoint) && currentPoint === firstMatch) { break }
//         console.log('')
//     }
// }

// // Printing out the results
// console.log(`Find the LCM of that: ${matchingdestinationArray}`)
// console.log(matchingdestinationArray)

// Note:
// After several trials, I noticed that the correct answer is the half of the LCM obtained.
// I have absolutly no idea how I came to this answer, but it works.
// I found out the correct answer was the half of the LCM obtained because when running this script
// on the initial test dataset, I noticed that the answer provided was 12, while the correct answer
// is supposed to be 6 (so half of the result obtained), so I divided the LCM obtained by 2 and gave it a try. It appeared to be the right answer.
// The correct answer is provided by the LCM of this array: 20569,18727,14429,13201,18113,22411 | which is 10921547990923
// The array printed by my scripts is: 20569,41138,18727,37454,14429,28858,13201,26402,18113,36226,22411,44822 | which is 21843095981846
// After checking my code, I noticed that the loop was not breaking at the right time, leading to extra values in the matchingdestinationArray
// Below is a re-write of the function that provides the actual correct answer.

for (let startingPoint of startingPointArray) {
    let numberOfSteps = 0;
    let targetInstruction = 0
    let currentPoint = null;
    let firstMatch = null;
    // Create a for loop running until the currentPoint equals the expected arrivalPoint
    for (let i = 0; currentPoint !== startingPoint.currentlyAt; i++) {
        // Add a logic to reset the set of instructions if it reaches the end of the instruction list.
        if (targetInstruction === arrayOfInstructions.length) { targetInstruction = 0 };
        // When intializing the loop, set the starting point as '__A'
        if (i === 0) { currentPoint = startingPoint.currentlyAt };
        // Filter the arrayOfPoints to only target the expected point where we are.
        const targetObject = arrayOfPoints.filter((entry) => entry.currentlyAt === currentPoint)[0];
        // console.log(targetObject)
        // Process the instruction left or right.
        if (arrayOfInstructions[targetInstruction] === 'L') {
            currentPoint = targetObject.goingLeft
            if (challengeFunction(currentPoint) && !firstMatch) { firstMatch = currentPoint } else if (challengeFunction(currentPoint) && currentPoint === firstMatch) { break }
        } else {
            currentPoint = targetObject.goingRight
            if (challengeFunction(currentPoint) && !firstMatch) { firstMatch = currentPoint } else if (challengeFunction(currentPoint) && currentPoint === firstMatch) { break }
        };
        // Move to the next instruction and increase the number of step
        numberOfSteps++;
        console.log(`Solution array lenght is ${matchingdestinationArray.length} - Stating Point: (${startingPoint.currentlyAt} ${startingPointArray.indexOf(startingPoint) + 1}/${startingPointArray.length}) - Attempt looping ${i} - Instruction is ${arrayOfInstructions[targetInstruction]}, arrival point is ${currentPoint}`)
        targetInstruction++;
        // Evaluate if the solutions are matching the first record to break the loop.
        if (challengeFunction(currentPoint)) { matchingdestinationArray.push(numberOfSteps) }
        console.log('')
    }
}

// Printing out the results
console.log(`Find the LCM of that: ${matchingdestinationArray}`)

// LCM function found online

// Function to find GCD using Euclidean algorithm
const findGCD = function (a, b) {
    if (!b) {
        return a;
    }

    return findGCD(b, a % b);
};

// Function to find LCM of an array of numbers
const findLCM = function (array) {
    let lcm = array[0];

    for (let i = 1; i < array.length; i++) {
        const gcd = findGCD(lcm, array[i]);
        lcm = (lcm * array[i]) / gcd;
    }

    return lcm;
};

const response = findLCM(matchingdestinationArray);
console.log(`The answer should be ${response}`)
