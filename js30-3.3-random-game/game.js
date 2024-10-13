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
const gameStart = document.getElementById("game-start");
const startButton = document.getElementById("start-button");
const topResults = document.getElementById("top-results");
const tableResults = document.getElementById("table-results");

backgroundMusic.volume = 0.3;
let lastHole;

const top10Results = () => {
  if (localStorage.getItem("top-results") === null) {
    return Array(10).fill(0);
  } else {
    return localStorage.getItem("top-results").split(",").map(Number);
  }
};
let topResultsInTable = top10Results();

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

let bestScore = Number(localStorage.getItem("best-score"));
let i = 0;
const onMoleClicked = () => {
  score.innerHTML = ++i;
  moles[lastHole].className = "image-mole";
  sound.play();
};

let currentTime = 30;
let timeInterval;

const onRestartClicked = () => {
  click.play();
  setTimeout(() => {
    location.reload();
  }, 100);
};

const onStartButtonClicked = () => {
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
      } else {
        bestScoreHTML.innerHTML = bestScore;
      }
      topResultsInTable.push(i);
      topResultsInTable = topResultsInTable.sort((a, b) => b - a).slice(0, 10);
      localStorage.setItem("top-results", topResultsInTable);
      topResults.className = "top-results";
      let emptyString = "";
      for (let o = 0; o < 10; o++) {
        emptyString += "<p>" + topResultsInTable[o] + "</p>";
      }
      tableResults.innerHTML = emptyString;
    }

    const seconds = Math.floor(currentTime % 60);
    scoreTime.innerHTML = `${Math.floor(currentTime / 60)}:${
      seconds > 9 ? seconds : "0" + seconds
    }`;
    currentTime--;
  }, 1000);
  moleInterval = setInterval(() => {
    moleUp();
  }, 2000);
  gameStart.className = "game-start none";
  backgroundMusic.play();
};

restart.addEventListener("click", onRestartClicked);
startButton.addEventListener("click", onStartButtonClicked);
