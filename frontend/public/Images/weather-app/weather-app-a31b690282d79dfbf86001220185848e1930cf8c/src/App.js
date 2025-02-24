import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map";
import Forecast from "./components/Forecast";
import HourlyForecast from "./components/HourlyForecast";
import WeatherAlerts from "./components/WeatherAlerts";
import Favorites from "./components/Favorites";
import SearchHistory from "./components/SearchHistory";
import WeatherComparison from "./components/WeatherComparison";
import WeatherWidget from "./components/WeatherWidget";
import WeatherInsights from "./components/WeatherInsights";
import WeatherCharts from "./components/WeatherCharts";
import LanguageSwitcher from "./components/LanguageSwitcher";
import './styles/App.css';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [city, setCity] = useState("New York");
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const addToSearchHistory = useCallback((city) => {
    const updatedHistory = [city, ...searchHistory.filter(hist => hist !== city)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  }, [searchHistory]);

  const fetchForecast = useCallback(async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const dailyData = response.data.list.filter(reading => reading.dt_txt.includes("12:00:00")).slice(0, 5);
      setForecastData(dailyData);
      setHourlyData(response.data.list.slice(0, 24));
    } catch (err) {
      setError("Error fetching forecast data");
    }
  }, [apiKey]);

  const fetchWeather = useCallback(async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log("Weather data:", response.data); // Check the data in the console
      setWeatherData(response.data);
      setError(null);
      fetchForecast(response.data.coord.lat, response.data.coord.lon);
      addToSearchHistory(city);
    } catch (err) {
      setError("City not found");
      console.error("Error fetching weather data:", err); // Log errors
    }
  }, [apiKey, fetchForecast, addToSearchHistory]);

  useEffect(() => {
    fetchWeather(city);
  }, [city, fetchWeather]);

  const addToFavorites = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
      localStorage.setItem("favorites", JSON.stringify([...favorites, city]));
    }
  };

  const removeFromFavorites = (city) => {
    const updatedFavorites = favorites.filter(fav => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const savedSearchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setFavorites(savedFavorites);
    setSearchHistory(savedSearchHistory);
  }, []);

  return (
    <div className="app">
      <SearchBar setCity={setCity} />
      <LanguageSwitcher />
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div className="main-container">
          <WeatherCard data={weatherData} isCelsius={isCelsius} setUnit={setIsCelsius} addToFavorites={addToFavorites} />
          <Map lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
          <Forecast forecastData={forecastData} />
          <HourlyForecast hourlyData={hourlyData} />
          <WeatherAlerts lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
          <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />
          <SearchHistory searchHistory={searchHistory} setCity={setCity} />
          <WeatherComparison city={city} />
          <WeatherWidget weatherData={weatherData} />
          <WeatherInsights weatherData={weatherData} />
          <WeatherCharts weatherData={weatherData} />
        </div>
      )}
    </div>
  );
};

export default App;
