import { useEffect, useState } from "react";

import "./App.css";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";

import { coordinates, APIkey } from "../../utils/constants";

import { defaultClothingItems } from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");
  const [weatherData, setWeatherData] = useState({
    city: "Default City",
    condition: "",
    isDay: true,
    temp: { C: 233, F: 451 },
    type: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };

  const handleAddItemSubmit = (inputValues) => {
    console.log(inputValues);
    setClothingItems([...clothingItems, inputValues]);
    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []); // "[]" to run 1 time when component loads

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={() => {
              setActiveModal("add-garment");
            }}
            currentLocation={weatherData.city}
          />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onClose={closeActiveModal}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
