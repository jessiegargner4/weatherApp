import { useState, useEffect } from 'react'
import rainThunderStorm from './assets/1 Weather Icon by freeject.png'
import snow from './assets/2 Weather Icon by freeject.png'
import lightRain from './assets/3 Weather Icon by freeject.png'
import sleet from './assets/4 Weather Icon by freeject.png'
import heavyRain from './assets/5 Weather Icon by freeject.png'
import clearNight from './assets/6 Weather Icon by freeject.png'
import sunny from './assets/7 Weather Icon by freeject.png'
import cloudyWind from './assets/8 Weather Icon by freeject.png'
import partlyCloudyNight from './assets/9 Weather Icon by freeject.png'
import partlyCloudyDay from './assets/10 Weather Icon by freeject.png'
import clearNight2 from './assets/13 Weather Icon by freeject.png'
import fullCloud from './assets/14 Weather Icon by freeject.png'
import thunderstorm from './assets/15 Weather Icon by freeject.png'

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
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=35.9799&longitude=-78.5097&past_days=10&hourly=precipitation_probability,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,temperature_2m,relative_humidity_2m,wind_speed_10m&temperature_unit=fahrenheit");
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

    const { time, temperature_2m, relative_humidity_2m, wind_speed_10m, precipitation_probability, cloud_cover, cloud_cover_low, cloud_cover_mid, cloud_cover_high } = weatherData.hourly;

    return time.slice(0, 24).map((timestamp: string, index: number) => (
      <div>
        <div><strong>Time:</strong> {new Date(timestamp).toLocaleString()}</div>
        <div><strong>Temperature:</strong> {temperature_2m[index]}°F</div>
        <div><strong>Humidity:</strong> {relative_humidity_2m[index]}%</div>
        <div><strong>Wind Speed:</strong> {wind_speed_10m[index]} km/h</div>
        <div><strong>Precipitation Probability:</strong> {precipitation_probability[index]}%</div>
        <div><strong>Cloud Details:</strong></div>
        <div>
          {"Coverage: " + cloud_cover[index]}%
          {cloud_cover_low[index] > 0 && <div>• Low Clouds (0-3 km): {cloud_cover_low[index]}%</div>}
          {cloud_cover_mid[index] > 0 && <div>• Mid Clouds (3-8 km): {cloud_cover_mid[index]}%</div>}
          {cloud_cover_high[index] > 0 && <div>• High Clouds (8+ km): {cloud_cover_high[index]}%</div>}
          {cloud_cover_low[index] === 0 && cloud_cover_mid[index] === 0 && cloud_cover_high[index] === 0 && <div>No cloud cover</div>}
        </div>
        <br></br>
      </div>
    ));
  };

  const renderWeatherIcon = () => {
    return (
      <div className='weatherIconContainer'>
        {weatherData?.hourly?.cloud_cover[0] > 0 && weatherData?.hourly?.cloud_cover[0] <= 50 ? (
          <img src={partlyCloudyDay} alt="Weather Icon"/>
        ) : weatherData?.hourly?.cloud_cover[0] == 0 && weatherData?.hourly?.time > "09:30:00 PM" && weatherData?.hourly?.time < "5:00:00 AM" ? (
          <img src={clearNight2} alt="Weather Icon"/>
        ) : weatherData?.hourly?.cloud_cover[0] > 50 ? (
          <img src={fullCloud} alt="Weather Icon"/>
        ) : weatherData?.hourly?.cloud_cover[0] == 0 && weatherData?.hourly?.time  < "9:30:00 PM" && weatherData?.hourly?.time > "5:00:00 AM" ? ( 
          <img src={sunny} alt="Weather Icon"/>
        ) : (
          <img src={thunderstorm} alt="Weather Icon"/>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mobileDisplayContainer">
        <h1>Weather Forecast</h1>
        {renderWeatherIcon()}
        
        {weatherData ? (
          <div>
            <div>
              <h2>Location Info</h2>
              <h3>Wake Forest NC</h3>
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
