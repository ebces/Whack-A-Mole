const counter = document.querySelector('.title__counter');
const startButton = document.querySelector('.start-button');
const moles = document.querySelectorAll('.playing-field__mole');

const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

moles.forEach((elem) => elem.addEventListener('click', () => {
  if (elem.classList.contains('playing-field__mole--active')) {
    counter.textContent = +counter.textContent + 1;
  }
  elem.classList.remove('playing-field__mole--active');
}));

let shownPosition = getRandomInRange(0, 5);
let hiddenPosition = getRandomInRange(0, 5);
let level = 1;

const changeMole = () => {
  moles[shownPosition].classList.add('playing-field__mole--active');
  moles[hiddenPosition].classList.remove('playing-field__mole--active');
  hiddenPosition = shownPosition;
  shownPosition = getRandomInRange(0, 5);
};

startButton.addEventListener('click', () => {
  let interval = setInterval(changeMole, 1000 / level);

  const newLevel = setInterval(() => {
    clearInterval(interval);
    level += 1;
    interval = setInterval(changeMole, 1000 / level);
  }, 10000);

  setTimeout(() => {
    clearInterval(interval);
    clearInterval(newLevel);
    localStorage.setItem('result', counter.textContent);
  }, 30000);
});
