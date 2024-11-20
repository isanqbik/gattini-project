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
if (btnGetCode) {
    btnGetCode.addEventListener("click", (e) => {
        e.preventDefault();
        alert(`Copia il tuo codice per entrare, Codice: ${randomNumber}`);
    });
}
if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        validateForm();
    });
}
if (inputPhoneNumber) {
    inputPhoneNumber.addEventListener("change", (e) => {
        const target = e.target;
        console.log(target.value);
        if (target.value)
            validatePhone();
    });
}
if (inputVerificationNumber) {
    inputVerificationNumber.addEventListener("change", (e) => {
        const target = e.target;
        console.log(target.value);
        if (target.value)
            validateCode();
    });
}
function validatePhone() {
    var _a, _b, _c, _d;
    let userPhone = String(inputPhoneNumber === null || inputPhoneNumber === void 0 ? void 0 : inputPhoneNumber.value);
    let onlyNumbers = "^[0-9]*$";
    if ((userPhone != "" && userPhone.length > 7) && (userPhone.match(onlyNumbers))) {
        if (inputPhoneNumber) {
            (_b = (_a = inputPhoneNumber.parentElement) === null || _a === void 0 ? void 0 : _a.closest("fieldset")) === null || _b === void 0 ? void 0 : _b.classList.remove("with-error");
            checkUserPhone = true;
        }
    }
    else {
        if (inputPhoneNumber) {
            (_d = (_c = inputPhoneNumber.parentElement) === null || _c === void 0 ? void 0 : _c.closest("fieldset")) === null || _d === void 0 ? void 0 : _d.classList.add("with-error");
        }
        checkUserPhone = false;
    }
}
function validateCode() {
    var _a, _b, _c, _d;
    let userCode = String(inputVerificationNumber === null || inputVerificationNumber === void 0 ? void 0 : inputVerificationNumber.value);
    if (inputVerificationNumber) {
        if ((userCode === randomNumber)) {
            (_b = (_a = inputVerificationNumber.parentElement) === null || _a === void 0 ? void 0 : _a.closest("fieldset")) === null || _b === void 0 ? void 0 : _b.classList.remove("with-error");
            checkUserCode = true;
        }
        else {
            (_d = (_c = inputVerificationNumber.parentElement) === null || _c === void 0 ? void 0 : _c.closest("fieldset")) === null || _d === void 0 ? void 0 : _d.classList.add("with-error");
            checkUserCode = false;
        }
    }
}
function validateForm() {
    var _a, _b, _c, _d;
    if (checkUserPhone && checkUserCode) {
        signInForm === null || signInForm === void 0 ? void 0 : signInForm.submit();
    }
    else {
        if (!checkUserPhone) {
            if (inputPhoneNumber) {
                (_b = (_a = inputPhoneNumber.parentElement) === null || _a === void 0 ? void 0 : _a.closest("fieldset")) === null || _b === void 0 ? void 0 : _b.classList.add("with-error");
            }
        }
        if (!checkUserCode) {
            if (inputVerificationNumber) {
                (_d = (_c = inputVerificationNumber.parentElement) === null || _c === void 0 ? void 0 : _c.closest("fieldset")) === null || _d === void 0 ? void 0 : _d.classList.add("with-error");
            }
        }
    }
}
export {};
//# sourceMappingURL=signup.js.map