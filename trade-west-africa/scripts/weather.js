const apiKey = "Agro_Weather_App";
const lat = 4.8156; // Port Harcourt
const lon = 7.0498;
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const icon = document.querySelector("#weather-icon");

async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Weather data unavailable.");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Weather Fetch Error:", error);
        temperature.textContent = "Unavailable";
        description.textContent = "Unable to load weather data.";
        humidity.textContent = "--";
        wind.textContent = "--";
    }
}

function displayWeather(data) {
    temperature.textContent = `${data.main.temp} °C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.alt = data.weather[0].description;
}

fetchWeather();