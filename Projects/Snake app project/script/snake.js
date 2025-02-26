import { lossingPopUp } from "./functionality.js";

//mobile controller
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const upArrow = document.getElementById("upArrow");
const downArrow = document.getElementById("downArrow");

//board sizes
const squareSize = 25;
const rows = 20;
const cols = 20;
let context;
//snake properties
let snakeX = squareSize * 5;
let snakeY = squareSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

//apple
let appleX;
let appleY;

let gameOver = false;
let scoreCount = 0;
//create the board and sets the apple randomely
window.onload = () => {
  const board = document.getElementById("board");
  board.height = rows * squareSize;
  board.width = cols * squareSize;
  context = board.getContext("2d");

  appleLocation();
  document.addEventListener("keyup", changeDirection);

  setInterval(update, 1000 / 10); //refreshes the board every 100ms
};
//updates the board and creating the elements on the board
const update = () => {
  if (gameOver) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(appleX, appleY, squareSize, squareSize);
  //snake eats apple conditions
  if (snakeX == appleX && snakeY == appleY) {
    scoreCount++;

    snakeBody.push([appleX, appleY]);

    appleLocation();
  }
  //snake creation and conditions
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  context.fillStyle = "lime";
  snakeX += velocityX * squareSize;
  snakeY += velocityY * squareSize;
  context.fillRect(snakeX, snakeY, squareSize, squareSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], squareSize, squareSize);
  }
  //game over coditions
  if (
    snakeX < 0 ||
    snakeX > cols * squareSize ||
    snakeY < 0 ||
    snakeY > rows * squareSize
  ) {
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
    }
  }
  //Keeps track of the highest score.
  if (gameOver) {
    const highScore = parseInt(localStorage.getItem("highScore"));
    if (scoreCount > highScore) {
      localStorage.setItem("highScore", scoreCount.toString());
    }
    lossingPopUp();
  }
};
//sets the apple on the board randomly
const appleLocation = () => {
  appleX = Math.floor(Math.random() * cols) * squareSize;
  appleY = Math.floor(Math.random() * rows) * squareSize;
};

//a function for controling the movement of the snake.
const changeDirection = (e) => {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};
leftArrow.addEventListener("click", () => {
  if (velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  }
});
downArrow.addEventListener("click", () => {
  if (velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  }
});
rightArrow.addEventListener("click", () => {
  if (velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
});
upArrow.addEventListener("click", () => {
  if (velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  }
});

const restartGame = () => {
  gameOver = false;
  snakeX = squareSize * 5;
  snakeY = squareSize * 5;
  velocityX = 0;
  velocityY = 0;
  snakeBody = [];
  scoreCount = 0;
  appleLocation();
  document.getElementById("scorecount").textContent = scoreCount;
  document.body.style.opacity = 1;
  document.querySelector(".popupbox")?.remove();
};
export { scoreCount, restartGame };
