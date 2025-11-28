import "./ModalWithForm.css";

function ModalWithForm({ title, buttonText, children, activeModal, handleCloseClick }) {
  return(
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h3 className="modal__title">{title}</h3>
        <button type="button" className="modal__close" onClick={handleCloseClick}></button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm;