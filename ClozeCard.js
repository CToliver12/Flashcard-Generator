//Requires BasicCard constuctor exported from BasicCard .js
var BasicCard = require("./BasicCard.js");

//Construtor function for ClozeCard object creation.
var ClozeCard = function(text, cloze){
	

		//scope-safe constructor 
		//checks if object is a new instance, i.e., includes new operator
		if(this instanceof ClozeCard) {
				this.fullText = text;
				this.cloze = cloze; 

	//Creates partial text for Cloze flashcard 
	this.partial = function(){
		if(this.fullText.includes(this.cloze)){
			return this.fullText.replace(this.cloze, '...');

		} 
		//Broken cloze message returned whend text doesn't contain cloze 
			else {
			var brokenClozeMessage = "Opps! The full text:'" + this.fullText + " 'doesn't contain the cloze: ' "+ this.cloze + "'.";
			return brokenClozeMessage;
	}
};

			//If new operator missing, creates new instance of object correctly
			} else {
			return new ClozeCard (text, cloze);
}

};

//Test BasicCard constructor 
var firstPresident = new BasicCard("Who was te first president of the US?", "George Washington"); 
console.log(firstPresident.front);
console.log(firstPresident.back); 

//Test CLozeCard constructor that works.
var firstPresidentCloze = new ClozeCard("George Washington was the first president of the US.", "George Washington");
console.log(firstPresidentCloze.fullText);
console.log(firstPresidentCloze.cloze);
console.log(firstPresidentCloze.partial()); 

//Test ClozeCard constructor when text doesn't contain cloze 
var errorPresidentCloze = new ClozeCard ("Barack Obama was the 44th President of the US.", "Michelle Obama");
console.log(errorPresidentCloze.fullText);
console.log(errorPresidentCloze.cloze);
console.log(errorPresidentCloze.partial());

//Test constructor is scope-safe
var missingNewCloze = ClozeCard("This exercise is about Presidents.", "Do you have a fav?");
console.log(missingNewCloze.fullText);
console.log(missingNewCloze.cloze); 
console.log(missingNewCloze.partial());

//Export ClozeCard constructor which gets used in main.js 
module.exports = ClozeCard; 