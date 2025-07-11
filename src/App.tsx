import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m");
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

  return (
    <>
      <div>

      </div>
    </>
  )
}

export default App
