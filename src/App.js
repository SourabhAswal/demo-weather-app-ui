import { useState } from "react";
import "./App.css"; // Import our CSS

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_URL =
    "https://demo-weather-backend-1023393735816.us-central1.run.app";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(`${API_URL}/weather?city=${city}`);
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <h1 className="title">🌤 Weather App</h1>

        <div className="input-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>

        {weather && weather.main && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p className="temp">{weather.main.temp}°C</p>
          </div>
        )}

        {weather && weather.error && (
          <p className="error">{weather.error}</p>
        )}
      </div>
    </div>
  );
}

export default App;
