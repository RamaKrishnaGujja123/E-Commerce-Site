import React from 'react';
import '../styles/HourlyForecast.css';

const HourlyForecast = ({ hourlyData }) => {
  return (
    <div className="hourly-forecast">
      {hourlyData.map((hour, index) => (
        <div key={index} className="hour">
          <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <img
            src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
            alt={hour.weather[0].description}
          />
          <p>{Math.round(hour.main.temp)}°C</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;