const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherDisplay = document.getElementById("weatherDisplay");
const body = document.getElementById("body");
const backgroundAnimation = document.getElementById("backgroundAnimation");
const lightning = document.getElementById("lightning");

// Weather theme mappings
const weatherThemes = {
    'clear sky': 'clear',
    'few clouds': 'sunny',
    'scattered clouds': 'cloudy',
    'broken clouds': 'cloudy',
    'overcast clouds': 'cloudy',
    'shower rain': 'rainy',
    'rain': 'rainy',
    'light rain': 'rainy',
    'moderate rain': 'rainy',
    'heavy intensity rain': 'rainy',
    'thunderstorm': 'thunderstorm',
    'snow': 'snowy',
    'light snow': 'snowy',
    'mist': 'cloudy',
    'fog': 'cloudy'
};

const mainWeatherThemes = {
    'Clear': 'sunny',
    'Clouds': 'cloudy',
    'Rain': 'rainy',
    'Drizzle': 'rainy',
    'Thunderstorm': 'thunderstorm',
    'Snow': 'snowy',
    'Mist': 'cloudy',
    'Fog': 'cloudy',
    'Haze': 'cloudy'
};

// Event Listeners
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city) {
        console.log("clicked");
        showLoading();
        fetchWeather(city);
        weatherForecastCity(city);
    } else {
        console.log("not clicked");
        showWarning("Please Enter a City");
    }
    cityInput.value = "";
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// Loading Animation
function showLoading() {
    weatherDisplay.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Background Animation Functions
function createRaindrops() {
    backgroundAnimation.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const rain = document.createElement('div');
        rain.className = 'rain';
        rain.style.left = Math.random() * 100 + '%';
        rain.style.animationDelay = Math.random() * 1 + 's';
        rain.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
        backgroundAnimation.appendChild(rain);
    }
}

function createSnowflakes() {
    backgroundAnimation.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const snow = document.createElement('div');
        snow.className = 'snow';
        snow.style.left = Math.random() * 100 + '%';
        snow.style.animationDelay = Math.random() * 3 + 's';
        snow.style.animationDuration = (Math.random() * 2 + 2) + 's';
        backgroundAnimation.appendChild(snow);
    }
}

function createClouds() {
    backgroundAnimation.innerHTML = '';
    const cloud = document.createElement('div');
    cloud.className = 'cloud cloud1';
    backgroundAnimation.appendChild(cloud);
}

function createLightning() {
    lightning.classList.add('lightning-active');
    setTimeout(() => {
        lightning.classList.remove('lightning-active');
    }, 100);
}

function clearAnimations() {
    backgroundAnimation.innerHTML = '';
}

// Theme Management
function setWeatherTheme(weatherMain, weatherDescription) {
    // Remove all existing theme classes
    body.className = '';
    
    // Determine theme based on main weather or description
    let theme = mainWeatherThemes[weatherMain] || weatherThemes[weatherDescription.toLowerCase()] || 'clear';
    
    // Apply theme
    body.classList.add(theme);

    switch (theme) {
        case 'rainy':
            createRaindrops();
            break;
        case 'snowy':
            createSnowflakes();
            break;
        case 'cloudy':
            createClouds();
            break;
        case 'thunderstorm':
            createRaindrops();
            // Add lightning effect periodically
            setTimeout(() => createLightning(), 1000);
            setInterval(() => {
                if (Math.random() < 0.3) {
                    createLightning();
                }
            }, 3000);
            break;
        default:
            clearAnimations();
    }
}


async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`);
        
        const data = await response.json();
        console.log(data);

        if(!response.ok){
            showWarning(`City Not Found`);
            return;
        }

        // Set weather theme based on the weather condition
        setWeatherTheme(data.weather[0].main, data.weather[0].description);

        weatherDisplay.innerHTML = `
            <div id="display">
                <h2 class="city-name">${data.name} (${data.sys.country})</h2>
                <h2 class="temperature">${data.main.temp}°C</h2>
                <h2 class="weather-condition">
                    ${data.weather[0].main} 
                    <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" width="50" height="50">
                </h2>
                <h2 class="description">${data.weather[0].description}</h2>
            </div>
        `;

    } catch(err) {
        showWarning("Something went wrong");
        console.log(err);
    }
}


async function weatherForecastCity(city){
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`);
  const data = await response.json();
  console.log("here is ur data",data);

  if(!response.ok){
    showWarning(`City Not Found`);
    return;
  }

  const displayWeather = data.list.filter(item => item.dt_txt.includes("12:00:00"));
  console.log(displayWeather);
  const forecastContainer = document.getElementById("forecastDisplay");
  forecastContainer.innerHTML = ""; // clear previous

  displayWeather.forEach((forecast) => {
    const date = new Date(forecast.dt_txt).toLocaleDateString("en-IN", { weekday: 'short', day: 'numeric', month: 'short' });
    const temp = forecast.main.temp;
    const weather = forecast.weather[0].main;
    const icon = forecast.weather[0].icon;

    const card = document.createElement("div");
    card.classList.add("forecast-card");
    card.innerHTML = `
      <h3>${date}</h3>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="60" height="60" alt="${weather}">
      <p>${weather}</p>
      <p>${temp}°C</p>
      <p></p>
    `;

  forecastContainer.appendChild(card);
});

}



function showWarning(message) {
    weatherDisplay.innerHTML = `<div class="error-message">${message}</div>`;
}

setWeatherTheme('Clear', 'clear sky');