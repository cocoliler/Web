const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const passwd = document.getElementById("passwd");
const Cpasswd = document.getElementById("Cpasswd");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const isRequiredValid = checkRequired([username, email, passwd, Cpasswd]);
    let isFormValid = isRequiredValid;
    if (isRequiredValid) {
        const isUsernameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(passwd, 6, 25);
        const isPasswordsMatch = checkPasswordMatch(passwd, Cpasswd);

        isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
    }
    if (isFormValid) {
        alert("Registration successful!");
        form.reset();
        document.querySelectorAll(".form-item").forEach((group) => {
            group.className = "form-item";
        });
    }


});

function checkRequired(inputArray) {
    let isValid = true;

    inputArray.forEach((input) => {
        if (input.value.trim() === "") {
            showError(input, `${formatFieldName(input)} is required`)
            isValid = false;
        } else {
            showSuccess(input);
        }
    });
    return isValid;
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${formatFieldName(input)} must be at least ${min} characters.`);
        return false;

    } else if (input.value.length > max) {
        showError(input, `${formatFieldName(input)} must be less than ${max} characters.`);
        return false;
    } else {
        showSuccess(input);
        return true;

    }
}

function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value.trim())) {
        showSuccess(email);
        return true;
    } else {
        showError(email, "email is not valid.");
        return false;
    }
}

function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match.");
        return false;

    } else {
        showSuccess(input2);
        return true;
    }
}

function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-item error";
    const small = formGroup.querySelector("small");
    small.innerText = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-item success";
    const small = formGroup.querySelector("small");
    small.innerText = "";
}