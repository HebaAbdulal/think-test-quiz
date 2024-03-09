const startBtn = document.getElementById("start-game-btn");
const nextBtn = document.getElementById("next-question-btn");






const homePage = document.getElementById("home-page");
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

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < 10) {
        setNextQuestion();
    } else {
        resultsBtn.classList.remove("hide");
    }
});

function startGame() {
    homePage.classList.add("hide");
    startBtn.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    setNextQuestion();
}