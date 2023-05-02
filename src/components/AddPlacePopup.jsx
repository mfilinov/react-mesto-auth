import PopupWithForm from "./PopupWithForm";
import React from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";

function AddPlacePopup({isOpen, onClose, onAddPlace, onOverlayClick}) {
  const {values, handleChange, errors, isValid, setValues} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values.imageName, values.imageLink);
  }

  React.useEffect(() => {
    setValues({imageName: '', imageLink: ''})
  }, [isOpen]);

  return (
    <PopupWithForm title="Новое место"
                   name="add-image"
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   onOverlayClick={onOverlayClick}
                   isSubmitDisabled={!isValid}
                   submitName="Создать">
      <div className="popup__field">
        <input type="text" name="imageName" id="input-image-name" placeholder="Название"
               className={`popup__input popup__input_el_image-name${errors.imageName ? '' : ' popup__input_type_error'}`}
               minLength="2" maxLength="30" required
               value={values.imageName || ""}
               onChange={handleChange}
        />
        <span className="popup__form-input-error input-image-name-error">{errors.imageName}</span>
      </div>
      <div className="popup__field">
        <input type="url" name="imageLink" id="input-image-link" placeholder="Ссылка на картинку"
               className={`popup__input popup__input_el_image-link${errors.imageLink ? '' : ' popup__input_type_error'}`}
               required
               value={values.imageLink || ""}
               onChange={handleChange}
        />
        <span className="popup__form-input-error input-image-link-error">{errors.imageLink}</span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
