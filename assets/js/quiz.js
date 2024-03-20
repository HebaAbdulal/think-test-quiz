const startBtn = document.getElementById("start-game-btn");
const nextBtn = document.getElementById("next-question-btn");
const resultsBtn = document.getElementById("show-results-btn");
const questionContainer = document.getElementById("questions-box");
const questionText = document.getElementById("question-text");
const answerBtnsContainer = document.getElementById("answer-buttons-container");
const resultsContainer = document.getElementById("results-container");
const restartBtn = document.getElementById("restart-game-btn");
const homePage = document.getElementById("home-page");
const userNameInput = document.getElementById("username");
let score = 0;

let shuffledQuestions, currentQuestionIndex;

let timerInterval;


import { questions } from './questions.js';

startBtn.addEventListener("click", () => {
    let regex = /^[a-zA-Z]+$/;
    if (userNameInput.value.trim() === "" || userNameInput.value.length > 20 || !regex.test(userNameInput.value)) {
        alert("Please enter your name, less than 20 letters, no numbers, spaces or special characters.")
    } if (userNameInput.value.length <= 20 && regex.test(userNameInput.value)) {
        startGame()
    }
});

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < 15) {
        setNextQuestion();
    } else {
        resultsBtn.classList.remove("hide");
    }
});

function startGame() {
    homePage.classList.add("hide");
    startBtn.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    setNextQuestion();
    const answerButtons = document.querySelectorAll("#answer-buttons-container .btn");
    answerButtons.forEach(button => {
        button.classList.add("font");
    });

}

function startTimer(duration, display, timeoutCallback) {
    let timer = duration;
    timerInterval = setInterval(function () {
        display.textContent = timer;
        if (--timer < 0) {
            clearInterval(timerInterval);
            display.textContent = "Time's up!";
            if (timeoutCallback) {
                timeoutCallback();
            }
        }
    }, 1000); // Update the timer every 1 second
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    clearInterval(timerInterval); // Reset the timer
    if (currentQuestionIndex === 14) { // Check if it's the last question
        startTimer(30, document.getElementById("timer-display"), function () {
            hideQuestion();
            resultsBtn.classList.remove("hide");
        });
    } else {
        startTimer(30, document.getElementById("timer-display"), moveToNextQuestion);
        resultsBtn.classList.add("hide");
    }
}

function hideQuestion() {
    questionContainer.classList.add("hide");
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 20) {
        setNextQuestion();
    } else {
        resultsBtn.classList.remove("hide");
    }
}

function showQuestion(question) {
    const currentQuestionNumber = document.getElementById("current-index");
    currentQuestionNumber.classList.remove("hide");
    currentQuestionNumber.innerText = currentQuestionIndex + 1;

    questionText.innerText = question.question;
    const shuffledAnswers = question.answers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn", "font");
        button.addEventListener("click", selectAnswer);
        answerBtnsContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add("hide");
    resultsBtn.classList.add("hide");
    while (answerBtnsContainer.firstChild) {
        answerBtnsContainer.removeChild(answerBtnsContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.innerText === questions[currentQuestionIndex].correct_answer;
    setStatusClass(selectedButton, correct);
    if (correct) {
        score++;
    } else {
        // Find the correct answer button and change its color to green
        const correctAnswerButton = Array.from(answerBtnsContainer.children).find(button => button.innerText === questions[currentQuestionIndex].correct_answer);
        setStatusClass(correctAnswerButton, true);
    }
    // Remove event listeners from all answer buttons to prevent further clicking
    Array.from(answerBtnsContainer.children).forEach(button => {
        button.removeEventListener("click", selectAnswer);
    });
    if (currentQuestionIndex < 14) {
        nextBtn.classList.remove("hide");
        resultsBtn.classList.add("hide");
    } else {
        resultsBtn.classList.remove("hide");
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

resultsBtn.addEventListener("click", () => {
    questionContainer.classList.add("hide");
    resultsContainer.classList.remove("hide");
    resultsBtn.classList.add("hide");
    showResult();
});

function showResult() {
    document.getElementById("score").textContent = score;
    restartBtn.classList.remove("hide");
    resultsBtn.classList.add("hide");
    clearInterval(timerInterval);
    let player = userNameInput.value;
    document.getElementById("name").innerText = `${player}`;
}

restartBtn.addEventListener("click", () => {
    resultsContainer.classList.add("hide");
    resultsBtn.classList.add("hide");
    score = 0;
    startGame();
});
