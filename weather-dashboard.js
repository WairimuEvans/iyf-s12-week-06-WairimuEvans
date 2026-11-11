const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const weatherCard = document.getElementById("weather-card");
const recentSearches = document.getElementById("recent-searches");

const RECENT_SEARCHES_KEY = "weatherRecentSearches";
const MAX_RECENT_SEARCHES = 5;

// Retrieve weather information from OpenWeatherMap
async function getWeather(city) {
    try {
        showLoading();
        hideError();

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Check the spelling and try again.");
            }

            if (response.status === 401) {
                throw new Error("Invalid API key. Check your configuration.");
            }

            throw new Error("Unable to retrieve weather information.");
        }

        const data = await response.json();

        displayWeather(data);
        saveRecentSearch(data.name);
        displayRecentSearches();

    } catch (error) {
        showError(error.message);

    } finally {
        hideLoading();
    }
}

// Display weather information
function displayWeather(data) {
    weatherCard.replaceChildren();

    const city = document.createElement("h3");
    city.textContent = `${data.name}, ${data.sys.country}`;

    const condition = document.createElement("p");
    condition.textContent = data.weather[0].description;

    const temperature = document.createElement("p");
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    temperature.classList.add("temperature");

    const feelsLike = document.createElement("p");
    feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const wind = document.createElement("p");
    wind.textContent = `Wind speed: ${data.wind.speed} m/s`;

    const icon = document.createElement("img");
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;

    weatherCard.append(
        city,
        icon,
        condition,
        temperature,
        feelsLike,
        humidity,
        wind
    );
}

// Save recent searches in localStorage
function saveRecentSearch(city) {
    let searches = JSON.parse(
        localStorage.getItem(RECENT_SEARCHES_KEY) || "[]"
    );

    searches = searches.filter(
        item => item.toLowerCase() !== city.toLowerCase()
    );

    searches.unshift(city);

    searches = searches.slice(0, MAX_RECENT_SEARCHES);

    localStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(searches)
    );
}

// Display recent searches
function displayRecentSearches() {
    const searches = JSON.parse(
        localStorage.getItem(RECENT_SEARCHES_KEY) || "[]"
    );

    recentSearches.replaceChildren();

    if (searches.length === 0) {
        const message = document.createElement("li");
        message.textContent = "No recent searches yet.";
        recentSearches.appendChild(message);
        return;
    }

    searches.forEach(city => {
        const item = document.createElement("li");
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = city;

        button.addEventListener("click", () => {
            cityInput.value = city;
            getWeather(city);
        });

        item.appendChild(button);
        recentSearches.appendChild(item);
    });
}

// Loading and error messages
function showLoading() {
    loading.classList.remove("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function hideError() {
    errorMessage.classList.add("hidden");
}

// Handle form submission
weatherForm.addEventListener("submit", event => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    getWeather(city);
});

// Load recent searches when the page opens
displayRecentSearches();

console.log("Weather Dashboard initialized.");
