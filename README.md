🌤️ Weather Application

A simple yet powerful weather app that fetches and displays real-time weather data based on the city name entered by the user. Built using HTML, CSS, and JavaScript, with weather data provided by the OpenWeatherMap API.

🔗 Live Demo
🌐 View Live App: https://your-deployment-link.com


🚀 Features
- Search weather by city name
- Real-time temperature, humidity, wind speed
- Displays location, weather description, and icons
- Error handling for invalid city names
- Clean, responsive UI 
- Fast and lightweight

🛠️ Tech Stack
- HTML
- CSS
- JavaScript (Vanilla)
- OpenWeatherMap API

📦 How It Works
1. User enters a city name in the input box
2. JavaScript sends a request to OpenWeatherMap API
3. Weather data is fetched and parsed
4. UI is updated dynamically using DOM manipulation

📁 Project Structure
weather-app/
├── index.html
├── style.css
├── script.js
└── README.md

🔑 API Key Setup
This project uses OpenWeatherMap API. To run it locally:
1. Create a free account at https://openweathermap.org
2. Get your API key
3. Replace "YOUR_API_KEY" in script.js with your actual API key

Example:
const API_KEY = "YOUR_API_KEY";

🧪 Sample City Names to Test
- London
- New York
- Tokyo
- Mumbai
- Berlin

⚠️ Error Handling
- If the city is not found, an alert or error message is shown.
- Prevents empty submissions.

🧠 What I Learned
- Using fetch() to call external APIs
- Handling asynchronous JavaScript with Promises
- DOM manipulation based on user input
- Managing UI state and basic UX principles
- API key security practices

🔮 Future Enhancements
- Auto-detect user location (Geolocation API)
- Dark mode toggle
- Country selection dropdown
- Unit conversion (°C ↔ °F)

🙋‍♂️ Author
Priyanshu Singh Chouhan
GitHub: https://github.com/priyanshusinghchouhan
