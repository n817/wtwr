import "./ModalWithForm.css";

function ModalWithForm() {
  return(
    <div className="modal">
      <div className="modal__content">
        <h3 className="modal__title">New garment</h3>
        <button type="button" className="modal__close"></button>
        <form className="modal__form">
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
            <button type="submit" className="modal__submit-btn">Add garment</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm;