window.addEventListener("keydown", function(e) {
  //since each key pressed has as a keycode, we want to get the specific audio element for that key
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; //only run audio for the selected keys
  audio.play();
  //we want to eliminate those audio breaks and keep playing audio on press
  audio.currentTime = 0;
  key.classList.add("playing");
});

//now to remove the animation after the key is pressed
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
