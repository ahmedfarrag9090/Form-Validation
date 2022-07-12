const form = document.querySelector(".form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function getInputName(input) {
  return input.id[0].toUpperCase() + input.id.slice(1);
}

// input required validation
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    let msg = `${getInputName(input)} is required`;
    input.value.trim() === "" ? showError(input, msg) : showSuccess(input);
  });
}

// input length validation
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getInputName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getInputName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//  Email Validation
function checkEmail(input) {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(String(input.value).trim().toLocaleLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check password&password2 matching

function checkPasswordMatch(input, input2) {
  if (input.value !== input2.value) {
    showError(input2, `Passwords do not match`);
  } else {
    showSuccess(input2);
  }
}

// Handling Error cases
function showError(input, msg) {
  let formControl = input.parentElement;
  formControl.className = "form-control error";
  let small = formControl.querySelector("small");
  small.innerHTML = msg;
}

// Handling Success cases

function showSuccess(input) {
  let formControl = input.parentElement;
  formControl.className = "form-control success";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
