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
    const shuffledAnswers = question.answers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
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
    if (currentQuestionIndex < 9) {
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
    resultsBtn.classList.add("hide");
    questionContainer.classList.add("hide");
    resultsContainer.classList.remove("hide");
    showResult();
});

function showResult() {
    document.getElementById("score").textContent = score;
    let scoreText = document.getElementById("written-scores");
    restartBtn.classList.remove("hide");
    let player = userNameInput.value;
    document.getElementById("name").innerText = `${player}`;
    if (score > 8) {
        scoreText.innerText = `Your performance merits an OUTSTANDING grade.`;
    } else if (score > 6) {
        scoreText.innerText = `Your performance merits an EXCEEDS EXPECTATIONS grade.`; 
    } else if (score > 4) {
        scoreText.innerText = `Your performance merits an ACCEPTABLE grade.`;
    } else if (score > 2) {
        scoreText.innerText = `Your performance merits a POOR grade.`;
    } else if (score > 0) {
        scoreText.innerText = `Your performance merits a DREADFUL grade.`;
    } else {
        scoreText.innerText = `Your performance merits a TROLL grade.`;
    }
}

restartBtn.addEventListener("click", () => {
    resultsContainer.classList.add("hide");
    score = 0;
    startGame();
});
