export default class Api {
  constructor(apiConfig) {
    this._apiConfig = apiConfig;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  loadProfile() {
    return fetch(`${this._apiConfig.baseUrl}/users/me`, {
      headers: this._apiConfig.headers,
    }).then(this._checkResponse);
  }

  loadCards() {
    return fetch(`${this._apiConfig.baseUrl}/cards`, {
      headers: this._apiConfig.headers,
    }).then(this._checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._apiConfig.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this._apiConfig.baseUrl}/cards`, {
      method: "POST",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  placeLike(id) {
    return fetch(`${this._apiConfig.baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._apiConfig.headers,
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this._apiConfig.baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._apiConfig.headers,
    }).then(this._checkResponse);
  }

  removeCard(id) {
    return fetch(`${this._apiConfig.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._apiConfig.headers,
    }).then(this._checkResponse);
  }

  updateAvatar(picture) {
    return fetch(`${this._apiConfig.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        avatar: picture,
      }),
    }).then(this._checkResponse );
  }
}
