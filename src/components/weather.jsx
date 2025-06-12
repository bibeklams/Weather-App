import { IoIosSearch } from "react-icons/io";
import sun_icon from "../assets/sun.png";
import humidity_icon from "../assets/humidity.png";
import wind_speed_icon from "../assets/speed.png";
import few_cloud_icon from "../assets/flewcloud.png";
import black_cloud_icon from "../assets/blackcloud.png";
import mist_icon from "../assets/mist.png";
import few_rain_icon from "../assets/cloudy.png";
import thunder_icon from "../assets/thunderstorm.png";
import rain_icon from "../assets/snow.png";
import snow_icon from "../assets/cloud.png";
import clouds_icon from "../assets/clouds.png";
import { IoLocationSharp } from "react-icons/io5";
import "./weather.css";
import { useEffect, useState } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("kathmandu");

  const allIcons = {
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": few_cloud_icon,
    "02n": few_cloud_icon,
    "03d": clouds_icon,
    "03n": clouds_icon,
    "04d": black_cloud_icon,
    "04n": black_cloud_icon,
    "09d": few_rain_icon,
    "09n": few_rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunder_icon,
    "11n": thunder_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon,
  };

  const search = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_DATA
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

      const icon = allIcons[data.weather[0].icon] || sun_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      alert("Please check your connection!");
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  return (
    <div className="weather">
      <div className="search">
        <IoLocationSharp />
        <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <IoIosSearch
          onClick={() => search(city)}
          style={{ cursor: "pointer" }}
        />
      </div>

      {weatherData && (
        <>
          <div className="icon">
            <img src={weatherData.icon} alt="" />
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>
          </div>
          <div className="weather-data">
            <div>
              <img src={humidity_icon} alt="Humidity" />
              <span>
                <span>{weatherData.humidity}%</span>
                <span>Humidity</span>
              </span>
            </div>
            <div>
              <img src={wind_speed_icon} alt="Wind Speed" />
              <span>
                <span>{weatherData.windSpeed}km/h</span>
                <span>Wind Speed</span>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
