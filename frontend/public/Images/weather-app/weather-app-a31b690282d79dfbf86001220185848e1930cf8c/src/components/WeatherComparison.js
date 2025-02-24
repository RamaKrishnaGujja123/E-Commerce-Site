import React, { useState } from 'react';
import axios from 'axios';
import '../styles/WeatherComparison.css';

const WeatherComparison = ({ city }) => {
  const [comparisonCity, setComparisonCity] = useState('');
  const [comparisonData, setComparisonData] = useState(null);

  const fetchComparisonData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`
      );
      setComparisonData(response.data);
    } catch (err) {
      console.error("Error fetching comparison data", err);
    }
  };

  const handleComparison = (e) => {
    e.preventDefault();
    fetchComparisonData(comparisonCity);
  };

  return (
    <div className="weather-comparison">
      <h2>Compare Weather</h2>
      <form onSubmit={handleComparison}>
        <input
          type="text"
          placeholder="Enter city name"
          value={comparisonCity}
          onChange={(e) => setComparisonCity(e.target.value)}
        />
        <button type="submit">Compare</button>
      </form>
      {comparisonData && (
        <div className="comparison-result">
          <h3>{comparisonData.name}</h3>
          <p>Temperature: {Math.round(comparisonData.main.temp)}°C</p>
          <p>Weather: {comparisonData.weather[0].description}</p>
          <p>Humidity: {comparisonData.main.humidity}%</p>
          <p>Wind Speed: {comparisonData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComparison;