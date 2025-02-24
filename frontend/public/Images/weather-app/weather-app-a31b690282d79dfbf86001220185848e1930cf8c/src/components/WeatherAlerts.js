import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WeatherAlerts.css';

const WeatherAlerts = ({ lat, lon }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        );
        setAlerts(response.data.alerts || []);
      } catch (err) {
        console.error("Error fetching weather alerts", err);
      }
    };

    fetchAlerts();
  }, [lat, lon]);

  return (
    <div className="weather-alerts">
      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <div key={index} className="alert">
            <h3>{alert.event}</h3>
            <p>{new Date(alert.start * 1000).toLocaleString()} - {new Date(alert.end * 1000).toLocaleString()}</p>
            <p>{alert.description}</p>
          </div>
        ))
      ) : (
        <p>No weather alerts</p>
      )}
    </div>
  );
};

export default WeatherAlerts;