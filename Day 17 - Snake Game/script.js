const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const HighScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// get high score from local storage

let highScore = localStorage.getItem("high-score") || 0;
HighScoreElement.innerText = `High Score: ${highScore}`;

//pass a random between 1 and 30 as food position

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30 + 1);
    foodY = Math.floor(Math.random() * 30 + 1);
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

//change velocity value based on key press

const changeDirection = e => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// change direction on each key click

controls.forEach(button => button.addEventListener("click", () => changeDirection({key: button.dataset.key})));

const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    //when nake eat food
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // add food to snake body
        score++;
        highScore = score >= highScore ? score : highScore; //if score > highscore = score
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        HighScoreElement.innerText = `High Score: ${highScore}`;
    }

    //update snake head
    snakeX += velocityX;
    snakeY += velocityY;

    //shifting forward values of elements in snake body by one

    for (let i = snakeBody.length -1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    //check snake body is out of wall or no

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    //add div for each part of snake body

    for(let i = 0; i <snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        //check if snake head hit body or no
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition()
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);