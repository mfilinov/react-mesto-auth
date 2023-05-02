import {useEffect, useState} from "react";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [deletionCardPopupOpen, setDeletionCardPopupOpen] = useState({
    isOpen: false,
    element: {}
  });
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    element: {}
  });
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    id: ""
  });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isRegistrationError, setIsRegistrationError] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
          api.getUserInfo(),
          api.getAllCardList()
        ]
      )
        .then(([userInfoRes, cardListRes]) => {
          setCurrentUser({
            name: userInfoRes.name,
            about: userInfoRes.about,
            avatar: userInfoRes.avatar,
            id: userInfoRes._id
          })
          setCards(cardListRes);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  }

  function handleConfirmationClick(card) {
    setDeletionCardPopupOpen({
      isOpen: true,
      element: card
    });
  }

  function handleOnCardClick(card) {
    setSelectedCard({
      isOpen: true,
      element: card
    });
  }

  function handleOverlayClick(evt, onClose) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({
      isOpen: false,
      element: {}
    });
    setDeletionCardPopupOpen({
      isOpen: false,
      element: {}
    });
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser.id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(prevState => prevState.filter((c) => c._id !== card._id)))
      .catch(err => console.log(err));
  }

  function handleUpdateUser(name, about) {
    api.updateUserProfile(name, about)
      .then(({name, about, avatar, _id}) => {
        setCurrentUser({name, about, avatar, id: _id});
        closeAllPopups();
      }).catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatarLink) {
    api.updateProfileAvatar(avatarLink)
      .then(({name, about, avatar, _id}) => {
        setCurrentUser({name, about, avatar, id: _id});
        closeAllPopups();
      }).catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api.createCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch(err => console.log(err));
  }

  function handleLogin(email, password) {
    api.authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        setEmail(email);
        navigate('/', {replace: true});
      })
      .catch(e => console.log(e));
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.getUserContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", {replace: true})
        })
        .catch(err => console.log(err));
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  function handleRegister(email, password) {
    api.register(email, password)
      .then((res) => {
        setIsRegistrationError(false);
        handleInfoTooltipClick();
        navigate('/sign-in', {replace: true});
      })
      .catch(() => {
        setIsRegistrationError(true);
        handleInfoTooltipClick();
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<ProtectedRoute
            element={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleOnCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmationClick}
            cards={cards}
            userEmail={email}
            onSignOut={signOut}/>}/>
          <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>}/>
          <Route path="/sign-up" element={<Register onRegister={handleRegister}/>}/>
          <Route path='*' element={loggedIn ? <Navigate to="/" replace/> : <Navigate to="/sign-in" replace/>}/>
        </Routes>
        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
                          onOverlayClick={handleOverlayClick}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
                       onOverlayClick={handleOverlayClick}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
                         onOverlayClick={handleOverlayClick}/>
        <ConfirmPopup card={deletionCardPopupOpen}
                      onClose={closeAllPopups}
                      onDeleteCard={handleCardDelete}
                      onOverlayClick={handleOverlayClick}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} onOverlayClick={handleOverlayClick}/>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          isError={isRegistrationError}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
