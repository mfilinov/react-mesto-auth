import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser.id;
  const isLiked = card.likes.some(i => i._id === currentUser.id);
  const cardLikeButtonClassName = `element__button-like${isLiked ? ' element__button-like_active' : ''}`

  const handleCardClick = () => {
    onCardClick(card);
  }
  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <article>
        <img onClick={handleCardClick} src={card.link} alt={card.name} className="element__image"/>
        <div className="element__basement">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
            <p className="element__like-counter">{card.likes.length}</p>
          </div>
        </div>
        {isOwn && <button onClick={handleDeleteClick} type="button" className="element__button-trash button-opacity"/>}
      </article>
    </li>
  )
}

export default Card
