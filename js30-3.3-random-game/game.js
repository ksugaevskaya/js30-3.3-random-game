const holes = document.querySelectorAll(".image-dust");
const moles = document.querySelectorAll(".image-mole");
const score = document.querySelector(".score");
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
