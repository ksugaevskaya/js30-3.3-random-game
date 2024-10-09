const holes = document.querySelectorAll(".image-dust");
const moles = document.querySelectorAll(".image-mole");
const score = document.querySelector(".score-points");
const sound = document.getElementById("sound");
const scoreTime = document.getElementById("score-time");

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
  const resultRandomTime = randomTime(500, 1000);
  moles[resultRandomHole].className = "image-mole image-visible";
  moles[resultRandomHole].addEventListener("click", onMoleClicked);
  setTimeout(() => {
    moles[resultRandomHole].className = "image-mole";
  }, resultRandomTime);
};

const randomTime = (min, max) => {
  return Math.random() * (max - min) + min;
};

setInterval(() => {
  moleUp();
}, 1000);

let i = 0;
const onMoleClicked = () => {
  score.innerHTML = ++i;
  moles[lastHole].className = "image-mole";
  sound.play();
};

let currentTime = 0;

setInterval(() => {
  const seconds = Math.floor(currentTime % 60);
  scoreTime.innerHTML = `${Math.floor(currentTime / 60)}:${
    seconds > 9 ? seconds : "0" + seconds
  }`;
  currentTime++;
}, 1000);
