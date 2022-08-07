//DOM elemets 
var startButtonEl = document.querySelector('#start');
var questionEl = document.querySelector('#question');
var answerEl = document.querySelector('#answers');
var startPageEl =  document.querySelector('#startpage');
var scorePageEl = document.querySelector('#score');
var questionConEl = document.querySelector('#questionsContainer');
var correctEl = document.querySelector('#prompt');
var countdownEl = document.querySelector('#countdown');
var scoreAreaEl = document.querySelector('#scoreArea');
var inNameEl = document.querySelector('#inName');
var buttonDivEl = document.querySelector('#saveButton');
var highScoreEl = document.querySelector('#highScores')

//variables 
var timer = 50;
var runningTimer;
var score = 0;
var questionIndex = 0

//questions array
var questions = [
    {question:" What can be placed in a javascript array?",
    answers: [
        {text: " Boolean", correct:false },
        {text: "Numbers and strings", correct:false},
        {text: "Special characters", correct:false },
        {text: "All of the above", correct:true }
    ]
    },
    {question:"What are the different ways a function can be declared in Javascript?",
    answers: [
        {text: "Function Expression", correct:false },
        {text: "Getter Functions", correct:false},
        {text: "Hoisting", correct:false },
        {text: "All of the above", correct:true }
    ]
    },
    {question:"What is an object in javascript?",
    answers: [
        {text: "Contains information about the browser", correct:false },
        {text: "Collection of related data and/or functionality. These usually consist of several variables and functions", correct:true},
        {text: "Marks a block of statements to be executed while a condition is true", correct:false },
        {text: "Declares a variable", correct:false }
    ]
    },
    {question:"What are the different types of string methods",
    answers: [
        {text: "charAt()", correct:false },
        {text: "bconstructor", correct:false},
        {text: "All of the above", correct:true },
        {text: "repeat()", correct:false }
    ]
    },
    {question:"What javascript function returns a random number between a minimun and maximum?",
    answers: [
        {text: "getRndInteger", correct:true },
        {text: "setInterval", correct:false},
        {text: "clearInterval", correct:false },
        {text: "parseInt", correct:false }
    ]
    }
];

// start quiz on click  
function startQuiz() {
    startPageEl.replaceWith(questionConEl)
    startTimer();
    showQAs();
}

//show questions 
function showQAs (){
    questionEl.innerHTML=questions[questionIndex].question
   // loop for answers in questions
    //answerEl.innerHTML = "<ol>";
    
    for (var i = 0; i< questions[questionIndex].answers.length; i++) {
       answerButton(questions[questionIndex].answers[i]); 
    }    

    //answerEl.innerHTML += "</ol>";
}

// make answers into a buton  
function answerButton (answer) {
    var buttonEl = document.createElement('button');
    buttonEl.setAttribute('answer', answer.correct);
    buttonEl.id = answer.text;
    buttonEl.innerText = answer.text;
  
    // once the answer of a button is clicked , then goes to next questions 
    buttonEl.addEventListener("click", nextQuestion);
    
    answerEl.appendChild(buttonEl);
}


//looping through questionIndex
function nextQuestion (event) {
    console.log(nextQuestion);
    var targetEl = event.target;
    
    correctInc(targetEl.getAttribute('answer'));

    deleteButton();
    questionIndex++;
    if (questionIndex < questions.length) {
        showQAs();
    } else {
        gameOver();
    }
}

//deletes the answer buttons so next answers can be displayed
function deleteButton (){
    //loops through the answers array and deletes button
    for (var i = 0; i< questions[questionIndex].answers.length; i++) {
        var buttonId = document.getElementById(questions[questionIndex].answers[i].text);
        buttonId.remove(); 
    }  
    
}

//adjusting time and points based on if answer is correct or wrong 
function correctInc (answer) {
    createText(answer);
    if (answer === "true"){
        score += 5;
    } else {
        timer -= 10;
    }
}

//function for creating a text for correct and wrong answer's
function createText(answer) {
    if (answer === "true") {
        correctEl.innerHTML = "Correct!"
    } else {
        correctEl.innerHTML = "Wrong!"
    }
}

// timer function starts at 50 seconds
function startTimer() {
    countdownEl.innerHTML = "Time:" + timer;
    if (timer <= 0) {
        gameOver();
    } else {
        timer -= 1;
        runningTimer = setTimeout(startTimer, 1000);
    }

}
// game over function
function gameOver() {
    clearInterval(runningTimer);
    countdownEl.innerHTML = "Finished";
    displayScore();
    savedScore ();
}

// once all questions have been answered give me a final score 
function displayScore () {
    questionConEl.replaceWith(scorePageEl);
    scoreAreaEl.innerText = "Final Score:" + score;
     // Create an input element for initials 
    initTextEl = document.createElement("input"); 
    initTextEl.setAttribute("id", "initails-input"); 
    initTextEl.setAttribute("type", "text"); 
    initTextEl.setAttribute("name", "iniatials"); 
    initTextEl.setAttribute("placeholder", "Enter Initials here"); 
      
    inNameEl.appendChild(initTextEl);


    // create save button elements
    saveButtonEl = document.createElement("button");
    saveButtonEl.setAttribute("id" , "save-btn");
    saveButtonEl.setAttribute("class" ,"save-btn");
    saveButtonEl.setAttribute("type" , "submit");
    saveButtonEl.textContent = "Save Score";

    inNameEl.appendChild(saveButtonEl);

    inNameEl.addEventListener("submit", viewHighScores);
}

function viewHighScores (e) { 
  e.preventDefault();
    var name = document.querySelector("#initails-input").value;
    savedInit(name);
    
    scorePageEl.replaceWith(highScoreEl)
    loadSaveScores();
  
}


//function to save task in local storage 
var savedScore = function() {
    localStorage.setItem("score", JSON.stringify(score));
}
var savedInit = function(initails) {
    localStorage.setItem("initails", JSON.stringify(initails));
}

// gets tasks from local storage and load them
function loadSaveScores() {
    // get tasks items from local stroage
    var savedScore = localStorage.getItem("score");
    var savedInit = localStorage.getItem("initails");

    savedScore  = JSON.parse(savedScore);
    savedInit = JSON.parse(savedInit);

    document.getElementById("highScores").innerHTML = savedInit + " - " + savedScore;
   
}   


//event listeners
startButtonEl.addEventListener("click", startQuiz);