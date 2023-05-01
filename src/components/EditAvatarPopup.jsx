import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, onOverlayClick}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  function closePopupAndCleanInput() {
    avatarRef.current.value = "";
    onClose();
  }

  return (
    <PopupWithForm title="Обновить аватар" name="update-avatar" isOpen={isOpen}
                   onClose={closePopupAndCleanInput} submitName="Сохранить" onSubmit={handleSubmit}
                   onOverlayClick={onOverlayClick} isSubmitDisabled={false}>
      <div className="popup__field">
        <input ref={avatarRef} type="url" name="avatarLink" id="input-avatar-link" placeholder="Ссылка на аватар"
               className="popup__input popup__input_el_avatar-link" required/>
        <span className="popup__form-input-error input-avatar-link-error"/>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
