// Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw Game Map, snake and food
function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement("div", "snake");
        setPosition(snakeElement, segment);

        board.appendChild(snakeElement);
    })
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set the position of snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood() {
    if (gameStarted) {
        const foodElement = createGameElement("div", "food");
        setPosition(foodElement, food);

        board.appendChild(foodElement);
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    
    return { x, y };
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