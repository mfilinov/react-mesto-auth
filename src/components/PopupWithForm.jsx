import React from "react";
import ClosePopupByEsc from "../utils/ClosePopupByEsc";

function PopupWithForm(
  {
    name,
    title,
    submitName,
    isOpen,
    onClose,
    onSubmit,
    onOverlayClick,
    isSubmitDisabled=false,
    children
  }) {

  function handleOverlayClick(e) {
    onOverlayClick(e, onClose);
  }

  return (
    <div onMouseDown={handleOverlayClick}
         className={`popup popup-${name}${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          name={`popup-${name}-form`}
          className="popup__form"
          noValidate
          onSubmit={onSubmit}>
          {children}
          <button type="submit"
                  className={`popup__button popup__button-submit${isSubmitDisabled ? ' popup__button_disabled': ''}`}
                  disabled={isSubmitDisabled}>{submitName}</button>
        </form>
        <button onClick={onClose} type="button" className="popup__button popup__button-close button-opacity"/>
      </div>
      {isOpen && <ClosePopupByEsc onClose={onClose}/>}
    </div>
  );
}

export default PopupWithForm
