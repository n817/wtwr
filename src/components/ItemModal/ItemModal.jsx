import "./ItemModal.css";

function ItemModal({ activeModal, card, handleCloseClick }) {
  return(
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close" onClick={handleCloseClick}></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__caption">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemModal;