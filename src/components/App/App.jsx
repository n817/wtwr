import { useCallback, useEffect, useState } from "react";
import { Routes, Route, data } from "react-router-dom";

import "./App.css";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import api from "../../utils/api.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import * as auth from "../../utils/auth.js";

import { coordinates, APIkey } from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});
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
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  const openRegistrationModal = () => {
    setActiveModal("register");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openEditProfileModal = () => {
    setActiveModal("edit");
  };

  const openAddItemModal = () => {
    setActiveModal("add-item");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleLikeClick = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    return isLiked
      ? api
          .removeCardLike(id, token)
          .then((newCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? newCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : api
          .addCardLike(id, token)
          .then((newCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? newCard : item)),
            );
          })
          .catch((err) => console.log(err));
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

    api.addItem(newCardData, localStorage.getItem("jwt"))
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const openDeleteConfirmationModal = (card) => {
    setActiveModal("delete-confirmation");
    setCardToDelete(card);
  };

  const handleCardDelete = () => {
    api
      .deleteItem(cardToDelete._id, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((c) => c._id !== cardToDelete._id),
        );
        setCardToDelete(null);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const fetchUserInfo = useCallback((token) => {
    auth
      .checkToken(token)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
        } else {
          localStorage.removeItem("jwt");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoggedInLoading(false);
      });
  }, []);

  // Fetch user info on page load if JWT already exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserInfo(token);
    } else {
      setIsLoggedInLoading(false);
    }
  }, [fetchUserInfo]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    api.getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []); // "[]" to run 1 time when component loads

  const onRegister = ({ name, avatar, email, password }, resetForm) => {
    auth
      .register(name, avatar, email, password)
      .then((res) => {
        if (res._id) {
          const userData = {
            name,
            avatar,
            email,
            password,
          };
          resetForm();
          onLogin(userData);
        } else {
          // invalid data
        }
      })
      .catch((err) => console.log(err));
  };

  const onLogin = ({ email, password }, resetForm) => {
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          // When the `onLogin()` handler is called, the JWT is saved
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          closeActiveModal();
          // Manually fetch userInfo after login in addition to on first page load since we have the JWT now
          fetchUserInfo(res.token);
          resetForm && resetForm();
        }
      })
      .catch((err) => console.log(err));
  };

  const onEdit = (userData, resetForm) => {
    api
      .setUserInfo(userData, localStorage.getItem("jwt"))
      .then((res) => {
        setCurrentUser(res.data);
        closeActiveModal();
        resetForm();
      })
      .catch((err) => console.log(err));
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={openAddItemModal}
              currentLocation={weatherData.city}
              handleRegisterClick={openRegistrationModal}
              handleLoginClick={openLoginModal}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onLikeClick={handleLikeClick}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isLoggedInLoading={isLoggedInLoading}
                  >
                    {clothingItems.length !== 0 && (
                      <Profile
                        clothingItems={clothingItems}
                        handleCardClick={handleCardClick}
                        onAddNewClick={openAddItemModal}
                        onProfileChange={openEditProfileModal}
                        onLogOut={onSignOut}
                        onLikeClick={handleLikeClick}
                      />
                    )}
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />

            <RegisterModal
              isOpen={activeModal === "register"}
              onCloseModal={closeActiveModal}
              onRegister={onRegister}
              onClickLogIn={openLoginModal}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onCloseModal={closeActiveModal}
              onLogin={onLogin}
              onClickRegister={openRegistrationModal}
            />

            <AddItemModal
              isOpen={activeModal === "add-item"}
              onAddItem={handleAddItemSubmit}
              onClose={closeActiveModal}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              handleCloseClick={closeActiveModal}
              handleDeleteCard={openDeleteConfirmationModal}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "delete-confirmation"}
              onClose={closeActiveModal}
              onCardDelete={handleCardDelete}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
