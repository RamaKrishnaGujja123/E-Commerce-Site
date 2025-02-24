import React from 'react';
import '../styles/Forecast.css';

const Forecast = ({ forecastData }) => {
  return (
    <div className="forecast">
      {forecastData.length > 0 ? (
        forecastData.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
            <p>{Math.round(day.main.temp)}°C</p>
          </div>
        ))
      ) : (
        <p>No forecast data available.</p>
      )}
    </div>
  );
};

export default Forecast;