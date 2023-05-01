class Api {
  constructor(url, idGroup, token) {
    this._url = url;
    this._idGroup = idGroup;
    this._headers = {'authorization': token, 'Content-Type': 'application/json'};
    this._uri = `${this._url}${this._idGroup}/`;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  getUserInfo() {
    return fetch(`${this._uri}users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  getAllCardList() {
    return fetch(`${this._uri}cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  updateUserProfile(name, about) {
    return fetch(`${this._uri}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._getResponseData(res));
  }

  createCard(name, link) {
    return fetch(`${this._uri}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._uri}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(idCard, isLiked) {
    return fetch(`${this._uri}cards/${idCard}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  updateProfileAvatar(avatarLink) {
    return fetch(`${this._uri}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
      .then(res => this._getResponseData(res));
  }
}

const backendUrl = 'https://mesto.nomoreparties.co/v1/';
const identifierGroup = 'cohort-63';
const token = '401790cd-8952-43f4-b06b-ba54f72ca752';
export const api = new Api(backendUrl, identifierGroup, token);
