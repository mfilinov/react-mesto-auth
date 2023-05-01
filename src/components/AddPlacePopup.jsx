import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace, onOverlayClick}) {
  const [imageNameData, setImageNameData] = React.useState({
    imageName: '',
    validationMessage: '',
    isValid: false
  });
  const [imageLinkData, setImageLinkData] = React.useState({
    imageLink: '',
    validationMessage: '',
    isValid: false
  })

  function handleInputImageNameChange(e) {
    setImageNameData({imageName: e.target.value, validationMessage: e.target.validationMessage, isValid: e.target.validity.valid});
  }

  function handleInputImageLinkChange(e) {
    setImageLinkData({imageLink: e.target.value, validationMessage: e.target.validationMessage, isValid: e.target.validity.valid});
  }


  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(imageNameData.imageName, imageLinkData.imageLink);
  }

  function closePopupAndCleanInput() {
    setImageNameData({imageName: '', validationMessage: '', isValid: false});
    setImageLinkData({imageLink: '', validationMessage: '', isValid: false});
    onClose();
  }

  const isSubmitDisabled = (!imageNameData.isValid || !imageLinkData.isValid)

  return (
    <PopupWithForm title="Новое место"
                   name="add-image"
                   isOpen={isOpen}
                   onClose={closePopupAndCleanInput}
                   onSubmit={handleSubmit}
                   onOverlayClick={onOverlayClick}
                   isSubmitDisabled={isSubmitDisabled}
                   submitName="Создать">
      <div className="popup__field">
        <input type="text" name="imageName" id="input-image-name" placeholder="Название"
               className={`popup__input popup__input_el_image-name${imageNameData.isValid ? '' : ' popup__input_type_error'}`}
               minLength="2" maxLength="30" required
               value={imageNameData.imageName}
               onChange={handleInputImageNameChange}
        />
        <span className="popup__form-input-error input-image-name-error">{imageNameData.validationMessage}</span>
      </div>
      <div className="popup__field">
        <input type="url" name="imageLink" id="input-image-link" placeholder="Ссылка на картинку"
               className={`popup__input popup__input_el_image-link${imageLinkData.isValid ? '' : ' popup__input_type_error'}`}
               required
               value={imageLinkData.imageLink}
               onChange={handleInputImageLinkChange}
        />
        <span className="popup__form-input-error input-image-link-error">{imageLinkData.validationMessage}</span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
