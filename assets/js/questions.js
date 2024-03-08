const startBtn = document.getElementById("start-game-btn");








const userNameInput = document.getElementById("username");
let score = 0;

let shuffledQuestions, currentQuestionIndex;

let timerInterval;

startBtn.addEventListener("click", () => {
    if (userNameInput.value.trim() === "") {
        alert("Please enter your name");
    } else {
        startGame();
    }
});