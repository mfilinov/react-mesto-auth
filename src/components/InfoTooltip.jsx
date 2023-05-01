import ClosePopupByEsc from "../utils/ClosePopupByEsc";
import React from "react";
import successImage from '../images/success.svg'
import errorImage from '../images/error.svg'

function InfoTooltip({isOpen, onClose, onOverlayClick, isError}) {
  function handleOverlayClick(e) {
    onOverlayClick(e, onClose);
  }

  return (
    <div onMouseDown={handleOverlayClick} className={`popup popup-info-tooltip${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        {isError
          ?
          <>
            <img src={errorImage} alt="Изображение Неудача" className="info-tooltip__img"/>
            <p className="info-tooltip__text">Что-то пошло не&nbsp;так!<br/>Попробуйте ещё раз.</p>
          </>
          :
          <>
            <img src={successImage} alt="Изображение Успех" className="info-tooltip__img"/>
            <p className="info-tooltip__text">Вы&nbsp;успешно<br/>зарегистрировались!</p>
          </>
        }
        <button onClick={onClose} type="button" className="popup__button popup__button-close button-opacity"></button>
      </div>
      {isOpen && <ClosePopupByEsc onClose={onClose}/>}
    </div>
  )
}

export default InfoTooltip
