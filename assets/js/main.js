// Global variables for all text and divs that change on index.html
var highscoreNumberEl = document.querySelector("#highscore");
var timeLeftEl = document.querySelector("#time-left");
var currentScoreEl = document.querySelector("#current-score");
var correctButton = document.querySelector(".correct");
var incorrectButton = document.querySelector(".incorrect");
var highscoreButton = document.querySelector("#highscore-button");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("answers");

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
function correctAnswer () {
    // highscore variable
    highscore = highscoreNumberEl.textContent // to be changed to localstorage value
    
    currentScore = currentScoreEl.textContent
    currentScore++;
    currentScoreEl.textContent = currentScore;
    if (currentScore > highscore) {
        registerHighscore(currentScore);
    }
}

// minus 5 points
function incorrectAnswer () {
    currentScore = currentScoreEl.textContent;
    subtractFive = currentScore - 5;
    // if statement to stop score from going past 0
    if (subtractFive <= 0) {
        currentScoreEl.textContent = 0;
    } else {
        currentScoreEl.textContent = subtractFive;
    }
}

// Questions & Answers
var questionsAnswers = {
    question: "What did the quick brown fox do?",
    answer1: "Jump over the lazy dog",
    answer2: "run into the TARDIS",
    answer3: "played Global Thermonucleare Warfare",
    answer4: "cut Frank Poole's life support, while in space"
}

correctButton.addEventListener("click", correctAnswer);
incorrectButton.addEventListener("click", incorrectAnswer);
highscoreButton.addEventListener("click", showHideHighscore);