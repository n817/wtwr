import "./Main.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return(
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__items">
        <p className="main__text">Today is {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit} / You may want to wear:</p>
        <ul className="main__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard 
                  key={item._id} 
                  item={item}
                  onCardClick={handleCardClick}
                />
              )
            })}
        </ul>
      </section>
    </main>
  )
}

export default Main;