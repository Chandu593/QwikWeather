const searchButton = document.getElementById('searchButton');
const searchInput = document.querySelector('.searchInput');
const weathercard = document.querySelector('.weathercard');
const weatherIcons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⚡",
    Snow: "❄️",
    Mist: "🌫️",
    Smoke: "🏭",
    Haze: "🌫️",
    Dust: "🏜️",
    Fog: "🌁",
    Sand: "🏜️",
    Ash: "🌋",
    Squall: "🌬️",
    Tornado: "🌪️"
};
weathercard.innerHTML = `<h3 class="mt-4">Enter your city name to search</h3>`;
const getDetails = async () => {
    let searchValue = searchInput.value;
    if (searchValue === "") {
        weathercard.innerHTML = `<h3 class="mt-4 shake text-danger">Please enter your city name before you search</h3>`;
    }
    else {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=0e37c09fe6b694403e671cccaf3da863`;
            const response = await fetch(url);
            const data = await response.json();
            const weatherCondition = data.weather[0].main;
            city = data.name;
            weatherdesc = data.weather[0].description;
            country = data.sys.country;
            temp = data.main.temp;
            datee = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
            mintemp = data.main.temp_min;
            maxtemp = data.main.temp_max;
            pressure = data.main.pressure;
            wind = data.wind.speed;
            humidity = data.main.humidity;
            weathericon = weatherIcons[weatherCondition] || "☀️";
            weathercard.innerHTML = `
                        <div class="containerr" id="weathericon">
                            ${weathericon}
                        </div>
                        <p id="weatherdesc" class="fs-6 text-body-secondary">${weatherdesc}</p>
                        <div class="weathercard-header">
                            <div class="d-flex">
                            <span id="city">${city}</span>,&nbsp;
                            <span id="country">${country}</span></div>
                            <span id="datee">${datee}</span>
                        </div>
                        <span id="temp" class="temp">${temp}°C</span>
                        <div class="weather-details">
                            <div class="detail"><img src="https://cdn-icons-png.flaticon.com/512/1684/1684375.png" width="20"> Min: <span id="min-temp">${mintemp}°C</span></div>
                            <div class="detail"><img src="https://cdn-icons-png.flaticon.com/512/1684/1684375.png" width="20"> Max: <span id="max-temp">${maxtemp}°C</span></div>
                            <div class="detail"><img src="https://cdn-icons-png.flaticon.com/512/633/633611.png" width="20"> Pressure: <span id="pressure">${pressure} hPa</span></div>
                            <div class="detail"><img src="https://cdn-icons-png.flaticon.com/512/414/414927.png" width="20"> Humidity: <span id="humidity">${humidity}%</span></div>
                            <div class="detail"><img src="https://cdn-icons-png.flaticon.com/512/846/846282.png" width="20"> Wind: <span id="wind">${wind} km/h</span></div>
                        </div>
                `
        }
        catch (error) {
            weathercard.innerHTML = `<h3 class="text-danger mt-4">Unable to find the city. Please check your city name</h3>`;
            console.error('Error:', error);
        }
    }
};

searchButton.addEventListener('click', getDetails);
