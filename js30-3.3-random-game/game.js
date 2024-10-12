const holes = document.querySelectorAll(".image-dust");
const moles = document.querySelectorAll(".image-mole");
const score = document.querySelector(".score-points");
const sound = document.getElementById("sound");
const scoreTime = document.getElementById("score-time");
const backgroundMusic = document.getElementById("background-music");
const gameOver = document.getElementById("game-over");
const restart = document.getElementById("restart");
const gameOverMusic = document.getElementById("game-over-music");
const click = document.getElementById("click");
const yourScore = document.getElementById("your-score");
const bestScoreHTML = document.getElementById("best-score");

backgroundMusic.volume = 0.3;
let lastHole;

const randomHole = () => {
  const allHoles = holes.length;
  const index = Math.random() * holes.length;
  const result = Math.floor(index);
  if (result === lastHole) {
    return randomHole();
  }
  lastHole = result;
  return result;
};

const moleUp = () => {
  const resultRandomHole = randomHole();
  const resultRandomTime = randomTime(500, 2000);
  moles[resultRandomHole].className = "image-mole image-visible";
  moles[resultRandomHole].addEventListener("click", onMoleClicked);
  setTimeout(() => {
    moles[resultRandomHole].className = "image-mole";
  }, resultRandomTime);
};

const randomTime = (min, max) => {
  return Math.random() * (max - min) + min;
};

let moleInterval;
moleInterval = setInterval(() => {
  moleUp();
}, 2000);

let bestScore = localStorage.getItem("best-score");
let i = 0;
const onMoleClicked = () => {
  score.innerHTML = ++i;
  moles[lastHole].className = "image-mole";
  sound.play();
};

let currentTime = 30;
let timeInterval;

timeInterval = setInterval(() => {
  if (currentTime === 0) {
    gameOver.className = "game-over";
    clearInterval(timeInterval);
    clearInterval(moleInterval);
    gameOverMusic.play();
    yourScore.innerHTML = score.innerHTML;
    if (i >= bestScore) {
      bestScoreHTML.innerHTML = i;
      localStorage.setItem("best-score", i);
    }
  }

  const seconds = Math.floor(currentTime % 60);
  scoreTime.innerHTML = `${Math.floor(currentTime / 60)}:${
    seconds > 9 ? seconds : "0" + seconds
  }`;
  currentTime--;
}, 1000);

const onRestartClicked = () => {
  click.play();
  setTimeout(() => {
    location.reload();
  }, 100);
};

restart.addEventListener("click", onRestartClicked);
