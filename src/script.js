//Atualização data e hora
let now = new Date();

//dias da semana
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

//meses
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

//ano
let year = now.getFullYear();

//horas e minutos
let hour = now.getHours();
let minute = now.getMinutes();
let date = now.getDate();

function time() {
  if (hour < 10) {
    hour = `0${hour}`;
  } else {
    hour = hour;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  } else {
    minute = minute;
  }
}
let displayedHour = `${hour}:${minute}`;
let displayedDate = `${date} ${month} ${year}`;

function change() {
  let display = document.querySelector("#current-date");
  display.innerHTML = `${day}</br>${displayedDate}</br>${displayedHour}`;
}

change();

//FORM
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchInput.value}`;
}

let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", searchCity);

// TEMPERATURE
function tempCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "22";
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", tempCelcius);

function tempFahrenheit(event) {
  event.preventDefault();
  let currentFahrenheit = document.querySelector("#current-temp");
  currentFahrenheit.innerHTML = "60";
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", tempFahrenheit);


//API temperature
function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weather-today").innerHTML = `Humidity: ${response.data.main.humidity}% <br/> Wind: ${Math.round(response.data.wind.speed)} km/h`;
}

function search(city) {
  let apiKey = "4d96685ad0055b470dd85d4445d4e3c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4d96685ad0055b470dd85d4445d4e3c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);