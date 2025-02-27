const API_KEY = "c054f99d32272a7fdcc11582824c97d4";
const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=`;

const cityInput = document.getElementById("cityinput");
const button = document.querySelector("button");
const h1 = document.getElementById("city");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feels-like");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weathericon");
const errorMessage = document.getElementById("errorMessage");
const otherInfo = document.getElementById("other-info");

async function getWeather(city) {
  const response = await fetch(URL + city);
  const data = await response.json();
  displayWeather(data);
}

function displayWeather(weatherData) {
  if (weatherData.cod === 200) {
    const highTemp = document.createElement("li");
    const lowTemp = document.createElement("li");
    highTemp.innerText = `High: ${Math.round(weatherData.main.temp_max)}°C`;
    lowTemp.innerText = `Low: ${Math.round(weatherData.main.temp_min)}°C`;
    h1.innerText = weatherData.name;
    temp.innerText = Math.round(weatherData.main.temp) + "°C";
    feelsLike.innerText = `Feels like: ${Math.round(
      weatherData.main.feels_like
    )}°C`;
    description.innerText = weatherData.weather[0].description;
    otherInfo.appendChild(highTemp);
    otherInfo.appendChild(lowTemp);

    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    weatherIcon.alt = weatherData.name;
    errorMessage.innerText = "";
    console.log(weatherData);
  } else {
    h1.innerText = "";
    temp.innerText = "";
    description.innerText = "";
    weatherIcon.src = "";
    weatherIcon.alt = "";
    errorMessage.innerText = "City not found!";
  }
}
button.addEventListener("click", () => {
  getWeather(cityInput.value);
});
