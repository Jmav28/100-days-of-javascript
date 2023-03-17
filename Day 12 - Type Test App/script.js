//random quotes api
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSelection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

//display random quotes
const renderNewQuote = async() => {
    //fetch content from quote api url
    const response = await fetch(quoteApiUrl);
    let data =  await response.json();
    quote = data.content;

    //array of chars in quote
    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
    });
    quoteSelection.innerHTML += arr.join("");
}

//logic to compare input words with quote
userInput.addEventListener("input", ()=> {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);
    //array of user input chars
    let userInputChars = userInput.value.split("");
    console.log(userInputChars);
    //loop through each char in quote
    quoteChars.forEach((char, index) => {
        //check chars with quote chars
        if(char.innerText == userInputChars[index]) {
            char.classList.add("success");
        }
        //if user hast entered anything or backspaced
        else if(userInputChars[index] == null) {
            if(char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        }
        //if user entered wrong char
        else{
            if(!char.classList.contains("fail")) {
                //increment and displaying mistakes
                mistakes++;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }

        //return true if all chars are correct
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });

        //end test if all chars are correct
        if(check) {
            displayResult();
        }

    });

});

//update timer
function updateTimer() {
    if(time == 0) {
        //end test if reaches 0
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}

//set timer
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
}

//end test
const displayResult = () => {
    //display result div
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 -time) / 100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";
}

//start test 
const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
}

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
}
