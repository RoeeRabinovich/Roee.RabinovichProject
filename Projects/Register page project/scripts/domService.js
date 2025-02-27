import { User } from "./Users.js";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
// Creating a new user function

const registerUserImplament = (e) => {
  e.preventDefault();
  const username = e.target.elements[0].value;
  const email = e.target.elements[1].value;
  const password = e.target.elements[2].value;
  const users = User.usersList;

  if (
    users.find((user) => user.email === email) ||
    users.find((user) => user.username === username)
  ) {
    alert("This user already exists!");
    e.target.reset();
    return;
  } else if (!passwordRegex.test(password)) {
    alert("Password does not meet the requirments.");
    e.target.reset();
    return;
  } else if (username.length < 7) {
    alert("Username need to be at least 8 characters long.");
    e.target.reset();
  } else {
    alert(`Welcome ${username}!`);
  }
  new User(username, email, password);
  e.target.reset();
};

//Login function
const loginCheck = (e) => {
  e.preventDefault();

  const username = e.target.elements[0].value;
  const password = e.target.elements[1].value;

  const users = User.usersList;
  if (
    users.find((user) => user.username === username) &&
    users.find((user) => user.password === password)
  ) {
    const currentUser = users.find((user) => user.username === username);
    User.login(currentUser.id);
    alert(`Hello ${username}, Welcome Back!`);

    window.location.href =
      "https://roeerabinovich.github.io/Roee.RabinovichProject/";
  } else if (!users.find((user) => user.username === username)) {
    alert("Username does not exist!");
    return;
  } else if (
    users.find((user) => user.username === username) &&
    users.find((user) => user.password !== password)
  ) {
    alert("Password is incorrect!");
    return;
  }

  e.target.reset();
};

//forgot password function

const changePassForm = document.querySelector(".change-password");
const popupInfo = document.getElementById("popup-info");
const confirmUserForm = document.querySelector(".confirm-user");
const xIcon = document.getElementById("x-icon");
const forgotPopup = document.querySelector(".forgot-popup");
const container = document.querySelector(".container");
let currentUserId;

const initiatePassChange = () => {
  confirmUserForm.style.display = "none";
  changePassForm.style.display = "block";
  popupInfo.textContent =
    "Enter a new password an then confirm your new password";
};
const forgotPassword = (e) => {
  let userExists = false;
  const username = e.target.elements[0].value;
  const email = e.target.elements[1].value;

  const users = User.usersList;

  if (
    users.find((user) => user.email === email) ||
    users.find((user) => user.username === username)
  ) {
    currentUserId = users.find((user) => user.username === username).id;
    userExists = true;

    if (userExists) {
      initiatePassChange();
      return;
    }
    return;
  } else if (!userExists) {
    alert("user not existing!");
    return;
  }
};

//change password function

const changePassword = (e) => {
  e.preventDefault();
  const password = e.target[0].value;
  const confirmPassword = e.target[1].value;
  const infoText = document.getElementById("error-info");

  let viablePassword = false;

  if (passwordRegex.test(password)) {
    viablePassword = true;
  }
  if (password !== confirmPassword) {
    infoText.style.color = "red";
    infoText.textContent = "Passwords do not match!";
  } else if (password === confirmPassword) {
    infoText.textContent = "";
  }

  //activate the changePassword method and removes the inputs.
  if (viablePassword && password === confirmPassword) {
    User.changePassword(currentUserId, password);
    const resetButton = document.createElement("reset-btn");
    resetButton.classList.add("btn");
    resetButton.textContent = "Close";
    forgotPopup.appendChild(resetButton);

    changePassForm.style.display = "none";
    popupInfo.textContent = "";
    document.getElementById("popup-header").textContent =
      "Password changed successfully!";
    xIcon.style.display = "none";

    resetButton.addEventListener("click", resetPopupForm);
    return;
  }
};
const resetPopupForm = () => {
  forgotPopup.style.display = "";
  container.style.filter = "";
  location.reload();
};

export { registerUserImplament, loginCheck, forgotPassword, changePassword };
