// Import the Node.js file system
const fs = require('fs');

// Use the file system to read the text file and encode it in UTF-8
const fileContent = fs.readFileSync('input.txt', 'utf8');

// Create an array using the array.split() method
// Split is performed using the carriage return as a separator
const arrayOfLines = fileContent.split('\n').map(line => line.replace(/\r$/, '')).filter((value) => value.length > 0);

const cardPointsMap = {
    'A': 23,
    'K': 22,
    'Q': 21,
    'T': 19,
    '9': 18,
    '8': 17,
    '7': 16,
    '6': 15,
    '5': 14,
    '4': 13,
    '3': 12,
    '2': 11,
    'J': 10,
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
        // Thanks Chat GPT, fuck it...
        const occurrencesMap = iterable.reduce((acc, val) => acc.set(val, (acc.get(val) || 0) + 1), new Map());
        const values = Array.from(occurrencesMap.values());
        return values.includes(4) ? 4 : 3;
    }
    if (uniqueValues.length === 3) {
        // check the number of occurence of each unique value in the iterable
        // If three values have the same label and one value has a different label
        // return 3 else return 2
        // Thanks Chat GPT, fuck it...
        const occurrencesMap = iterable.reduce((acc, val) => acc.set(val, (acc.get(val) || 0) + 1), new Map());
        const values = Array.from(occurrencesMap.values());
        return values.includes(3) ? 3 : 2;
    }

}

const getJokerIndexes = function (iterable) {
    // Thanks Chat GPT, fuck it again...
    return iterable.reduce((indexes, currentValue, currentIndex) => {
        if (currentValue === 'J') {
            indexes.push(currentIndex);
        }
        return indexes;
    }, []);
};

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


const maxOutHand = function (handPassed, handScore, indexesOfJokers, currentIndex = 0, mutatedHand = handPassed.split('')) {
    if (currentIndex === indexesOfJokers.length) {
        let mutatedHandPoint = calculateHandPoints(mutatedHand.join(''));
        let everyMutatedCardPoints = [];
        for (let card of mutatedHand) {
            everyMutatedCardPoints.push(cardPointsMap[card]);
        }
        let concatPoints = Number(`${mutatedHandPoint}${everyMutatedCardPoints.join('')}`);
        if (concatPoints > handScore) {
            return { maxedHand: mutatedHand.join(''), maxedScore: concatPoints };
        }
        return { maxedHand: null, maxedScore: handScore };
    }

    let maxedHand = null;
    let maxedScore = handScore;
    let index = indexesOfJokers[currentIndex];

    for (let possibility of Object.keys(cardPointsMap)) {
        mutatedHand[index] = possibility;
        let result = maxOutHand(handPassed, handScore, indexesOfJokers, currentIndex + 1, mutatedHand);
        if (result.maxedScore > maxedScore) {
            maxedScore = result.maxedScore;
            maxedHand = result.maxedHand;
        }
    }
    return { maxedHand, maxedScore };
};

const processHand = function (stringPassed) {
    let handObject = {
        string: null,
        hand: null,
        points: null,
        handPoint: null,
        everyCardPoints: [],
        concatPoints: null,
        maxHand: null,
        maxHandPoint: null,
        maxEveryCardPoints: [],
        maxConcatPoints: null,
        ranking: null
    };

    // Processing "normal card data"
    handObject.string = stringPassed;
    handObject.hand = stringPassed.split(' ')[0];
    handObject.maxHand = null;
    handObject.points = Number(stringPassed.split(' ')[1]);
    handObject.handPoint = calculateHandPoints(handObject.hand)
    for (let card of handObject.hand) {
        handObject.everyCardPoints.push(cardPointsMap[card])
    }
    handObject.concatPoints = Number(`${handObject.handPoint}${handObject.everyCardPoints.join('')}`)


    // Processing "mutated card data"
    if (handObject.hand.includes('J')) {
        const indexesOfJokers = getJokerIndexes(handObject.hand.split(''));
        const result = maxOutHand(handObject.hand, handObject.concatPoints, indexesOfJokers);
        handObject.maxHand = result.maxedHand;
        handObject.maxHandPoint = calculateHandPoints(result.maxedHand);
        for (let card of result.maxedHand) {
            handObject.maxEveryCardPoints.push(cardPointsMap[card]);
        }
        // handObject.maxConcatPoints = result.maxedScore;
        handObject.maxConcatPoints = Number(`${handObject.maxHandPoint}${handObject.everyCardPoints.join('')}`)
    } else {
        handObject.maxHand = handObject.hand
        handObject.maxHandPoint = handObject.handPoint
        handObject.maxEveryCardPoints = handObject.everyCardPoints
        handObject.maxConcatPoints = handObject.concatPoints
    }
    return handObject
};



const getAllHands = function (arrayOfLines) {
    let allHands = []
    for (let hand of arrayOfLines) {
        allHands.push(processHand(hand))
    }
    return allHands
}

const allHandsProcessed = getAllHands(arrayOfLines)

const processRanking = function (allHandsProcessed) {
    const rankedHandsArray = allHandsProcessed.sort((a, b) => a.maxConcatPoints - b.maxConcatPoints)
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
// console.log(getAllHands(arrayOfLines)[0])
// console.log(getAllHands(arrayOfLines)[1])
// console.log(getAllHands(arrayOfLines)[0].concatPoints())
// console.log(processRanking(allHandsProcessed)[0])
// console.log(getUniqueValues('AAA6T'))
// console.log(processRanking(allHandsProcessed))
// console.log(processRanking(allHandsProcessed)[0])
// console.log(processRanking(allHandsProcessed)[1])
// console.log(processRanking(allHandsProcessed)[2])
// console.log(processRanking(allHandsProcessed)[3])
// console.log(processRanking(allHandsProcessed)[4])

// console.log(processRanking(allHandsProcessed))

console.log(`The final result should be: ${getTotalWinnings(allHandsRanked)}`)