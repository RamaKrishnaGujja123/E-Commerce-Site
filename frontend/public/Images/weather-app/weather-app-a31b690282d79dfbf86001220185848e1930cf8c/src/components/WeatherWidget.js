import React from 'react';
import '../styles/WeatherWidget.css';

const WeatherWidget = ({ weatherData }) => {
  return (
    <div className="weather-widget">
      <h2>Weather Widget</h2>
      <div className="widget">
        <p>{weatherData.name}</p>
        <p>{Math.round(weatherData.main.temp)}°C</p>
        <p>{weatherData.weather[0].description}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;