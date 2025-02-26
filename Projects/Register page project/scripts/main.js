import {
  loginCheck,
  registerUserImplament,
  forgotPassword,
  changePassword,
} from "./domService.js";
import { showAndRemove, showAndRemovePopup } from "./passwordAdvisor.js";

const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");
const passwordInput = document.getElementById("password-input");
const popup = document.querySelector(".forgot-popup");
const passwordInputPopup = document.getElementById("passwordrst-input");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});
loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
//Register function activation.
document
  .querySelector(".register-form")
  .addEventListener("submit", registerUserImplament);

//Login function activation
document.querySelector(".login-form").addEventListener("submit", loginCheck);

//password advisor box
passwordInput.addEventListener("click", showAndRemove);
passwordInputPopup.addEventListener("click", showAndRemovePopup);

//activating the pop up
document.querySelector(".forgot-link").addEventListener("click", () => {
  container.style.filter = "blur(5px)";
  popup.style.display = "block";
  document.getElementById("x-icon").addEventListener("click", () => {
    popup.style.display = "";
    container.style.filter = "";
  });
});
//forgot password function activation
document
  .getElementById("confirm-form")
  .addEventListener("submit", forgotPassword);

//reset password function activation
document
  .getElementById("forgot-form")
  .addEventListener("submit", changePassword);
