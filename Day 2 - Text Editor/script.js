<<<<<<< HEAD
let optionsBtns = document.querySelectorAll(".option-button"),
    advOptionBtns = document.querySelectorAll(".adv-option-button"),
    alignBtns = document.querySelectorAll(".align"),
    spacingBtns = document.querySelectorAll(".spacing"),
    formatBtns = document.querySelectorAll(".format"),
    scriptBtns = document.querySelectorAll(".script"),
    fontName = document.getElementById("fontName"),
    fontSizeRef = document.getElementById("fontSize"),
    writingArea = document.getElementById("text-input"),
    linkBtn = document.getElementById("createLink");

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

const initializer = () => {
    highlighter(alignBtns, true);
    highlighter(spacingBtns, true);
    highlighter(formatBtns, false);
    highlighter(scriptBtns, true);

    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for(let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;

}

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
}

optionsBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        modifyText(btn.id, false, null);
    });
});

advOptionBtns.forEach((btn) => {
    btn.addEventListener("change", () => {
        modifyText(btn.id, false, btn.value);
    });
});

linkBtn.addEventListener("click", () => {
    let userLink = prompt("Enter an URL?");
    if(/http/i.test(userLink)) {
        modifyText(linkBtn.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkBtn.id, false, userLink);
    }
});

const highlighter = (className, needsRemoval) => {
    className.forEach((btn) => {
        btn.addEventListener("click", () => {
            if(needsRemoval) {
                let alreadyActive = false;
                if(btn.classList.contains("active")) {
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if(!alreadyActive) {
                    btn.classList.add("active");
                }
            } else {
                btn.classList.toggle("active");
            }
        });
    });
}

const highlighterRemover = (clasName) => {
    clasName.forEach((btn) => {
        btn.classList.remove("active");
    });
}

window.onload = initializer();
=======
let optionsBtns = document.querySelectorAll(".option-button"),
    advOptionBtns = document.querySelectorAll(".adv-option-button"),
    alignBtns = document.querySelectorAll(".align"),
    spacingBtns = document.querySelectorAll(".spacing"),
    formatBtns = document.querySelectorAll(".format"),
    scriptBtns = document.querySelectorAll(".script"),
    fontName = document.getElementById("fontName"),
    fontSizeRef = document.getElementById("fontSize"),
    writingArea = document.getElementById("text-input"),
    linkBtn = document.getElementById("createLink");

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

const initializer = () => {
    highlighter(alignBtns, true);
    highlighter(spacingBtns, true);
    highlighter(formatBtns, false);
    highlighter(scriptBtns, true);

    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for(let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;

}

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
}

optionsBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        modifyText(btn.id, false, null);
    });
});

advOptionBtns.forEach((btn) => {
    btn.addEventListener("change", () => {
        modifyText(btn.id, false, btn.value);
    });
});

linkBtn.addEventListener("click", () => {
    let userLink = prompt("Enter an URL?");
    if(/http/i.test(userLink)) {
        modifyText(linkBtn.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkBtn.id, false, userLink);
    }
});

const highlighter = (className, needsRemoval) => {
    className.forEach((btn) => {
        btn.addEventListener("click", () => {
            if(needsRemoval) {
                let alreadyActive = false;
                if(btn.classList.contains("active")) {
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if(!alreadyActive) {
                    btn.classList.add("active");
                }
            } else {
                btn.classList.toggle("active");
            }
        });
    });
}

const highlighterRemover = (clasName) => {
    clasName.forEach((btn) => {
        btn.classList.remove("active");
    });
}

window.onload = initializer();
>>>>>>> 11db164ebd5081822b4bd020099cc2d4a34b058c
