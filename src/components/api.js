
export default class Api {

  constructor(apiConfig) {
    this._apiConfig = apiConfig
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  loadProfile() {
    return fetch(`${this._apiConfig.baseUrl}/users/me`, {
      headers: this._apiConfig.headers,
    }).then(this._response);
  };

  loadCards() {
    return fetch(`${this._apiConfig.baseUrl}/cards`, {
      headers: this._apiConfig.headers,
    }).then(this._response);
  }

  editProfile(name, about) {
    return fetch(`${this._apiConfig.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._response);
  }

  addNewCard(name, link) {
    return fetch(`${this._apiConfig.baseUrl}/cards`, {
      method: "POST",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._response);
  };

  placeLike(id) {
    return fetch(`${this._apiConfig.baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._apiConfig.headers,
    }).then(this._response);
  };

  deleteLike(id) {
    return fetch(`${this._apiConfig.baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._apiConfig.headers,
    }).then(this._response);
  };

  removeCard(id) {
    return fetch(`${this._apiConfig.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._apiConfig.headers,
    }).then(this._response);
  };

  updateAvatar(picture) {
    return fetch(`${this._apiConfig.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        avatar: picture,
      }),
    }).then(this._response);
  };
}

