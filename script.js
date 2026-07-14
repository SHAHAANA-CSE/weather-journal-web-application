const apiKey = "f6cf472e45c9fb9af02414142cf9025b";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Enter city name");
        return;
    }

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.cod === "404") {
            alert("City not found");
            return;
        }

        document.getElementById("weatherCard").style.display = "block";

        document.getElementById("cityName").innerText =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").innerText =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").innerText =
            data.weather[0].description;

        document.getElementById("humidity").innerText =
            `${data.main.humidity}%`;

        document.getElementById("wind").innerText =
            `${data.wind.speed} km/h`;

        document.getElementById("date").innerText =
            new Date().toDateString();

        const icon = data.weather[0].icon;
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${icon}@2x.png`;

        // Dynamic city image (no API)
        document.getElementById("bgImage").style.backgroundImage =
            `url('https://source.unsplash.com/1600x900/?${city},landmark')`;

    } catch (err) {
        alert("Error fetching data");
        console.log(err);
    }
}
