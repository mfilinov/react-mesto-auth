import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Footer from "./Footer";
import Header from "./Header";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards, userEmail, loggedIn, onSignOut}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header loggedIn={loggedIn} redirectLink="/sign-in" redirectLinkText="Выйти" userEmail={userEmail} onSignOut={onSignOut}/>
      <main className="content">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar">
              <img src={currentUser.avatar} alt="Аватар" className="profile__avatar-image"/>
              <button onClick={onEditAvatar} type="button"
                      className="profile__button-avatar button-opacity"></button>
            </div>
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button onClick={onEditProfile} type="button"
                      className="profile__button-edit button-opacity"></button>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
          </div>
          <button onClick={onAddPlace} type="button" className="profile__button-add button-opacity"></button>
        </section>
        <section className="elements" aria-label="галерея">
          <ul className="elements__list list">
            {cards.map(card => (<Card
                key={card['_id']}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />)
            )}
          </ul>
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default Main
