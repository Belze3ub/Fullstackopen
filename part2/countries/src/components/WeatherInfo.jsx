import axios from "axios";
import { useEffect, useState } from "react";
const api_key = import.meta.env.VITE_API_KEY;

function WeatherInfo({ lat, lon }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;

    axios.get(url).then((response) => {
      setWeatherData(response.data);
    });
  }, [lat, lon]);

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      <h2>Weather Information</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].main}
      />
      <p>Wind speed: {weatherData.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherInfo;