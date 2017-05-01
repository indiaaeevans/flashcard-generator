// create the constructor for making basic flashcards
// The constructor should accept two arguments: `front` and `back`
// the properties front/back will contain the text of the flashcard
var BasicCard = function(front, back){
	this.front = front,
	this.back = back
}

// define a Node module that exports a constructor for creating basic flashcards
module.exports = BasicCard;