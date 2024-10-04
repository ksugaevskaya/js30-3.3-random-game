const holes = document.querySelectorAll(".image-dust");
const moles = document.querySelectorAll(".image-mole");
const score = document.querySelector(".score");

const randomHole = () => {
  const allHoles = holes.length;
  const index = Math.random() * holes.length;
  const result = Math.floor(index);
  return result;
};

const moleUp = () => {
  const resultRandomHole = randomHole();
  moles[resultRandomHole].className = "image-mole image-none";
};
