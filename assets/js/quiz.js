const startBtn = document.getElementById("start-game-btn");
const nextBtn = document.getElementById("next-question-btn");

const questionContainer = document.getElementById("questions-box");
const questionText = document.getElementById("question-text");



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
    if (currentQuestionIndex === 9) { // Check if it's the last question
        startTimer(30, document.getElementById("timer-display"), function() {
            hideQuestion(); // Hide the question and answer buttons when time expires on the last question
            resultsBtn.classList.remove("hide"); // Show the results button if time expires on the last question
        });
    } else {
        startTimer(30, document.getElementById("timer-display"), moveToNextQuestion); // Start a new timer for each question (30 seconds)
        resultsBtn.classList.add("hide"); // Hide the results button in other cases
    }
}

function hideQuestion() {
    questionContainer.classList.add("hide");
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 10) {
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
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answerBtnsContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add("hide");
    while (answerBtnsContainer.firstChild) {
        answerBtnsContainer.removeChild(answerBtnsContainer.firstChild);
    }
}