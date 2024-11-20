console.log("load index ts");

console.log("INDEX JS LOADED");

const btnSignIn:HTMLButtonElement | null = document.querySelector("#btn-sign-in") as HTMLButtonElement | null;
const loginForm:HTMLFormElement | null = document.querySelector("#loginForm") as HTMLFormElement | null;

const inputUsername: HTMLInputElement | null = document.querySelector("#input-username") as HTMLInputElement | null;
const inputPassword: HTMLInputElement | null = document.querySelector("#input-password") as HTMLInputElement | null;

const userError:HTMLElement | null = document.querySelector("#userError") as HTMLElement | null;
const passError:HTMLElement | null = document.querySelector("#passError") as HTMLElement | null;

if (loginForm) {
    loginForm.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        validateForm();
    });
}

function validateForm(): void {
    const wordKey:string = "gattini";
    const userValue = String(inputUsername?.value);
    const passwordValue = String(inputPassword?.value);
    let checkUserInput:boolean = false;
    let checkUserPassword:boolean = false;

    const format:RegExp = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (userValue !== "" && userValue.includes(wordKey) && userValue.length < 20) {
        inputUsername?.parentElement?.closest("fieldset")?.classList.remove("with-error");
        checkUserInput = true;
    } else {
        inputUsername?.parentElement?.closest("fieldset")?.classList.add("with-error");
        checkUserInput = false;
    }

    if (passwordValue !== "" && passwordValue.length > 8 && passwordValue.length < 20 && format.test(passwordValue)) {
        inputPassword?.parentElement?.closest("fieldset")?.classList.remove("with-error");
        checkUserPassword = true;
    } else {
        inputPassword?.parentElement?.closest("fieldset")?.classList.add("with-error");
        checkUserPassword = false;
    }

    const rememberme:HTMLInputElement | null = document.querySelector("#rememberme") as HTMLInputElement | null;
    
    if (rememberme) {
        const objToSend = {
            username: userValue,
            password: passwordValue,
            rememberme: rememberme.checked
        };
    
        if (checkUserInput && checkUserPassword && loginForm) {
            loginForm.submit();
        } else {
            //alert("form not ok, revise your data");
        }
    }
}

export {} 