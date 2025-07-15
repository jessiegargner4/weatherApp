import { useState, useEffect } from 'react'
import './App.css'

function App() {
  interface WeatherData {
    hourly?: any;
    hourly_units?: any;
    latitude?: number;
    longitude?: number;
    elevation?: number;
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=35.9799&longitude=-78.5097&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&temperature_unit=fahrenheit");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  console.log(weatherData);

  const formatWeatherData = () => {
    if (!weatherData || !weatherData.hourly) return null;
    
    const { time, temperature_2m, relative_humidity_2m, wind_speed_10m } = weatherData.hourly;
    
    return time.slice(0, 24).map((timestamp: string, index: number) => (
      <div>
        <div><strong>Time:</strong> {new Date(timestamp).toLocaleString()}</div>
        <div><strong>Temperature:</strong> {temperature_2m[index]}°F</div>
        <div><strong>Humidity:</strong> {relative_humidity_2m[index]}%</div>
        <div><strong>Wind Speed:</strong> {wind_speed_10m[index]} km/h</div>
      </div>
    ));
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h1>Weather Forecast</h1>
        {weatherData ? (
          <div>
            <div>
              <h2>Location Info</h2>
              <h2>Wake Forest NC</h2>
              <p><strong>Latitude:</strong> {weatherData.latitude}</p>
              <p><strong>Longitude:</strong> {weatherData.longitude}</p>
              <p><strong>Elevation:</strong> {weatherData.elevation}m</p>
            </div>
            <h2>Hourly Forecast (Next 24 Hours)</h2>
            {formatWeatherData()}
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </>
  )
}

export default App
