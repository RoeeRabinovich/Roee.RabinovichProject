const onloadChoice = () => {
  //creating text that tells the player to choose between X and O.
  const header = document.createElement("h1");
  header.innerHTML = "Choose a player!";
  const dadDiv = document.querySelector(".topcontainer");

  const playerX = document.getElementById("playerx");
  const playerO = document.getElementById("playero");

  playerX.innerHTML = "X";
  playerO.innerHTML = "O";

  playerX.addEventListener("click", () => {
    playerX.setAttribute("choseX", "true");
    playerO.setAttribute("disabled", "true");
    console.log("you chose player X");
    return true;
  });
  playerO.addEventListener("click", () => {
    playerO.setAttribute("choseO", "true");
    playerX.setAttribute("disabled", "true");
    console.log("you chose player O");
    return true;
  });
  //if the user chose to play O the function will disable the option to choose X.

  if (!dadDiv.contains(header)) {
    dadDiv.appendChild(header);
  }
};
window.onload = onloadChoice();

const boardCreation = () => {
  const newBoard = document.querySelector(".board");

  newBoard.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const newCell = document.createElement("div");
    newCell.className = "cell";
    newBoard.appendChild(newCell);
  }
  return;
};
