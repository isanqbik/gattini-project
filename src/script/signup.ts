const randomNumber:string = String(Math.floor(Math.random() * 999));

console.log(randomNumber);

let btnSign:HTMLButtonElement | null  = document.querySelector("#btn-sign") as HTMLButtonElement | null;
let signInForm:HTMLFormElement | null = document.querySelector("#signInForm") as HTMLFormElement | null;

let inputPhoneNumber:HTMLInputElement | null = document.querySelector("#phone-number") as HTMLInputElement | null;
let inputVerificationNumber:HTMLInputElement | null = document.querySelector("#verification-number") as HTMLInputElement | null;

let telNumberError:HTMLElement | null = document.querySelector("#telNumberError") as HTMLElement | null ;
let inputVerificationError:HTMLElement | null = document.querySelector("#inputVerificationError") as HTMLElement | null;

let btnGetCode:HTMLButtonElement | null = document.querySelector("#btnGetCode") as HTMLButtonElement | null;

let checkUserPhone:boolean = false;
let checkUserCode:boolean = false;

if(btnGetCode){
    btnGetCode.addEventListener("click", (e:Event) => {
        e.preventDefault();
        alert(`Copia il tuo codice per entrare, Codice: ${randomNumber}`)
    });
}

if(signInForm){
    signInForm.addEventListener("submit", (e:Event) => {
        e.preventDefault();
        validateForm();
    });
}

if (inputPhoneNumber) {
    inputPhoneNumber.addEventListener("change", (e: Event) => {
        const target = e.target as HTMLInputElement;
        console.log(target.value);
        if (target.value) validatePhone();
    });
}

if (inputVerificationNumber) {

    inputVerificationNumber.addEventListener("change", (e:Event) => {
        const target = e.target as HTMLInputElement;
        console.log(target.value);
        if (target.value) validateCode();
    });
}

function validatePhone(){

    let userPhone:string = String(inputPhoneNumber?.value);
    
    let onlyNumbers:string = "^[0-9]*$";

    if((userPhone != "" && userPhone.length > 7) && (userPhone.match(onlyNumbers))) {
        if (inputPhoneNumber) {
            inputPhoneNumber.parentElement?.closest("fieldset")?.classList.remove("with-error");
            checkUserPhone = true;
        }
    }else{
        if(inputPhoneNumber) {
            inputPhoneNumber.parentElement?.closest("fieldset")?.classList.add("with-error");
        }
        checkUserPhone = false;
    }
}

function validateCode(){

    let userCode:string = String(inputVerificationNumber?.value);

    if(inputVerificationNumber) {
        if((userCode === randomNumber)) {
            inputVerificationNumber.parentElement?.closest("fieldset")?.classList.remove("with-error");
            checkUserCode = true;
        }else{
            inputVerificationNumber.parentElement?.closest("fieldset")?.classList.add("with-error");
            checkUserCode = false;        
        }
    }
}

function validateForm(){

    if (checkUserPhone && checkUserCode) {
        signInForm?.submit();
    } else {
        if(!checkUserPhone) {
            if(inputPhoneNumber) {
                inputPhoneNumber.parentElement?.closest("fieldset")?.classList.add("with-error");
            }
        }
        if(!checkUserCode){
            if(inputVerificationNumber) {
                inputVerificationNumber.parentElement?.closest("fieldset")?.classList.add("with-error");
            }
        }
        
    }
}

export {} 