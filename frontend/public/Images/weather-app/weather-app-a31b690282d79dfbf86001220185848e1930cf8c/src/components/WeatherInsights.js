import React from 'react';
import '../styles/WeatherInsights.css';

const WeatherInsights = ({ weatherData }) => {
  const getInsights = () => {
    const temp = weatherData.main.temp;
    if (temp < 10) {
      return "It's quite cold, dress warmly!";
    } else if (temp < 20) {
      return "It's a bit chilly, consider a jacket.";
    } else if (temp < 30) {
      return "The weather is pleasant.";
    } else {
      return "It's quite hot, stay hydrated!";
    }
  };

  return (
    <div className="weather-insights">
      <h2>Weather Insights</h2>
      <p>{getInsights()}</p>
    </div>
  );
};

export default WeatherInsights;