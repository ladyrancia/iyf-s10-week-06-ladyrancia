const API_KEY = "276115bf621e03acf89657513b269b20";

const form = document.getElementById("search-form");
const input = document.getElementById("city-input");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = input.value.trim();
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        showLoading();
        document.getElementById("error").textContent = "";

        const res = await fetch(url);

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();

        displayWeather(data);

    } catch (err) {
        document.getElementById("error").textContent = err.message;
    } finally {
        hideLoading();
    }
});

function displayWeather(data) {
    document.getElementById("city").textContent =
        `${data.name}, ${data.sys.country}`;

    document.getElementById("temp").textContent =
        `🌡 Temp: ${data.main.temp}°C`;

    document.getElementById("desc").textContent =
        `🌥 ${data.weather[0].description}`;

    document.getElementById("humidity").textContent =
        `💧 Humidity: ${data.main.humidity}%`;

    document.getElementById("wind").textContent =
        `🌬 Wind: ${data.wind.speed} m/s`;

    document.getElementById("weather").style.display = "block";
}

function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}