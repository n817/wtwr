import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState(""); 

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={() => {setActiveModal("add-garment")}} />
        <Main weatherData={weatherData} />
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
        <ItemModal />
      </div>
    </div>
  )
}

export default App
