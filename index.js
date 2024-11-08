console.log("INDEX JS LOADED");

let btnSignIn = document.querySelector("#btn-sign-in");
let loginForm = document.querySelector("#loginForm");

let inputUsername = document.querySelector("#input-username");
let inputPassword = document.querySelector("#input-password");

let userError = document.querySelector("#userError");
let passError = document.querySelector("#passError");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
});

function validateForm(){

    const wordKey = "gattini";
    let userValue = String(inputUsername.value);
    let passwordValue = String(inputPassword.value);
    let checkUserInput = false;
    let checkUserPassword = false;

    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(userValue != "" && userValue.includes(wordKey) && userValue.length < 20) {
        //userError.classList.remove("with-error");
        //inputUsername.classList.remove("with-error");
        inputUsername.parentElement.closest("fieldset").classList.remove("with-error");
        checkUserInput = true;
    }else{
        //userError.classList.add("with-error");
        //inputUsername.classList.add("with-error");
        inputUsername.parentElement.closest("fieldset").classList.add("with-error");
        checkUserInput = false;
    }

    if((passwordValue != "" && passwordValue.length > 8) && (passwordValue.length  < 20) && (passwordValue.match(format))) {
        //passError.classList.remove("with-error");
        //inputPassword.classList.remove("with-error");
        inputPassword.parentElement.closest("fieldset").classList.remove("with-error");
        checkUserPassword = true;
    }else{
        //passError.classList.add("with-error");
        //inputPassword.classList.add("with-error");
        inputPassword.parentElement.closest("fieldset").classList.add("with-error");
        checkUserPassword = false;
    }

    const rememberme = document.querySelector("#rememberme");
    //console.log(rememberme.checked);

    let objToSend = {
        username: userValue,
        password: passwordValue,
        rememberme: rememberme.checked
    }

    if (checkUserInput && checkUserPassword) {
        loginForm.submit();
    } else {
        //alert("form not ok, revise your data");
    }
}