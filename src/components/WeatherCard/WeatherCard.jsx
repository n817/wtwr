import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherConditions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredWeatherConditions = weatherConditions.filter((option) => {
    return (
      option.day === weatherData.isDay && 
      option.condition === weatherData.condition
    );
  });

  let weatherCondition ={};

  if (filteredWeatherConditions.length === 0) {
    weatherCondition.url = new URL(`../../images/weather/${weatherData.isDay ? "day" : "night"}/default.svg`, import.meta.url).href;
  } else {
      weatherCondition = filteredWeatherConditions[0];
  }


  return(
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}</p>
      <img 
        src={weatherCondition?.url} 
        alt={`Card showing ${weatherData.isDay ? "day" : "night"}time with ${weatherData.condition}`} 
        className="weather-card__image" />
    </section>
  )
}

export default WeatherCard;