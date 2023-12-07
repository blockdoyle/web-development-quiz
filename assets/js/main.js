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

function appendHighscoreToList() {
  // Get the stored highscore from local storage
  var storedHighscore = localStorage.getItem("userNameScore");

  // Check if there's a highscore in local storage
  if (storedHighscore) {
    // Get the stored highscore as a JSON object
    var parsedHighscore = JSON.parse(storedHighscore);

    // Get the current highscore
    var currentHighscore = parseInt(highscoreNumberEl.textContent);

    // Compare with the stored highscore
    if (parsedHighscore.score > currentHighscore) {
      // Create a list item element
      var li = document.createElement("li");

      // Set the text for the list item
      li.textContent = `${parsedHighscore.name}: ${parsedHighscore.score}`;

      // Append the list item to the "saved" list
      var savedList = document.getElementById("saved");
      savedList.appendChild(li);

      // Update the highscore
      highscoreNumberEl.textContent = `${parsedHighscore.score}`;
    }
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
  // clear card elements
  wholeCard.innerHTML = "";

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
  form.addEventListener("submit", appendHighscoreToList);
};

// Starts countdown from 90 seconds and runs until it reaches 0.
var timeCountdown = function () {
  var timeInterval = setInterval(function () {
    var currentTime = timeLeftEl.textContent;
    if (currentTime > 0 && isDone === false) {
      currentTime--;
      timeLeftEl.textContent = currentTime;
    } else {
      isDone = true;
      createHighScoreForm();
      clearInterval(timeInterval);
    }
    // console.log(timeLeftEl.textContent)
  }, 1000);
};

// Main card stuff
// Questions & Answers
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Markup Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<hype>", "<url>"],
    correctAnswer: "<a>",
  },
  {
    question: "What does CSS stand for?",
    options: ["Counter Strike: Source", "Computer Style Sheet", "Creative Style Sheet", "Cascading Style Sheet"],
    correctAnswer: "Cascading Style Sheet",
  },
  {
    question: "How do you select an element with the id 'example' in CSS?",
    options: ["#example", ".example", "element.example", "id.example"],
    correctAnswer: "#example",
  },
  {
    question: "Which programming language is primarily used for client-side scripting in web development?",
    options: ["Java", "Python", "C#", "JavaScript"],
    correctAnswer: "JavaScript",
  },
  {
    question: "What does the 'HTTP' acronym stand for?",
    options: ["HyperText Transfer Protocol", "HyperText Type Protocol", "High Tech Transfer Protocol", "Home Tool Type Protocol"],
    correctAnswer: "HyperText Transfer Protocol",
  },
  {
    question: "In JavaScript, how do you declare a variable?",
    options: ["var x;", "variable x;", "x = var;", "declare x;"],
    correctAnswer: "var x;",
  },
  {
    question: "Which function is used to print content to the console in JavaScript?",
    options: ["console.print()", "log.console()", "print.console()", "console.log()"],
    correctAnswer: "console.log()",
  },
  {
    question: "What is the purpose of the <head> tag in HTML?",
    options: ["To define the main content of the document", "To define a header for the document", "To contain metadata about the document", "To create a navigation bar"],
    correctAnswer: "To contain metadata about the document",
  },
  {
    question: "Which attribute is used to include an external JavaScript file?",
    options: ["src", "link", "href", "script"],
    correctAnswer: "src",
  },
  {
    question: "What is the box model in CSS?",
    options: ["A model for organizing text content", "A model for creating 3D effects", "A model for designing interfaces", "A model describing how elements are spaced and sized"],
    correctAnswer: "A model describing how elements are spaced and sized",
  },
  {
    question: "Which tag is used to create an unordered list in HTML?",
    options: ["<list>", "<ul>", "<ol>", "<li>"],
    correctAnswer: "<ul>",
  },
  {
    question: "What is the purpose of the 'border' property in CSS?",
    options: ["To set the background color", "To define the font style", "To create space around an element", "To define the border around an element"],
    correctAnswer: "To define the border around an element",
  },
  {
    question: "What is the purpose of the 'float' property in CSS?",
    options: ["To move an element to the right", "To make an element float on water", "To create a floating effect", "To specify whether an element should be to the left or right of its container"],
    correctAnswer: "To specify whether an element should be to the left or right of its container",
  },
  {
    question: "Which event is triggered when a user clicks on an HTML element?",
    options: ["onmouseover", "onchange", "onsubmit", "onclick"],
    correctAnswer: "onclick",
  },
  {
    question: "What is the purpose of the 'margin' property in CSS?",
    options: ["To set the space between elements", "To create space inside an element", "To define the outer border of an element", "To set the background color"],
    correctAnswer: "To set the space between elements",
  },
  {
    question: "How do you comment out multiple lines in JavaScript?",
    options: ["/* This is a comment */", "// This is a comment", "<!-- This is a comment -->", "(* This is a comment *)"],
    correctAnswer: "/* This is a comment */",
  },
  {
    question: "Which tag is used to define an image in HTML?",
    options: ["<image>", "<img>", "<picture>", "<photo>"],
    correctAnswer: "<img>",
  },
  {
    question: "What is the purpose of the 'position' property in CSS?",
    options: ["To set the font size", "To define the layout of an element", "To create animation effects", "To specify the type of positioning method used for an element"],
    correctAnswer: "To specify the type of positioning method used for an element",
  },
  {
    question: "Which attribute is used to define the source URL of an iframe element?",
    options: ["url", "src", "link", "href"],
    correctAnswer: "src",
  },
  {
    question: "What is the purpose of the 'opacity' property in CSS?",
    options: ["To set the transparency of an element", "To define the color of an element", "To create a shadow effect", "To set the size of an element"],
    correctAnswer: "To set the transparency of an element",
  },
  {
    question: "Which HTML tag is used to define the structure of an HTML document?",
    options: ["<header>", "<structure>", "<html>", "<document>"],
    correctAnswer: "<html>",
  },
  {
    question: "What is the purpose of the 'font-family' property in CSS?",
    options: ["To set the font color", "To define the font size", "To specify the font used for an element", "To create a bold effect"],
    correctAnswer: "To specify the font used for an element",
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

// starts the game by getting the first question in array
function startGame() {
  currentQuestionIndex = 0;
  displayQuestion(quizQuestions[currentQuestionIndex]);
  showHideStartButton();
  timeCountdown();
}

// calls the startGame function
startButtonEl.addEventListener("click", startGame);
// when user clicks "Highscore" on the top-left of the screen, it executes showHideHighscore function
highscoreButton.addEventListener("click", showHideHighscore);
// get the saved highscore from localstorage
appendHighscoreToList();