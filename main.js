//Requires CLozeCard constructor exported from CLozeCard.js
var ClozeCard = require("./ClozeCard.js"); 

//Requires firebase module, so we can text storage in node 
var firebase = require("firebase"); 

//Initialize Firebase. 
  var config = {
    apiKey: "AIzaSyA7S7DybPnqFaFC2VL8tZDGVHBibC_cqMQ",
    authDomain: "flashcard-generator-b3b68.firebaseapp.com",
    databaseURL: "https://flashcard-generator-b3b68.firebaseio.com",
    projectId: "flashcard-generator-b3b68",
    storageBucket: "flashcard-generator-b3b68.appspot.com",
    messagingSenderId: "882552792181"
  };
  firebase.initializeApp(config);

  //Creates variable to reference the database. 
  var database = firebase.database(); 

  //Uses inquire to add nw cards from command. 
  var inquirer = require('inquirer'); 

  //Captures full text and cloze for cards. 
  var questions = [
  			{
  				type: 'input',
  				name: 'text',
  				message: 'What is the full text for the Cloze Card?',
  				default: function(){
  					return 'Your full text goes here.';
  				}
  			}, 
  			{
  				type: 'input', 
  				name: 'cloze', 
  				message: 'What is the cloze text for the Cloze Card?',
  				default: function(){
  					return 'Part of your full text goes here.'; 
  				}
  			},
  			{
  				type: 'confirm',
  				name: 'askAgain', 
  				message: 'Would you like to to add another Cloze Card?', 
  				default: true
  			}
  			]; 

  //recurssion to keep asking questions
  //Stores new Cloze Card in firebase
  function ask(){
  	inquirer.prompt(questions).then(function(answers){
  		var newCloze = new ClozeCard(answers.text, answers.cloze);
  		var fullText = newCloze.fullText;
  		var cloze = newCloze.cloze;
  		var partialText = newCloze.partial();

  		//Stores new card in firebase database.
   		storeNewCloze(fullText, cloze, partialText);
   		if(answers.askAgain){
  			ask();
   		} else {
   			console.log("Thank you for adding new flashcard(s)! This has been great!");
  		 }
  		});

   	}
  ask();

  //Stores new card in Firebase database 
  function storeNewCloze (fullText, cloze, partialText){
  	database.ref().push({
  		fullText: fullText,
  		cloze: cloze, 
  		partialText: partialText
  	});
  }; 