// First we select elements from index
const iconElement = document.querySelector(".weather-icon");

const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// Then create the weather object
const weather = {};

weather.temperature = {
  unit: "celsius"
};

const APIkey = "82005d27a116c2880c8f0fcb866998a0";

// At this step we want to check if the browser supports geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML =
    "<p>The browser does not support geolocation </p>";

  //   function alertNotidication() {
  //     alert("The browser does not support geolocation");
  //   }
}

// Now setting the user position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  console.log(latitude);
  console.log(longitude);

  getWeather(latitude, longitude);
}

// To show the actual error message
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// To get the current weather by geographic coordinates
function getWeather(latitude, longitude) {
  let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`;

  fetch(weatherAPI)
    .then(response => {
      let data = response.json();
      return data;
    })
    .then(data => {
      //   to convert the temperature from kelvin
      weather.temperature.value = Math.floor(data.main.temp - 273);
      //And getting the rest of the data from the json
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    //Upon updating the weather object we want to display it to the user, so we call it here
    .then(() => {
      displayweather();
    });
}
//The display weather function
function displayweather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}&#176<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//To convert the temperature from Celsius to Fahrenheit
function celsiusToFahr(temperature) {
  return (temperature * 9) / 5 + 32;
}

//Change the units when clicked
tempElement.addEventListener("click", function() {
  // First check if we have a unit
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let Fahrenheit = celsiusToFahr(weather.temperature.value);
    // The method Math.floor will round the number
    Fahrenheit = Math.floor(Fahrenheit);

    tempElement.innerHTML = `${Fahrenheit}&#176<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    //   To go back to celsius
    tempElement.innerHTML = `${weather.temperature.value}&#176<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});
