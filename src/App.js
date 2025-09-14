import { useState } from "react";

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
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>

      <input
        className="border p-2 m-2"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={fetchWeather}
      >
        Get Weather
      </button>

      {weather && weather.main && (
        <div className="mt-4">
          <h2 className="text-xl">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p className="font-bold">{weather.main.temp} °C</p>
        </div>
      )}

      {weather && weather.error && (
        <p className="text-red-500 mt-4">{weather.error}</p>
      )}
    </div>
  );
}

export default App;
