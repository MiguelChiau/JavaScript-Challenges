// First elements elements in the page
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const timeElement = document.getElementById("time");

//Then the icon classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_TRHOUGH = "lineThrough";

//The show the the actual date
const today = new Date();
const options = { weekday: "long", month: "short", day: "numeric" };
dateElement.innerHTML = today.toLocaleDateString("en-us", options);

//To convert the time to AM/PM format
// First check if it's AM or PM
const newFormat = today.getHours() >= 12 ? "PM" : "AM";
// Then find hours in AM-PM format
timeElement.innerHTML =
  (today.getHours() % 12) + ":" + today.getMinutes() + " " + newFormat;

//The function for adding to-do
function addToDo(toDo, id, done, trash) {
  //Check if item is in the trash
  if (trash) {
    return;
  }
  const item = `<li class="item">
                   <i class="fa fa-circle-thin co" job="complete" id="0"></i>
                   <p class="text">${toDo}</p>
                   <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`;

  const position = "beforeend";
  li.insertAdjacentElement(position, item);
}

addToDo("Push Code");

//Listen to the enter key
document.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    if (toDo) {
      addToDo(toDo);
    }
    input.value = " ";
  }
});
