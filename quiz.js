const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("nxt-btn")

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which HTML element defines the title of a document?",
        choice1: "<title>",
        choice2: "<body>",
        choice3: "<head>",
        choice4: "<html>",
        answer: 1
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        choice1: "name",
        choice2: "legend",
        choice3: "alt",
        choice4: "src",
        answer: 3
    },
    {
        question: " Which doctype is correct for HTML5?",
        choice1: "<html5>",
        choice2: "<!DOCTYPE HTML5>",
        choice3: "<DOCTYPE html>",
        choice4: "<!DOCTYPE html>",
        answer: 4
    },
    {
        question: "Which HTML element is used to specify a footer for a document or section?",
        choice1: "<section>",
        choice2: "<footer>",
        choice3: "<body>",
        choice4: "<div>",
        answer: 2
    },
    {
        question: "In HTML, onblur and onfocus are:",
        choice1: "HTML Elements",
        choice2: "Style attribute",
        choice3: "Event attribute",
        choice4: "pseudo codes",
        answer: 3
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        nextButton.innerText = "Finish";
        nextButton.onclick = () => {
            return window.location.assign("./end.html");
        };
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

    
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            
        }, 1000);
        nextButton.onclick = () => {
            getNewQuestion();
        };
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();

