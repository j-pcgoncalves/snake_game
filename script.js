// Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

// Define game variables
let snake = [{ x: 10, y: 10 }];
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw Game Map, snake and food
function draw() {
    board.innerHTML = " ";
    drawSnake();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement("div", "snake");

        board.appendChild(snakeElement);
    })
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function startGame() {
    gameStarted = true; // Keep track of a running game
    instructionText.style.display = "none";
    logo.style.display = "none";

    gameInterval = setInterval(() => {
        draw();
    }, gameSpeedDelay);
}

function handleKeyPress(event) {
    if (
        (!gameStarted && event.code === "Space") ||
        (!gameStarted && event.key === " ")
    ) {
        startGame();
    } else {

    }
}

document.addEventListener("keydown", handleKeyPress);