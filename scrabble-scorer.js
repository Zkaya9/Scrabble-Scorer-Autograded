// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function initialPrompt() {
   let word = input.question("Let's play some scrabble!\nEnter a word:");
   return word;
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
		for (const pointValue in oldPointStructure) {
			if (oldPointStructure[pointValue].includes(word[i])) {
				letterPoints += parseInt(pointValue);
			}
		}
	}
	return letterPoints;
}

let simpleScorer = function(word) {
  return word.length; 
};

let vowelBonusScorer = function(word) {
  word = word.toUpperCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    if ("AEIOU".includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
};

let scrabbleScorer = function (word) {
  let score = 0;
  word = word.toLowerCase();
  for (let i = 0; i < word.length; i++) {
     score += newPointStructure[word[i]];
  }
  return score;
};

const scoringAlgorithms = [
  {
     name: 'Simple Score',
     description: 'Each letter is worth 1 point.',
     // scoringFunction: simpleScorer
     scorerFunction: simpleScorer
  },
  {
     name: 'Bonus Vowels',
     description: 'Vowels are 3 pts, consonants are 1 pt.',
     // scoringFunction: vowelBonusScorer
     scorerFunction: vowelBonusScorer
  },
  {
     name: 'Scrabble',
     description: 'The traditional scoring algorithm.',
     // scoringFunction: scrabbleScorer
     scorerFunction: scrabbleScorer
  }
];

//console.log(scoringAlgorithms.length);

function scorerPrompt() {
   console.log("\nWhich scoring algorithm would you like to use?");
  
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    let algorithm = scoringAlgorithms[i];
    console.log(`${i} - ${algorithm.name}: ${algorithm.description}`);
  }
  
  let choice = Number(input.question("Enter 0, 1, or 2: "));

  // console.log("Choice:", choice);
  
  return scoringAlgorithms[choice];
}

function transform(oldPointStructure) {
  let newPointStructure = {};

  for (let pointValue in oldPointStructure) {
    let letters = oldPointStructure[pointValue];
    for (let i = 0; i < letters.length; i++) {
      newPointStructure[letters[i].toLowerCase()] = Number(pointValue);
    }
  }

  return newPointStructure;
}

// Call the transform function and assign its result to newPointStructure
let newPointStructure = transform(oldPointStructure);

// console.log("Scrabble scoring values for:");
// console.log("letter a: ", newPointStructure.a);
// console.log("letter j: ", newPointStructure.j);
// console.log("letter z: ", newPointStructure["z"]);


function runProgram() {
   while (true) {
      let word = initialPrompt();
      if (word === "") {
        break; 
      }
      let algorithm = scorerPrompt();
      let score = algorithm.scorerFunction(word);
      console.log(`\nScore for '${word}': ${score}`);
    }
}


//runProgram();


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
