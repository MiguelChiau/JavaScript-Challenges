const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;

//To give random amount of time between min and max in miliseconds
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
//Now to pick a random hole
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  // to make sure holes don't repeat
  if (hole === lastHole) {
    console.log("This hole is repeating!");
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

//   For the moles to peep out of the holes
function peep() {
  //   Time it takes of the mole to pop up
  const time = randomTime(200, 1000);
  // The hole in whcih the mole will come
  const hole = randomHole(holes);
  // This class styles will trigger the mole up
  hole.classList.add("up");
  //to remove the class of up so the mole goes down
  setTimeout(() => {
    hole.classList.remove("up");
    //Run peep function only if timeup is true
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  // The duration of the game is 10000
  setTimeout(() => (timeUp = true), 10000);
}
//to make abank on the head of the mole
function bonk(e) {
  // For non-valid clicks
  if (!e.isTrusted);
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}
moles.forEach(mole => mole.addEventListener("click", bonk));

// particlesJS.load('particles-js', 'assets/particles.json', function () {
//     console.log('callback - particles.js config loaded');
// });
