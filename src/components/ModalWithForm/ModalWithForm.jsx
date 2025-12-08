import "./ModalWithForm.css";

function ModalWithForm({
  title,
  buttonText,
  isOpen,
  onSubmit,
  onClose,
  children,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h3 className="modal__title">{title}</h3>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
