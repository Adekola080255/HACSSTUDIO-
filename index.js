let MinNum = 1;
let MaxNum = 10;
let chances = 3;
let score = JSON.parse(localStorage.getItem("score"));
let OurGuess = GetGuess(MinNum, MaxNum);

const inputValue = document.querySelector(".input"),
  message = document.querySelector(".demo"),
  max = document.querySelector(".max-num"),
  min = document.querySelector(".min-num"),
  BtnCheck = document.querySelector(".check"),
  Score = document.querySelector("#score"),
  Form = document.querySelector("#form");

BtnCheck.addEventListener("click", SubmitGuess);
Form.addEventListener("mousedown", CheckGame);

function CheckGame(e) {
  if (e.target.className === "play-again") {
    inputValue.value = "";
    window.location.reload();
  }
}
function SubmitGuess(e) {
  e.preventDefault();
  let inputVal = parseInt(inputValue.value);
  if (inputVal !== OurGuess) {
    chances = chances - 1;
    if (chances === 0) {
      setMessage(`GAME OVER!!!. The correct answer is ${OurGuess}.`, "red");
      GameOver(false);
      console.log(e.target);
    } else {
      setMessage(
        `${inputVal} is not correct , you have ${chances} guesses left.`,
        "red"
      );
      BtnCheck.textContent = "RETRY";
      inputValue.style.borderColor = "red";
    }
  }
  if (
    isNaN(inputVal) ||
    inputVal < MinNum ||
    inputVal > MaxNum ||
    inputVal == 0
  ) {
    setMessage(`Please Enter a number between ${MinNum} and ${MaxNum}`, "red");
    inputValue.style.borderColor = "red";
  }
  if (inputVal == OurGuess) {
    setMessage(`YOU WON. ${inputVal} is the correct answer`, "green");
    GameOver(true);
    IncreaseScore();
  }
}

function GameOver(won, color) {
  BtnCheck.textContent = "PLAY AGAIN";
  inputValue.disabled = true;
  won ? (color = "green") : (color = "red");
  inputValue.style.borderColor = color;
  BtnCheck.className = "play-again";
}

function setMessage(mess, color) {
  message.textContent = mess;
  message.style.color = color;
}

function GetGuess(mod, mid) {
  return Math.round(Math.random() * (mod + mid - 1) + MinNum);
}

function IncreaseScore() {
  score = score + 1;
  localStorage.setItem("score", score);
  score = score;
}

max.textContent = MaxNum;
min.textContent = MinNum;
Score.textContent = score;
