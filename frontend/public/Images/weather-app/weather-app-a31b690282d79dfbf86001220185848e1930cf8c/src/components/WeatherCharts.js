import React from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/WeatherCharts.css';

const WeatherCharts = ({ weatherData }) => {
  if (!weatherData || !weatherData.hourly) {
    return <p>Loading weather data...</p>;
  }

  const data = {
    labels: weatherData.hourly.map((hour) =>
      new Date(hour.dt * 1000).toLocaleTimeString()
    ),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.hourly.map((hour) => hour.temp),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="weather-charts">
      <h2>Weather Data Charts</h2>
      <Line data={data} />
    </div>
  );
};

export default WeatherCharts;
