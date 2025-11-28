import "./Main.css";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, handleCardClick }) {
  return(
    <main className="main">
      <WeatherCard />
      <section className="main__items">
        <p className="main__text">Today is 75&deg; F / You may want to wear:</p>
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