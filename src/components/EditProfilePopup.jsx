import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, onOverlayClick}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [nameData, setNameData] = React.useState({
    name: '',
    validationMessage: '',
    isValid: false
  });
  const [descriptionData, setDescriptionData] = React.useState({
    description: '',
    validationMessage: '',
    isValid: false
  });

  React.useEffect(() => {
    if (currentUser) {
      setNameData({name: currentUser.name, validationMessage: '', isValid: true});
      setDescriptionData({description: currentUser.about, validationMessage: '', isValid: true});
    }
  }, [currentUser]);

  function handleInputNameChange(e) {
    setNameData({name: e.target.value, validationMessage: e.target.validationMessage, isValid: e.target.validity.valid});
  }

  function handleInputDescriptionChange(e) {
    setDescriptionData({description: e.target.value, validationMessage: e.target.validationMessage, isValid: e.target.validity.valid});
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(nameData.name, descriptionData.description);
  }

  function closePopupAndCleanInput() {
    setNameData({name: currentUser.name, validationMessage: '', isValid: true});
    setDescriptionData({description: currentUser.about, validationMessage: '', isValid: true});
    onClose();
  }

  const isSubmitDisabled = (!nameData.isValid || !descriptionData.isValid)

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      isOpen={isOpen}
      onClose={closePopupAndCleanInput}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      isSubmitDisabled={isSubmitDisabled}
      submitName="Сохранить">
      <div className="popup__field">
        <input type="text"
               name="name"
               id="name-input"
               placeholder="Имя"
               className={`popup__input popup__input_el_name${nameData.isValid ? '' : ' popup__input_type_error'}`}
               minLength="2"
               maxLength="40"
               required
               value={nameData.name}
               onChange={handleInputNameChange}/>
        <span className="popup__form-input-error name-input-error">{nameData.validationMessage}</span>
      </div>
      <div className="popup__field">
        <input type="text"
               name="description"
               id="about-input"
               placeholder="О себе"
               className={`popup__input popup__input_el_job${descriptionData.isValid ? '' : ' popup__input_type_error'}`}
               minLength="2"
               maxLength="200"
               required
               value={descriptionData.description}
               onChange={handleInputDescriptionChange}/>
        <span className="popup__form-input-error about-input-error">{descriptionData.validationMessage}</span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup
