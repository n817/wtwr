import "./WeatherCard.css";
import weatherImage from "../../images/weather.svg";

function WeatherCard({ temp }) {
  return(
    <section className="weather-card">
      <p className="weather-card__temp">{temp}&deg; F</p>
      <img src={weatherImage} alt="" className="weather-card__image" />
    </section>
  )
}

export default WeatherCard;