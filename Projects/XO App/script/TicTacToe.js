let boardGrid = ["", "", "", "", "", "", "", "", ""];

const gameBoard = document.querySelector(".board");
const infoDisplay = document.getElementById("infobox");
const playCross = document.querySelector(".playcross");
const playCircle = document.querySelector(".playcircle");
const restartBtn = document.getElementById("restatbtn");
let playerChoise = "";
let computerChoise = "";
let currentMove = "";
let squareCount = 0;
let computerTurn = false;
let crossWins = false;
let circleWins = false;
let gameOver = false;

const pickPlayer = () => {
  playCross.addEventListener("click", () => {
    playerChoise = "cross";
    computerChoise = "circle";
    playCircle.disabled = true;
    playCross.disabled = true;
  });
  playCircle.addEventListener("click", () => {
    playerChoise = "circle";
    computerChoise = "cross";
    playCircle.disabled = true;
    playCross.disabled = true;
  });
};
const createBoard = () => {
  gameBoard.innerHTML = "";
  boardGrid = ["", "", "", "", "", "", "", "", ""];
  boardGrid.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.dataset.index = index;
    infoDisplay.textContent = "Choose your player!";
    cellElement.addEventListener("click", addTurn);
    gameBoard.appendChild(cellElement);
  });
  pickPlayer();
};

const addTurn = (e) => {
  if (gameOver || computerTurn) return; //to prevent playing during the computer's turn.

  const cellIndex = e.target.dataset.index;
  if (boardGrid[cellIndex] !== "") return; //prevemt overwriting moves

  const turnDisplay = document.createElement("div");
  turnDisplay.classList.add(playerChoise);

  e.target.appendChild(turnDisplay);
  boardGrid[cellIndex] = playerChoise;

  e.target.removeEventListener("click", addTurn);

  checkScore();
  if (!gameOver && squareCount < 13) {
    computerTurn = true;
    setTimeout(playComputer, 800);
  }
};

const playComputer = () => {
  let emptyCells = boardGrid
    .map((value, index) => (value === "" ? index : null))
    .filter((val) => val !== null);

  if (emptyCells.length === 0) return;

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  const computerMove = document.querySelector(
    `.square[data-index="${randomIndex}"]`
  );
  const turnDisplay = document.createElement("div");
  turnDisplay.classList.add(computerChoise);
  computerMove.appendChild(turnDisplay);
  boardGrid[randomIndex] = computerChoise;

  computerMove.removeEventListener("click", addTurn);
  squareCount++;
  checkScore();

  computerTurn = false;
};
const checkScore = () => {
  if (computerTurn) {
    infoDisplay.textContent = `${playerChoise} turn.`;
  } else {
    infoDisplay.textContent = `${computerChoise} turn.`;
  }

  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //cols
    [0, 4, 8],
    [2, 4, 6], //diagonals
  ];
  let winner = null;

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );

    if (circleWins) {
      winner = "Circle";
    }
  });
  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );

    if (crossWins) {
      winner = "Cross";
    }
  });

  if (winner) {
    gameOver = true;
    infoDisplay.textContent = `${winner} Won!`;
    disableBoard();
    return;
  }
  squareCount++;

  if (squareCount === 13 && !crossWins && !circleWins) {
    gameOver = true;
    infoDisplay.textContent = "Tie";
    disableBoard();
  }
};

//this function disables the board and removes the eventlisteners
const disableBoard = () => {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square) => square.removeEventListener("click", addTurn));
};

//function to restart the game
const restart = () => {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square) => square.remove());
  squareCount = 0;
  playerChoise = "";
  computerChoise = "";
  computerTurn = false;
  crossWins = false;
  circleWins = false;
  gameOver = false;

  createBoard();
  playCircle.disabled = false;
  playCross.disabled = false;
};
createBoard();
restartBtn.addEventListener("click", restart);
