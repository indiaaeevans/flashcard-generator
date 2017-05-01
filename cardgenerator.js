var basic = require('./BasicCard.js');
var cloze = require('./ClozeCard.js');
var inquirer = require('inquirer');

// use our constructors to create a set of flashcards
// BASIC FLASHCARDS
var arrayBasic = [new basic("What is the capital of NY?", "NYC"), new basic("What is the capital of NC?", "Raleigh")];

// CLOZE FLASHCARDS
var arrayCloze = [new cloze("NYC is the capital of NY.", "NYC"), new cloze("Raleigh is the capital of NC.", "Raleigh")];

inquirer.prompt([

// Ask the user what type of cards they want to study
  {
    type: "list",
    message: "What type of flashcards would you like to study with?",
    choices: ["Basic", "Cloze"],
    name: "type"
  },

// Once user selects the type...
]).then(function(answer) {
	console.log("==============================================");
  	// If the user chooses basic cards, then we will test them with the basic cards
  	// If the user chooses cloze cards, then we will test them with cloze cards
  	if (answer.type === "Basic") {
    	askquestionBasic();
  	} else {
  		askquestionCloze();
  	}
});

// counter so that we can track which question we are on
var i = 0;

var askquestionBasic = function(){
  	if (i < arrayBasic.length){
  	// use inquirer to show the "front" of each flashcard.  User will guess the answer on the "back"
	  	inquirer.prompt([

	  	{
		    type: "input",
		    message: arrayBasic[i].front,
		    name: "front"
	  	},
		// check if they are correct, and then show the correct answer
		]).then(function(answer) {
			
		  	if (answer.front === arrayBasic[i].back){
		  		console.log(answer.front + " is correct!");
		  	} else {
		  		console.log(answer.front + " is not correct!");
		  		console.log(arrayBasic[i].back + " was the correct answer.")
		  	}
		  	// move to next question
		  	console.log("==============================================");
		  	i++;
			askquestionBasic();
		});
	// if all of the questions are answered		
	} else {
		console.log("You have completed the quiz.");
	}
}

// counter so that we can track which question we are on
var counter = 0;

var askquestionCloze = function(){
  	if (counter < arrayCloze.length){
  		// use inquirer to show "partial" sentence.  User will guess the missing word.
	  	inquirer.prompt([

	  	{
		    type: "input",
		    message: arrayCloze[counter].partial,
		    name: "partial"
	  	},
		// check if they are correct, and then show the correct answer
		]).then(function(answer) {
		  	if (answer.partial === arrayCloze[counter].cloze){
		  		console.log("You are correct!");
		  		console.log(arrayCloze[counter].fullText);
		  	} else {
		  		console.log(answer.partial + " is incorrect!");
		  		console.log(arrayCloze[counter].fullText);
		  	}
		  	// move to next question
		  	console.log("==============================================");
		  	counter++;
			askquestionCloze();
		});
	// if all of the questions are answered	
	} else {
		console.log("You have completed the quiz.");
	}
}
