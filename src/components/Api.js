export default class Api {
    constructor({ link, headers }) {
        this._link = link;
        this._headers = headers;
    }

    _serverResponceProcessing(res) {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    }

    addNewCard({ name, link}) {
      return fetch(`${this._link}cards`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({ name, link})
      })
      .then(res => {
        return this._serverResponceProcessing(res)
      })
    }

    getInitialCards() {
        return fetch(`${this._link}cards`, {
          headers: this._headers
        })
          .then(res => { return this._serverResponceProcessing(res) })
    }

    deleteCard(cardId) {
        return fetch(`${this._link}cards/${cardId}`, {
          headers: this._headers,
          method: 'DELETE',
        })
          .then(res => { return this._serverResponceProcessing(res) })
    }

    getUserData() {
        return fetch(`${this._link}users/me`, {
          headers: this._headers
        })
          .then(res => { return this._serverResponceProcessing(res) })
    }

    sendUserData(profileData) {
        return fetch(`${this._link}users/me`, {
          headers: this._headers,
          method: 'PATCH',
          body: JSON.stringify({ name: profileData.name, about: profileData.job })
        })
          .then(res => { return this._serverResponceProcessing(res) })
      }

    sendAvatarData(avatarLink) {
        return fetch(`${this._link}users/me/avatar`, {
          headers: this._headers,
          method: 'PATCH',
          body: JSON.stringify({ avatar: avatarLink.avatar })
        })
          .then(res => { return this._serverResponceProcessing(res) })
      }

    sendCardLike(id) {
        return fetch(`${this._link}cards/${id}/likes`, {
          headers: this._headers,
          method: 'PUT',
        })
          .then(res => { return this._serverResponceProcessing(res) })
      }

    deleteCardLike(id) {
        return fetch(`${this._link}cards/${id}/likes`, {
          headers: this._headers,
          method: 'DELETE',
        })
          .then(res => { return this._serverResponceProcessing(res) })
      }
}