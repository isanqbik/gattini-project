console.log("loaded sign up js")

const randomNumber = String(Math.floor(Math.random() * 999));
console.log(randomNumber);

let btnSign = document.querySelector("#btn-sign");
let signInForm = document.querySelector("#signInForm");

let inputPhoneNumber = document.querySelector("#phone-number");
let inputVerificationNumber = document.querySelector("#verification-number");

let telNumberError = document.querySelector("#telNumberError");
let inputVerificationError = document.querySelector("#inputVerificationError");

let btnGetCode = document.querySelector("#btnGetCode");

let checkUserPhone = false;
let checkUserCode = false;

btnGetCode.addEventListener("click", (e) => {
    e.preventDefault();
    alert(`Copia il tuo codice per entrare, Codice: ${randomNumber}`)
});

signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
});
 
inputPhoneNumber.addEventListener("change", (e) => {
    console.log(e.target.value);
    if (e.target.value) validatePhone();
});
inputVerificationNumber.addEventListener("change", (e) => {
    console.log(e.target.value);
    if (e.target.value) validateCode();
});

function validatePhone(){

    let userPhone = String(inputPhoneNumber.value);
    //let checkUserPhone = false;
    
    let onlyNumbers = "^[0-9]*$";

    if((userPhone != "" && userPhone.length > 7) && (userPhone.match(onlyNumbers))) {
        //telNumberError.classList.remove("with-error");
        //inputPhoneNumber.classList.remove("with-error");
        inputPhoneNumber.parentElement.closest("fieldset").classList.remove("with-error");
        checkUserPhone = true;
    }else{
        //telNumberError.classList.add("with-error");
        //inputPhoneNumber.classList.add("with-error");
        inputPhoneNumber.parentElement.closest("fieldset").classList.add("with-error");
        checkUserPhone = false;
    }
}

function validateCode(){

    let userCode = String(inputVerificationNumber.value);
    //let checkUserCode = false;

    if((userCode === randomNumber)) {
        //inputVerificationError.classList.remove("with-error");
        //inputVerificationNumber.classList.remove("with-error");
        inputVerificationNumber.parentElement.closest("fieldset").classList.remove("with-error");
        checkUserCode = true;
    }else{
        //inputVerificationError.classList.add("with-error");
        //inputVerificationNumber.classList.add("with-error");
        inputVerificationNumber.parentElement.closest("fieldset").classList.add("with-error");
        checkUserCode = false;
    }
}

function validateForm(){

    /*
    let userPhone = String(inputPhoneNumber.value);
    let userCode = String(inputVerificationNumber.value);
    let checkUserPhone = false;
    let checkUserCode = false;

    let onlyNumbers = "^[0-9]*$";

    if((userPhone != "" && userPhone.length > 7) && (userPhone.match(onlyNumbers))) {
        telNumberError.classList.remove("with-error");
        inputPhoneNumber.style.border = "0px solid rgb(176, 0, 0)";
        checkUserPhone = true;
    }else{
        telNumberError.classList.add("with-error");
        inputPhoneNumber.style.border = "1px solid rgb(176, 0, 0)";
        checkUserPhone = false;
    }

    console.log("userCode es " + userCode);
    console.log("Random value es " + randomNumber);
    
    if((userCode === randomNumber)) {
        inputVerificationError.classList.remove("with-error");
        inputVerificationNumber.classList.remove("with-error");
        checkUserCode = true;
    }else{
        inputVerificationError.classList.add("with-error");
        inputVerificationNumber.classList.add("with-error");
        checkUserCode = false;
    }

    const rememberme = document.querySelector("#rememberme");
    //console.log(rememberme.checked);
    */

    if (checkUserPhone && checkUserCode) {
        signInForm.submit();
    } else {
        
        if(!checkUserPhone) {
            //telNumberError.classList.add("with-error");
            //inputPhoneNumber.classList.add("with-error");
            inputPhoneNumber.parentElement.closest("fieldset").classList.add("with-error");
        }
        if(!checkUserCode){
            //inputVerificationError.classList.add("with-error");
            //inputVerificationNumber.classList.add("with-error");
            inputVerificationNumber.parentElement.closest("fieldset").classList.add("with-error");
        }
        
    }
}
