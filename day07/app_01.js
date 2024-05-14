// Import the Node.js file system
import { readFileSync } from 'fs';

// Use the file system to read the text file and encode it in UTF-8
const fileContent = readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, '')).filter((value) => value.length > 0);

const cardPointsMap = {
    'A': 23,
    'K': 22,
    'Q': 21,
    'J': 20,
    'T': 19,
    '9': 18,
    '8': 17,
    '7': 16,
    '6': 15,
    '5': 14,
    '4': 13,
    '3': 12,
    '2': 11
}

const getUniqueValues = function (iterable) {
    return Array.from(new Set(iterable));
}

const countOccurrences = function (string) {
    const iterable = string.split('')
    // console.log(`Function countOccurrences is triggered: countOccurrences(${iterable}) `)
    const uniqueValues = getUniqueValues(iterable)
    // Check if 'Four of a kind' or 'Full house'
    if (uniqueValues.length === 2) {
        // check the number of occurence of each unique value in the iterable
        // If four values have the same label
        // return 4 else return 3
        // Thanks Chat GPT:
        const occurrencesMap = iterable.reduce((acc, val) => acc.set(val, (acc.get(val) || 0) + 1), new Map());
        const values = Array.from(occurrencesMap.values());
        return values.includes(4) ? 4 : 3;
    }
    if (uniqueValues.length === 3) {
        // check the number of occurence of each unique value in the iterable
        // If three values have the same label and one value has a different label
        // return 3 else return 2
        // Thanks Chat GPT:
        const occurrencesMap = iterable.reduce((acc, val) => acc.set(val, (acc.get(val) || 0) + 1), new Map());
        const values = Array.from(occurrencesMap.values());
        return values.includes(3) ? 3 : 2;
    }

}

const calculateHandPoints = function (handPassed) {
    if (getUniqueValues(handPassed).length === 1) {
        return 7 // 'Five of a kind'
    }
    if (getUniqueValues(handPassed).length === 2 && countOccurrences(handPassed) === 4) {
        return 6 // 'Four of a kind'
    }
    if (getUniqueValues(handPassed).length === 2 && countOccurrences(handPassed) === 3) {
        return 5 // 'Full house'
    }
    if (getUniqueValues(handPassed).length === 3 && countOccurrences(handPassed) === 3) {
        return 4 // 'Three of a kind'
    }
    if (getUniqueValues(handPassed).length === 3 && countOccurrences(handPassed) === 2) {
        return 3 // 'Two pair'
    }
    if (getUniqueValues(handPassed).length === 4) {
        return 2 // 'One pair'
    }
    if (getUniqueValues(handPassed).length === 5) {
        return 1 // 'High card'
    }
    console.log(`Cannot process calculateHandPoints of ${handPassed}. The result from getUniqueValues(${handPassed}) returns ${getUniqueValues(handPassed)}`)
}


const processHand = function (stringPassed) {
    let handObject = {
        string: null,
        hand: null,
        points: null,
        handPoint: null,
        everyCardPoints: [],
        concatPoints: null,
        ranking: null
    };
    handObject.string = stringPassed;
    handObject.hand = stringPassed.split(' ')[0];
    handObject.points = Number(stringPassed.split(' ')[1]);
    handObject.handPoint = calculateHandPoints(handObject.hand)
    for (let card of handObject.hand) {
        handObject.everyCardPoints.push(cardPointsMap[card])
    }
    handObject.concatPoints = Number(`${handObject.handPoint}${handObject.everyCardPoints.join('')}`)
    return handObject
};



const getAllHands = function (arrayOfLines) {
    let allHands = []
    for (let hand of arrayOfLines) {
        allHands.push(processHand(hand))
    }
    return allHands
}

// const allHands = getAllHands()

const allHandsProcessed = getAllHands(arrayOfLines)

const processRanking = function (allHandsProcessed) {
    const rankedHandsArray = allHandsProcessed.sort((a, b) => a.concatPoints - b.concatPoints)
    for (let hand of rankedHandsArray) {
        hand.ranking = rankedHandsArray.indexOf(hand) + 1
    }
    return rankedHandsArray
}

const allHandsRanked = processRanking(allHandsProcessed)

const getTotalWinnings = function (allHandsRanked) {
    let result = 0
    for (let hand of allHandsRanked) {
        result = result + hand.points * hand.ranking
    }
    return result
}

// console.log(arrayOfLines);
// console.log(getAllHands(arrayOfLines))
// console.log(getAllHands(arrayOfLines)[0].concatPoints())
// console.log(processRanking(allHandsProcessed)[0])
// console.log(getUniqueValues('AAA6T'))
// console.log(processRanking(allHandsProcessed))
// console.log(processRanking(allHandsProcessed)[1])
// console.log(processRanking(allHandsProcessed)[2])
// console.log(processRanking(allHandsProcessed)[3])

// console.log(processRanking(allHandsProcessed))
console.log(`The final result should be: ${getTotalWinnings(allHandsRanked)}`)