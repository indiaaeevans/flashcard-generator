var basic = require('./BasicCard.js');
var basicCards = require('./basic.json');
var cloze = require('./ClozeCard.js');
var clozeCards = require('./cloze.json');
var inquirer = require('inquirer');

// use our constructors and json files to create sets of flashcards

// BASIC FLASHCARDS
var arrayBasic = [];
for (let i=0; i < basicCards.randomTrivia.length; i++){
	var newBasic = new basic(basicCards.randomTrivia[i].front, basicCards.randomTrivia[i].back);
	arrayBasic.push(newBasic);
}
// var arrayBasic = [new basic("What is the world's longest river?", "Amazon"), new basic("What is the world's largest ocean?", "Pacific"), new basic("What sensory organ do starfish have at the end of each arm?", "eye")];

// CLOZE FLASHCARDS
var arrayCloze = [];
for (let i=0; i < clozeCards.randomTrivia.length; i++){
	var newCloze = new cloze(clozeCards.randomTrivia[i].fullText, clozeCards.randomTrivia[i].cloze);
	arrayCloze.push(newCloze);
}
// var arrayCloze = [new cloze("The Amazon is the world's longest river.", "Amazon"), new cloze("The Pacific is the world's largest ocean.", "Pacific"), new cloze("Starfish have an eye at the end of each arm.", "eye")];

function selectType(){
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
}

selectType();

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
		// check if user's answer is correct, and then show the correct answer
		]).then(function(answer) {
			
		  	if (answer.front.toLowerCase() === arrayBasic[i].back.toLowerCase()){
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
		console.log("==============================================");
		selectType();
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
		  	if (answer.partial.toLowerCase() === arrayCloze[counter].cloze.toLowerCase()){
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
		selectType();
	}
}
