const questions = [
    {
        text: "Who wins the final fight in the first Rocky movie?",
        choices: ["Rocky Balboa", "Apollo Creed", "It's a draw", "The fight is stopped"],
        correct: 1
    },
    {
        text: "What is the name of the cowboy in Toy Story?",
        choices: ["Buzz Lightyear", "Woody", "Andy", "Rex"],
        correct: 1
    },
    {
        text: "Which movie features a theme park with dinosurs?",
        choices: ["King Kong", "Jurassic Park", "Jaws", "Avatar"],
        correct: 1
    },
    {
        text: "What is the name of Batman's city?",
        choices: ["Metropolis", "Gotham City", "Central City", "Star City"],
        correct: 1
    },
    {
        text: "Who directed the movie Jaws?",
        choices: ["James Cameron", "Christopher Nolan", "Steven Spielberg", "George Lucas"],
        correct: 2
    }
];

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const questionBox = document.getElementById("question-box");
const question = document.getElementById("question");
const answers = document.getElementById("answer-buttons");
const message = document.getElementById("message");
const scoreText = document.getElementById("score");
const questionNumber = document.getElementById("question-number");
const progressBar = document.getElementById("progress-bar");
const nextButton = document.getElementById("next-button");
const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");

let score = 0;
let current = 0;

function startGame() {
    score = 0;
    current = 0;
    scoreText.textContent = score;
    startScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    const item = questions[current];
    question.textContent = item.text;
    questionNumber.textContent = "Question " + (current + 1) + " of " + questions.length;
    progressBar.style.width = ((current + 1) / questions.length * 100) + "%";
    message.textContent = "Choose an answer!";
    nextButton.classList.add("hidden");
    answers.innerHTML = "";

    item.choices.forEach(function(choice, index) {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", function() {
            checkAnswer(index);
        });
        answers.appendChild(button);
    });

    questionBox.animate(
        [{ opacity: 0, transform: "translateY(35px)" },
         { opacity: 1, transform: "translateY(0)" }],
        { duration: 1000, easing: "ease-out" }
    );
}

function checkAnswer(index) {
    const correct = questions[current].correct;
    const buttons = answers.querySelectorAll("button");

    if (index === correct) {
        score++;
        message.textContent = "Correct!";
    } else {
        message.textContent = "Not quite! The green answer is correct.";
    }

    scoreText.textContent = score;
    buttons.forEach(function(button, position) {
        button.disabled = true;
        if (position === correct) button.classList.add("correct");
        else if (position === index) button.classList.add("wrong");
    });
    nextButton.textContent = current === questions.length - 1 ? "See Results" : "Next Question";
    nextButton.classList.remove("hidden");
}

function nextQuestion() {
    current++;
    if (current < questions.length) showQuestion();
    else showResults();
}

function showResults() {
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalScore.textContent = score + " out of " + questions.length + " correct!";
    if (score === questions.length) finalMessage.textContent = "Perfect score! You really know your movies!";
    else if (score >= 3) finalMessage.textContent = "Nice work! You know your stuff!";
    else finalMessage.textContent = "Not bad! Give it another try!";
}

document.getElementById("start-button").addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestion);
document.getElementById("restart-button").addEventListener("click", startGame);