import PopupWithForm from "./PopupWithForm";
import React from "react";

function ConfirmPopup({card, onClose, onDeleteCard, onOverlayClick}) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card.element);
    onClose();
  }

  return (
    <PopupWithForm title="Вы уверены?"
                   name="confirm"
                   isOpen={card.isOpen}
                   onClose={onClose}
                   submitName="Да"
                   onOverlayClick={onOverlayClick}
                   onSubmit={handleSubmit}/>
  )
}

export default ConfirmPopup
