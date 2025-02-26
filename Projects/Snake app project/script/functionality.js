import { scoreCount, restartGame } from "./snake.js";

const scoreCountBox = document.getElementById("scorecount");
const restartBtn = document.getElementById("restartbtn");
const highScoreDisplay = document.getElementById("highestscore");

//Updates the score.
setInterval(() => {
  scoreCountBox.textContent = scoreCount;
}, 100);

//implement the highest score to the page
const highScoreData = parseInt(localStorage.getItem("highScore"));
highScoreDisplay.textContent = highScoreData;

//Create a pop up when you lose.
export const lossingPopUp = () => {
  document.body.style.opacity = 0.5;
  const popUpBox = document.createElement("div");
  const popUpText = document.createElement("p");
  const popUpRstBtn = document.createElement("button");
  popUpRstBtn.classList.add("restartbtn", "popup");
  popUpBox.classList.add("popupbox");

  popUpText.textContent = `Game Over! Your score is: ${scoreCount}. press the restart button and try again!`;
  popUpBox.appendChild(popUpText);
  popUpBox.appendChild(restartBtn);
  document.body.appendChild(popUpBox);

  //Restart button
  popUpRstBtn.addEventListener("click", () => {
    restartGame();
  });
};

//Restart button
restartBtn.addEventListener("click", () => {
  restartGame();
});
