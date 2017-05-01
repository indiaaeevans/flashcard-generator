
 // create the constructor for making basic flashcards
 // The constructor should accept two arguments: `text` and `cloze`
 var ClozeCard = function(text, cloze){
 	// cloze` property that contains only the cloze-deleted portion of the text
 	this.cloze = cloze,
 	// `fullText` property that contains the full text.
 	this.fullText = text,
 	// `partial` property that contains the partial text (here we replace the cloze text with underscore)
 	this.partial = this.fullText.replace(this.cloze, '_____'),
 	// log an error when the cloze deletion does _not_ appear in the input text
 	this.errorLog = function(){
 		console.log("The cloze text does not appear in the full text provided!")
 	}
 }

 //  Use prototypes to attach these methods, wherever possible.

 // define a Node module that exports a constructor for creating cloze-deletion flashcards
module.exports = ClozeCard;