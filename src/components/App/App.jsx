import { useEffect, useState } from "react";

import "./App.css";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";

import { coordinates, APIkey } from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");
  const [weatherData, setWeatherData] = useState({
    city: "Default City",
    condition: "",
    isDay: true,
    temp: { C: 233, F: 451 },
    type: ""
  });
  console.log(weatherData);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error)
  }, []); // "[]" to run 1 time when component loads

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={() => {setActiveModal("add-garment")}} currentLocation={weatherData.city} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
          <ModalWithForm 
            title="New garment" 
            buttonText="Add garment" 
            activeModal={activeModal}
            handleCloseClick={closeActiveModal}
          >
            <label htmlFor="name" className="modal__label">Name
              <input id="name" type="text" className="modal__input" placeholder="Name" />
            </label>
            <label htmlFor="link" className="modal__label">Image
              <input id="link" type="url" className="modal__input" placeholder="Image URL" />
            </label>
            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">Select the weather type:</legend>
              <label htmlFor="hot" className="modal__label modal__label_type_radio">Hot
                <input id="hot" type="radio" className="modal__radio-input" />
              </label>
              <label htmlFor="warm" className="modal__label modal__label_type_radio">Warm
                <input id="warm" type="radio" className="modal__radio-input" />
              </label>
              <label htmlFor="cold" className="modal__label modal__label_type_radio">Cold
                <input id="cold" type="radio" className="modal__radio-input" />
              </label>
            </fieldset> 
          </ModalWithForm> 
          <ItemModal
            activeModal = {activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
