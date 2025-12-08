import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    weather: "",
    link: "",
  };
  const { values, handleChange } = useForm(defaultValues);
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          name="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="link" className="modal__label">
        Image
        <input
          id="link"
          name="link"
          type="url"
          className="modal__input"
          placeholder="Image URL"
          value={values.link}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          Hot
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            onChange={handleChange}
          />
        </label>
        <label className="modal__label modal__label_type_radio">
          Warm
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            onChange={handleChange}
          />
        </label>
        <label className="modal__label modal__label_type_radio">
          Cold
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="cold"
            onChange={handleChange}
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
