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

function oldScrabbleScorer(word = "") {
   word = word.toUpperCase();
	let wordPoints = 0;
   
	for (let i = 0; i < word.length; i++) {
      
      for (const pointValue in oldPointStructure) {
         
         if (oldPointStructure[pointValue].includes(word[i])) {
            wordPoints += Number(pointValue);
         }
         
      }
	}
	return wordPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble!\n");
   let word = input.question("Enter a word to score: ");
   return word.toLowerCase();
};

let newPointStructure = transform(oldPointStructure);

function simpleScorer (word = ""){
   return word.length;
};

function vowelBonusScorer(word = ""){
   let score = 0;
   for (let i = 0; i < word.length; i++){
      if (word[i] === "a" ||
         word[i] === "e" ||
         word[i] === "i" ||
         word[i] === "o" ||
         word[i] === "u"){
            score += 3;
         }else {
            score += 1
         }
      }
      return score;
   };
   
function scrabbleScorer (word = ""){
   let score = 0;
   for (i = 0; i < word.length; i++){
      score += newPointStructure[word[i]];
   }
   return score
};
   
const simple = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

const vowelBonus = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

const scrabble = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

   const scoringAlgorithms = [simple, vowelBonus, scrabble];

function scorerPrompt(word) {
   let scorer = Number(input.question(
`Which scoring algorithm would you like to use? 
      
0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `
   ));
   if (scorer === 0){
      console.log(`Score for '${word}': ${scoringAlgorithms[scorer].scorerFunction(word)}`);
   } else if (scorer === 1){
      console.log(`Score for '${word}': ${scoringAlgorithms[scorer].scorerFunction(word)}`);
   } else if (scorer === 2){
      console.log(`Score for '${word}': ${scoringAlgorithms[scorer].scorerFunction(word)}`);
   } else {scorerPrompt(word);}
};

function transform(obj) {
   let newObject = {};
   for (scores in obj){
      for (i = 0; i < obj[scores].length; i++){
         let letter = obj[scores][i].toLowerCase();
         let score = Number(scores);
         newObject[letter] = score; 
      }
   }
   return newObject
};

function runProgram() {
   scorerPrompt(initialPrompt());
}

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
