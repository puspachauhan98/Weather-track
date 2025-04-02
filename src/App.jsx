/** @format */

import React from "react";
import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    description: "",
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    country: "",
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  const searchWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=30a6b4526781dc9eff895055a4ea7ca1`
      )
      .then((response) => {
        console.log(response.data);
        setWeatherData({
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          temp_min: response.data.main.temp_min,
          temp_max: response.data.main.temp_max,
          humidity: response.data.main.humidity,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          country: response.data.sys.country,
        });
        setDataLoaded(true);
      });
  };

  return (
    <div className="App">
      <div className="inputs">
        <h1> Current Weather</h1>
        <input
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />

        <button onClick={searchWeather}>Search</button>
      </div>

      <div className="displaydata">
        {dataLoaded && (
          <div className="data">
            <h3> Description : {weatherData.description}</h3>
            <h3> Temperature : {weatherData.temp} </h3>
            <h3> Min Temperature : {weatherData.temp_min} </h3>
            <h3> Max Temperature : {weatherData.temp_max} </h3>
            <h3> Humidity : {weatherData.humidity} </h3>
            <h3>
              Sunrise :{" "}
              {new Date(weatherData.sunrise * 1000).toLocaleTimeString()}
            </h3>
            <h3>
              Sunset :{" "}
              {new Date(weatherData.sunset * 1000).toLocaleTimeString()}
            </h3>
            <h3> Country : {weatherData.country} </h3>
            <h3> City : {city} </h3>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
