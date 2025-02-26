let count = 0;
let difficulty = 10;
let selectedOperator = "random";
const difficultySelect = document.getElementById("difficulty");
const operatorSelect = document.getElementById("operators");
const scoreCountBox = document.getElementById("scorecount");
const answersBox = document.querySelector(".answersBox");
const infoBox = document.getElementById("infobox");
const deleteOnLoadScreen = document.getElementById("onloadhero");
const restartBtn = document.getElementById("restartbtn");
const changeDiffBtn = document.getElementById("changediff");
const CreateDiffSelect = document.querySelector(".change");
const answersList = document.createElement("ul");
const skipQuestionBtn = document.getElementById("skipquestion");

difficultySelect.value = "easy";
infoBox.innerHTML = "Difficulty: easy";
//Difficulty selection.
difficultySelect.addEventListener("change", () => {
  if (difficultySelect.value === "easy") {
    difficulty = 10;
  } else if (difficultySelect.value === "medium") {
    difficulty = 50;
  } else if (difficultySelect.value === "hard") {
    difficulty = 100;
  }
  infoBox.innerHTML = `Difficulty: ${difficultySelect.value}`;
});
//Operator selection.
operatorSelect.addEventListener("change", () => {
  selectedOperator = operatorSelect.value;
});

//sets the game up.
const beginfnc = () => {
  deleteOnLoadScreen.style.display = "none";

  quiz(selectedOperator);
};

const quiz = (operator) => {
  const rndNum1 = Math.round(Math.random() * difficulty);
  const rndNum2 = Math.round(Math.random() * difficulty);
  const operators = ["/", "*", "-", "+"];
  let rndOperator =
    operator !== "random"
      ? operator
      : operators[Math.floor(Math.random() * operators.length)];

  //disables the option to divide by 0.
  if (rndOperator === "/") {
    if (rndNum2 === 0 || rndNum1 % rndNum2 !== 0) {
      rndOperator = operators.filter((op) => op !== "/")[
        Math.floor(Math.random() * 3)
      ];
    }
  }

  let result = Math.floor(0);
  if (rndOperator === "+") {
    result = rndNum1 + rndNum2;
  } else if (rndOperator === "-") {
    result = rndNum1 - rndNum2;
  } else if (rndOperator === "/") {
    if (rndNum1 < rndNum2) {
      result = rndNum2 / rndNum1;
    }
    result = rndNum1 / rndNum2;
  } else if (rndOperator === "*") {
    result = rndNum1 * rndNum2;
  }

  const question = document.getElementById("questions");
  question.innerHTML = `${rndNum1} ${rndOperator} ${rndNum2} = ?`;

  const answerInput = document.getElementById("answerInput");
  const submitInput = document.getElementById("checkanswer");

  let fullEquation = `${rndNum1} ${rndOperator} ${rndNum2} = ${result}`;
  submitInput.onclick = () => {
    const userAnswer = parseFloat(answerInput.value);
    if (userAnswer === result) {
      count++;

      // this is where the questions will be shown

      answersList.innerHTML += `<li>${fullEquation}  ✔️ Correct! </li> <hr style="width:100%">`;
      answersBox.appendChild(answersList);

      if (count === 10) {
        answersBox.innerHTML =
          "🎉 Congratulations! You got 10 correct answers.";
        question.innerHTML = "Well done!";
        submitInput.disabled = true;
        answerInput.disabled = true;
        return;
      }
      quiz(operator);
    } else {
      answersList.innerHTML += `<li>❌ Wrong! The correct answer is ${result}</li>`;
      count = Math.max(0, count - 1); // ensure count doesnt go below 0.
    }
    scoreCountBox.innerHTML = count;
    answerInput.value = "";
  };
};
//Skip a question.
skipQuestionBtn.addEventListener("click", () => {
  quiz(selectedOperator);
});
//restart game button.
restartBtn.addEventListener("click", () => {
  count = 0;
  scoreCountBox.innerHTML = count;
  answersList.innerHTML = "";
  deleteOnLoadScreen.style.display = "flex";
  quiz(selectedOperator);
});
//Change difficulty.
changeDiffBtn.addEventListener("click", () => {
  if (
    CreateDiffSelect.style.display === "none" ||
    CreateDiffSelect.style.display === ""
  ) {
    CreateDiffSelect.style.display = "block";
  } else {
    CreateDiffSelect.style.display = "none";
  }

  CreateDiffSelect.addEventListener("change", () => {
    if (CreateDiffSelect.value === "easy") {
      difficulty = 10;
    } else if (CreateDiffSelect.value === "medium") {
      difficulty = 50;
    } else if (CreateDiffSelect.value === "hard") {
      difficulty = 100;
    }
    infoBox.innerHTML = `Difficulty: ${CreateDiffSelect.value}`;
    quiz(selectedOperator);

    setTimeout(() => {
      CreateDiffSelect.style.display = "none";
    }, 4000);
  });
});
