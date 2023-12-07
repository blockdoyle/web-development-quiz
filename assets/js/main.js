// Global variables for all text and divs that change on index.html
var highscoreNumberEl = document.querySelector("#highscore");
var timeLeftEl = document.querySelector("#time-left");
var currentScoreEl = document.querySelector("#current-score");
var highscoreButton = document.getElementById("highscore-button");
var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var startButtonEl = document.getElementById("start-button");
var wholeCard = document.getElementById("question-card-items");
var savedEl = document.getElementById("saved");
// set the question index to 0. this will pull the first question and the set of answers to go with it from the array.
var currentQuestionIndex = 0;
// global variable used to stop the countdown timer
var isDone = false;

// Highscore
// Toggles the highscore window from showing/hiding.
function showHideHighscore() {
  var x = document.getElementById("highscore-window");
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

// Takes the total score and stores it in local storage.
function addHighscoreToLocalStorage(event) {
  event.preventDefault();

  // Get name from input
  var nameValue = document.getElementById("inputText").value;
  var scoreValue = document.getElementById("current-score").textContent;

  var userNameScore = {
    name: nameValue,
    score: scoreValue,
  };

  // Convert userNameScore object as a string
  var jsonUserNameScore = JSON.stringify(userNameScore);

  // Store jsonUserNameScore in localstorage
  localStorage.setItem("userNameScore", jsonUserNameScore);
}

var createHighScoreForm = function () {
  // create the form element for styling
  var form = document.createElement("form");

  var hsTitle = document.createElement("h3");
  hsTitle.textContent = "Enter your name to save your highscore!";
  hsTitle.style.color = "white";
  wholeCard.appendChild(hsTitle);

  // create the input element that takes a users name
  var input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter your name";
  input.id = "inputText";
  form.appendChild(input);

  // create the submit button
  var submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Submit";
  form.append(submitButton);

  // append the form to the wholeCard div
  wholeCard.appendChild(form);

  // send data to addHighscoreToList on submit
  form.addEventListener("submit", addHighscoreToLocalStorage);
};

// Starts countdown from 90 seconds and runs until it reaches 0.
var timeCountdown = function () {
  var timeInterval = setInterval(function () {
    var currentTime = timeLeftEl.textContent;
    if (currentTime > 0 && isDone === false) {
      currentTime--;
      timeLeftEl.textContent = currentTime;
    } else {
      clearInterval(timeInterval);
    }
    // console.log(timeLeftEl.textContent)
  }, 1000);
};

// Main card stuff
// Questions & Answers
const quizQuestions = [
  {
    question: "What did the quick brown fox do?",
    options: [
      "Cut Frank Poole's life support",
      "Jump over the lazy dog",
      "Play Global Thermonuclear Warfare",
      "Run into the TARDIS",
    ],
    correctAnswer: "Jump over the lazy dog",
  },
  {
    question: "Test",
    options: ["Correct", "Incorrect", "Incorrect", "Incorrect"],
    correctAnswer: "Correct",
  },
  // Add more questions as needed
];

// check if the selected answer is the correct answer
function checkAnswer(selected, correct) {
  var currentScore = currentScoreEl.textContent;
  var currentTime = timeLeftEl.textContent;
  var subtractTime = currentTime - 5;
  // if the answer is correct, add 1 to the current score.
  if (selected == correct) {
    currentScore++;
    currentScoreEl.textContent = currentScore;

    // Move to next question
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < quizQuestions.length) {
      // Display the next question
      displayQuestion(quizQuestions[currentQuestionIndex]);
    } else {
      wholeCard.innerHTML = "";
      isDone = true;
      createHighScoreForm();
    }
    // otherwise, remove 5 seconds from the countdown
  } else {
    timeLeftEl.textContent = subtractTime;
  }
}

// create a variable for question-container id.
var questionContainer = document.getElementById("question-container");

// Function to display a question
function displayQuestion(question) {
  questionContainer.textContent = question.question;

  // create a variable for options-container id.
  var optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  // creates a button for each answer in the object array.
  question.options.forEach((option) => {
    var optionElement = document.createElement("button");
    optionElement.textContent = option;
    var result = optionElement.addEventListener("click", () =>
      checkAnswer(option, question.correctAnswer)
    );
    optionsContainer.appendChild(optionElement);
  });
}

function showHideStartButton() {
  var x = document.getElementById("start");
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

function startGame() {
  currentQuestionIndex = 0;
  displayQuestion(quizQuestions[currentQuestionIndex]);
  showHideStartButton();
  timeCountdown();
}

startButtonEl.addEventListener("click", startGame);
// when user clicks "Highscore" on the top-left of the screen, it executes showHideHighscore function
highscoreButton.addEventListener("click", showHideHighscore);
