// Global variables for all text and divs that change on index.html
var highscoreNumberEl = document.querySelector("#highscore");
var timeLeftEl = document.querySelector("#time-left");
var currentScoreEl = document.querySelector("#current-score");
var correctButton = document.querySelector(".correct");
var incorrectButton = document.querySelector(".incorrect");
var highscoreButton = document.querySelector("#highscore-button");
var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");

// Toggles the highscore window from showing/hiding.
function showHideHighscore () {
    var x = document.getElementById("highscore-window");
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

// Starts countdown from 90 seconds and runs until it reaches 0.
function timeCountdown() {
    currentTime = 90;
    
    var timeInterval = setInterval(function () {
        if (currentTime > 0) {
            currentTime--;
            timeLeftEl.textContent = currentTime;
        } else if (currentTime = 0) {
            timeLeftEl.textContent = "Game Over";
        } else {
            clearInterval(timeInterval);
        }
        // console.log(timeLeftEl.textContent)
    }, 1000);
}

// Takes the total score and stores it in local storage.
function registerHighscore () {
    highscoreNumberEl.textContent = currentScoreEl.textContent;
}

// Gets the current score and adds 1 to it.
function checkAnswer () {

}

// Questions & Answers
const quizQuestions = [
    {
      question: 'What did the quick brown fox do?',
      options: ['Cut Frank Poole\'s life support', 'Jump over the lazy dog', 'Play Global Thermonuclear Warfare', 'Run into the TARDIS'],
      correctAnswer: 'Jump over the lazy dog'
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
      correctAnswer: 'Mars'
    },
    // Add more questions as needed
  ];
  
// Assuming you have an HTML element with an ID of 'question-container'
var questionContainer = document.getElementById('question-container');

// Function to display a question
function displayQuestion(question) {
  questionContainer.textContent = question.question;
  
  // Assuming you have an HTML element with an ID of 'options-container'
  var optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  question.options.forEach(option => {
    var optionElement = document.createElement('button');
    optionElement.textContent = option;
    optionElement.addEventListener('click', () => checkAnswer(option, question.correctAnswer));
    optionsContainer.appendChild(optionElement);
  });
}

// Example usage
displayQuestion(quizQuestions[0]);


correctButton.addEventListener("click", correctAnswer);
incorrectButton.addEventListener("click", incorrectAnswer);
highscoreButton.addEventListener("click", showHideHighscore);