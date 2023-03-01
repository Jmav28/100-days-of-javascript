const lenghtSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const psswrdInput = document.querySelector(".input-box input");
const psrwdIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers : "0123456789",
    symbols: "!@#$%^&*()_+.,/"
}

const generatePassword = () => {
    let staticPswrd = "",
        randomPswrd = "",
        excludeDuplicate = false;
        passLength = lenghtSlider.value;

    options.forEach(option => {
        if(option.checked) {
            if(option.id !== "exc-duplicate" && option.id !== "space") {
                staticPswrd += characters[option.id];
            } else if(option.id === "spaces") {
                staticPswrd += `  ${staticPswrd}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for(let i = 0; i < passLength; i++) {
        let randomChar = staticPswrd[Math.floor(Math.random() * staticPswrd.length)];
        if(excludeDuplicate) {
            !randomPswrd.includes(randomChar) || randomChar == " " ? randomPswrd += randomChar : i--;
        } else {
            randomPswrd += randomChar;
        }
    }
    psswrdInput.value = randomPswrd;
}

const updatePassIndicator = () => {
    psrwdIndicator.id = lenghtSlider.value <= 8 ? "weak" : lenghtSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lenghtSlider.value;
    generatePassword();
    updatePassIndicator();
}

updateSlider();

const copyPass = () => {
    navigator.clipboard.writeText(psswrdInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
        
    }, 1500);
}

copyIcon.addEventListener("click", copyPass);
lenghtSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);