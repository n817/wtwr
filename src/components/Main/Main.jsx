import "./Main.css";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main() {
  return(
    <main>
      <p>What to Wear?</p>
      <WeatherCard />
      <ItemCard />
    </main>
  )
}

export default Main;