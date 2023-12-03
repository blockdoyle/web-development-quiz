var highScoreEl = document.querySelector("#highscore");
var timeLeftEl = document.querySelector("#time-left");
var currentScoreEl = document.querySelector("#current-score");
var correctButton = document.querySelector(".correct");
var incorrectButton = document.querySelector(".incorrect");

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

function correctAnswer () {
    currentScore = currentScoreEl.textContent
    currentScore++;
    currentScoreEl.textContent = currentScore;
}

correctButton.addEventListener("click", correctAnswer);

timeCountdown();
