// Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const scoreOver = document.getElementById("score-over");
const highScoreTextOver = document.getElementById("highScore-over");
const gameOverContainer = document.getElementById("game-over-container");
const restartBtn = document.getElementById("restart-btn");

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();

let highScore = 0;

if (localStorage.getItem("highScore")) {
    highScore = localStorage.getItem("highScore");
} else {
    highScore = 0;
}

let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw Game Map, snake and food
function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore();
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

function move() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();

        increaseSpeed();

        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

function startGame() {
    gameStarted = true; // Keep track of a running game
    instructionText.style.display = "none";
    logo.style.display = "none";

    gameInterval = setInterval(() => {
        move();
        checkCollision();
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
        switch (event.key) {
            case "ArrowUp":
                direction = "up";
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }
}

document.addEventListener("keydown", handleKeyPress);

function increaseSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x: -1, y: -1 }];
    food = generateFood();
    direction = "right";
    gameSpeedDelay = 200;
    updateScore();
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");
}

function stopGame() {
    const currentScore = snake.length - 1;

    clearInterval(gameInterval);
    gameStarted = false;
    gameOverContainer.style.display = "flex";
    scoreOver.textContent = currentScore.toString().padStart(3, "0");
}

function updateHighScore() {
    const currentScore = snake.length - 1;

    if (currentScore > highScore) {
        localStorage.setItem("highScore", currentScore);
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, "0");
    }

    highScoreTextOver.textContent = highScore.toString().padStart(3, "0");
    highScoreText.style.display = "block";
}

function checkLocalStorage() {
    if (highScore != 0) {
        highScoreText.style.display = "block";

        highScoreText.textContent = highScore.toString().padStart(3, "0");
    }
}

checkLocalStorage();

function restartGame() {
    snake = [{ x: 10, y: 10 }];
    gameOverContainer.style.display = "none";

    startGame();
}

restartBtn.addEventListener("click", restartGame);