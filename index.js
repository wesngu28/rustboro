import { sixRandoms } from "./js/generateSixRandoms.js";
import { unhidePersonal } from "./js/personal.js";

let activeSlide = 1

document.getElementById('start-btn').addEventListener('click', () => sixRandoms(activeSlide));
document.getElementById('other-btn').addEventListener('click', unhidePersonal);

let back = document.querySelector('.back');
let forward = document.querySelector('.next');
back.addEventListener('click', backSlide);
forward.addEventListener('click', nextSlide);

function backSlide() {
  displaySlide(activeSlide += -1);
}

function nextSlide() {
  displaySlide(activeSlide += 1);
}
function displaySlide(index) {
  let count = 0;
  let figures = document.querySelectorAll('#pokemon-table img');
  let names = document.querySelectorAll('#pokemon-table p');
  if (index > figures.length - 1) {
      activeSlide = 0;
  }
  if (index < 0) {
      activeSlide = figures.length - 1;
  }
  for (count = 0; count < figures.length; count++) {
      figures[count].style.display = "none";
      names[count].style.display = "none";
  }
  figures[activeSlide].style.display = "block";
  names[activeSlide].style.display = "block";
}