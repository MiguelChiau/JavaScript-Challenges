// The setInterval is supposed to call the setClock every 1s or 1000ms
setInterval(setClock, 1000);

const hourHand = document.querySelector(`[data-hour-hand]`);
const minuteHand = document.querySelector(`[data-minute-hand]`);
const secondHand = document.querySelector(`[data-second-hand]`);

//This function will get the current date
function setClock() {
  const currentDate = new Date();
  // This is divided by 60 as the number of seconds on a minute
  const secondsRatio = currentDate.getSeconds() / 60;
  // Since want the minutes to jump gradually
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  // This is divided by 12 since as the number of hours on a clock
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  console.log("seconds", secondsRatio);
  //to set the value for the rotation
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

setClock();
