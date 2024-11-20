console.log("load index ts");
console.log("INDEX JS LOADED");
const btnSignIn = document.querySelector("#btn-sign-in");
const loginForm = document.querySelector("#loginForm");
const inputUsername = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const userError = document.querySelector("#userError");
const passError = document.querySelector("#passError");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        validateForm();
    });
}
function validateForm() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const wordKey = "gattini";
    const userValue = String(inputUsername === null || inputUsername === void 0 ? void 0 : inputUsername.value);
    const passwordValue = String(inputPassword === null || inputPassword === void 0 ? void 0 : inputPassword.value);
    let checkUserInput = false;
    let checkUserPassword = false;
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (userValue !== "" && userValue.includes(wordKey) && userValue.length < 20) {
        (_b = (_a = inputUsername === null || inputUsername === void 0 ? void 0 : inputUsername.parentElement) === null || _a === void 0 ? void 0 : _a.closest("fieldset")) === null || _b === void 0 ? void 0 : _b.classList.remove("with-error");
        checkUserInput = true;
    }
    else {
        (_d = (_c = inputUsername === null || inputUsername === void 0 ? void 0 : inputUsername.parentElement) === null || _c === void 0 ? void 0 : _c.closest("fieldset")) === null || _d === void 0 ? void 0 : _d.classList.add("with-error");
        checkUserInput = false;
    }
    if (passwordValue !== "" && passwordValue.length > 8 && passwordValue.length < 20 && format.test(passwordValue)) {
        (_f = (_e = inputPassword === null || inputPassword === void 0 ? void 0 : inputPassword.parentElement) === null || _e === void 0 ? void 0 : _e.closest("fieldset")) === null || _f === void 0 ? void 0 : _f.classList.remove("with-error");
        checkUserPassword = true;
    }
    else {
        (_h = (_g = inputPassword === null || inputPassword === void 0 ? void 0 : inputPassword.parentElement) === null || _g === void 0 ? void 0 : _g.closest("fieldset")) === null || _h === void 0 ? void 0 : _h.classList.add("with-error");
        checkUserPassword = false;
    }
    const rememberme = document.querySelector("#rememberme");
    if (rememberme) {
        const objToSend = {
            username: userValue,
            password: passwordValue,
            rememberme: rememberme.checked
        };
        if (checkUserInput && checkUserPassword && loginForm) {
            loginForm.submit();
        }
        else {
            //alert("form not ok, revise your data");
        }
    }
}
export {};
//# sourceMappingURL=index.js.map