import React from 'react';
import UnitToggle from './UnitToggle';
import '../styles/WeatherCard.css';

const WeatherCard = ({ data, isCelsius, setUnit }) => {
  const { main, weather, wind, name, sys, visibility, timezone } = data;
  const temp = isCelsius ? main.temp : main.temp * 9/5 + 32;
  const localTime = new Date((new Date().getTime() + timezone * 1000)).toUTCString();

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>{localTime}</p>
      <p>{weather[0].description}</p>
      <div className="weather-details">
        <div>
          <h3>{Math.round(temp)}°{isCelsius ? "C" : "F"}</h3>
          <p>Temperature</p>
        </div>
        <div>
          <h3>{wind.speed} m/s</h3>
          <p>Wind Speed</p>
        </div>
        <div>
          <h3>{main.humidity}%</h3>
          <p>Humidity</p>
        </div>
        <div>
          <h3>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</h3>
          <p>Sunrise</p>
        </div>
        <div>
          <h3>{new Date(sys.sunset * 1000).toLocaleTimeString()}</h3>
          <p>Sunset</p>
        </div>
        <div>
          <h3>{visibility / 1000} km</h3>
          <p>Visibility</p>
        </div>
        <div>
          <h3>{main.pressure} hPa</h3>
          <p>Pressure</p>
        </div>
      </div>
      <UnitToggle isCelsius={isCelsius} setUnit={setUnit} />
    </div>
  );
};

export default WeatherCard;