const passwordAdvisorBox = document.querySelector(".password-advisor");
const passwordInput = document.getElementById("password-input");

//This function show the password advisor box on click and removes it on moushout.
export const showAndRemove = () => {
  passwordAdvisorBox.style.display = "flex";

  passwordInput.addEventListener("keyup", paintAdvisorLines);

  passwordInput.addEventListener("mouseout", () => {
    passwordAdvisorBox.style.display = "none";
  });
};

const paintAdvisorLines = () => {
  //Password length
  if (passwordInput.value.length < 8) {
    document.getElementById("pass-length").style.color = "red";
  } else if (passwordInput.value.length > 8) {
    document.getElementById("pass-length").style.color = "green";
  }
  //Password lower case letter
  if (!passwordInput.value.match(/[a-z]/)) {
    document.getElementById("pass-lower").style.color = "red";
  } else {
    document.getElementById("pass-lower").style.color = "green";
  }

  //Password upper case letter
  if (!passwordInput.value.match(/[A-Z]/)) {
    document.getElementById("pass-upper").style.color = "red";
  } else {
    document.getElementById("pass-upper").style.color = "green";
  }

  //Password special characters
  if (!passwordInput.value.match(/[!@#$%^&*]/)) {
    document.getElementById("pass-special").style.color = "red";
  } else {
    document.getElementById("pass-special").style.color = "green";
  }

  //Password digits
  if (!passwordInput.value.match(/\d/)) {
    document.getElementById("pass-number").style.color = "red";
  } else {
    document.getElementById("pass-number").style.color = "green";
  }
};

//vars for popup
const passwordAdvisorBoxPopup = document.querySelector(".passwordrst-advisor");
const passwordInputPopup = document.getElementById("passwordrst-input");

//same function for the popup version

export const showAndRemovePopup = () => {
  passwordAdvisorBoxPopup.style.display = "flex";

  passwordInputPopup.addEventListener("keyup", paintAdvisorLinesPopup);

  passwordInputPopup.addEventListener("mouseout", () => {
    passwordAdvisorBoxPopup.style.display = "none";
  });
};

const paintAdvisorLinesPopup = () => {
  //Password length
  if (passwordInputPopup.value.length < 8) {
    document.getElementById("pass-lengthpu").style.color = "red";
  } else if (passwordInputPopup.value.length > 8) {
    document.getElementById("pass-lengthpu").style.color = "green";
  }
  //Password lower case letter
  if (!passwordInput.value.match(/[a-z]/)) {
    document.getElementById("pass-lowerpu").style.color = "red";
  } else {
    document.getElementById("pass-lowerpu").style.color = "green";
  }
  //Password upper case letter
  if (!passwordInputPopup.value.match(/[A-Z]/)) {
    document.getElementById("pass-upperpu").style.color = "red";
  } else {
    document.getElementById("pass-upperpu").style.color = "green";
  }

  //Password special characters
  if (!passwordInputPopup.value.match(/[!@#$%^&*]/)) {
    document.getElementById("pass-specialpu").style.color = "red";
  } else {
    document.getElementById("pass-specialpu").style.color = "green";
  }

  //Password digits
  if (!passwordInputPopup.value.match(/\d/)) {
    document.getElementById("pass-numberpu").style.color = "red";
  } else {
    document.getElementById("pass-numberpu").style.color = "green";
  }
};
