import { useEffect, useState } from "react";
import { Routes, Route, data } from "react-router-dom";

import "./App.css";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";

import { coordinates, APIkey } from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem } from "./api";

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
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteCard = (cardToDelete) => {
    deleteItem(cardToDelete._id).then(() => {
      setClothingItems((cards) =>
          cards.filter((item) => item._id !== cardToDelete._id),
        );
        closeActiveModal();
    }).catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };

  const handleAddItemSubmit = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      weather: inputValues.weather,
      imageUrl: inputValues.link,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>

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
            handleDeleteCard={handleDeleteCard}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
