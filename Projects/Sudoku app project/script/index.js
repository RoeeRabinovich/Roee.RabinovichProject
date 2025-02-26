const infobox = document.getElementById("infobox");
const boardGrid = document.querySelector(".boardgrid");
const digitsBox = document.getElementById("digitsbox");
const errorCount = document.getElementById("errors");
const newGameBtn = document.getElementById("newGameBtn");
const removeNumberBtn = document.getElementById("removeNumberBtn");

let removeMode = false;
let numSelected = null;
const MAX_MISTAKES = 5;

//Fetching the data from the api
const createGame = async () => {
  try {
    const cachedBoard = localStorage.getItem("sudokuBoard");
    if (cachedBoard) {
      return JSON.parse(cachedBoard);
    }

    const requestGame = await fetch("https://sudoku-api.vercel.app/api/dosuku");
    const data = await requestGame.json();
    const { value: newBoard, solution, difficulty } = data.newboard.grids[0];

    try {
      localStorage.setItem("sudokuBoard", JSON.stringify(newBoard));
      localStorage.setItem("sudokuSolution", JSON.stringify(solution));
      localStorage.setItem("sudokuDifficulty", JSON.stringify(difficulty));
    } catch (storageError) {
      console.error("Storage error:", storageError);
    }

    return newBoard;
  } catch (err) {
    console.log("Error in createGame:", err);
    infobox.innerText = "Failed to load game, Please refresh.";
    return null;
  }
};

//Generating a new board
createGame().then((newBoard) => {
  newBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const tile = document.createElement("div");
      tile.dataset.row = rowIndex;
      tile.dataset.col = colIndex;
      tile.classList.add("square");
      if (rowIndex % 3 === 2) tile.classList.add("horizontal-line");
      if (colIndex % 3 === 2) tile.classList.add("vertical-line");

      tile.textContent = cell !== 0 ? cell : "";
      if (tile.textContent != "") {
        tile.classList.add("tilestart");
      }

      tile.addEventListener("click", selectTile);

      boardGrid.appendChild(tile);
    });
  });
  //appending the difficulty to the infobox
  const cachedDifficulty = localStorage.getItem("sudokuDifficulty");
  infobox.innerText = `Difficulty: ${JSON.parse(cachedDifficulty)}.`;

  //Adding 1-9 to the .bottomarea using a for loop.
  for (let i = 1; i <= 9; i++) {
    const number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.classList.add("number");
    number.addEventListener("click", selectNumber);
    digitsBox.appendChild(number);
  }
});
//checks for mistakes and if the solution is correct.
const checkMistakes = () => {
  const solution = JSON.parse(localStorage.getItem("sudokuSolution"));
  const removeableTiles = document.querySelectorAll(".square:not(.tilestart)");

  let incorrectCells = 0;
  let isCorrect = true;

  removeableTiles.forEach((tile) => {
    const row = parseInt(tile.dataset.row);
    const col = parseInt(tile.dataset.col);
    const playerInput = tile.innerText ? parseInt(tile.innerText) : 0;
    const correctNumber = solution[row][col];

    if (playerInput && playerInput !== correctNumber) {
      tile.classList.add("incorrect-tile");
      incorrectCells++;
      isCorrect = false;
    } else if (playerInput && playerInput === correctNumber) {
      tile.classList.remove("incorrect-tile");
      tile.classList.add("correct-tile");
    } else {
      isCorrect = false;
    }
  });
  if (incorrectCells === MAX_MISTAKES) {
    infobox.innerText = `You lost! ${incorrectCells} incorrect cells, Try Again!`;
  } else if (isCorrect) {
    infobox.innerText = "Congratulations you won!";
  }
  errorCount.innerText = `Mistakes : ${incorrectCells}`;
};
boardGrid.addEventListener("click", checkMistakes);

const selectNumber = (e) => {
  if (numSelected) {
    numSelected.classList.remove("selectednumber");
  }
  numSelected = e.target;
  e.target.classList.add("selectednumber");
};

//enables the remove number button
const enableRemoveMode = () => {
  removeMode = true;
};
//made for removing a selected number,i made so in the mobile version it will be possible to use it instead of right clicking.
const removeNumber = (e) => {
  const tile = e.target;
  if (tile.classList.contains("tilestart")) return;

  if (removeMode && tile.innerText !== "") {
    tile.innerText = "";
    tile.classList.remove("incorrect-tile", "correct-tile");
    removeMode = false;
  }
};

//a function for selecting a number and inserting it into the board
const selectTile = (e) => {
  const tile = e.target;
  if (tile.classList.contains("tilestart" || !numSelected)) return;

  if (removeMode) {
    removeNumber(e);
    return;
  }

  tile.innerText = numSelected.id;
  //enables right click to remove a tile.
  boardGrid.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (e.button === 2) {
      if (!e.target.classList.contains("tilestart")) {
        e.target.innerText = "";
        return;
      }
    }
  });
};
removeNumberBtn.addEventListener("click", enableRemoveMode);

//a function to generate a new game
if (newGameBtn) {
  newGameBtn.addEventListener("click", () => {
    localStorage.removeItem("sudokuBoard");
    location.reload();
  });
}

//Made this just to check if the checkMistakes function works...
/*
const fillSolution = () => {
  const solution = JSON.parse(localStorage.getItem("sudokuSolution"));
  const removableTiles = document.querySelectorAll(".square:not(.tilestart)");

  removableTiles.forEach((tile) => {
    const row = parseInt(tile.dataset.row);
    const col = parseInt(tile.dataset.col);
    tile.innerText = solution[row][col];
    tile.classList.remove("incorrect-tile");
    tile.classList.add("correct-tile");
  });

  checkMistakes();
};

const fillSolutionButton = document.createElement("button");
fillSolutionButton.innerText = "Auto-Solve";
fillSolutionButton.addEventListener("click", fillSolution);
document.body.appendChild(fillSolutionButton);
*/
