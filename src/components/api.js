// const apiConfig = {
//   baseUrl: "https://nomoreparties.co/v1/plus-cohort-4",
//   headers: {
//     authorization: "61de9a72-5985-428d-ba82-f3cc85d60f49",
//     "Content-Type": "application/json",
//   },
// };

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

// function response(res) {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Ошибка: ${res.status}`);
// }

// const loadProfile = () => {
//   return fetch(`${apiConfig.baseUrl}/users/me`, {
//     headers: apiConfig.headers,
//   }).then(response);
// };

// const loadCards = () => {
//   return fetch(`${apiConfig.baseUrl}/cards`, {
//     headers: apiConfig.headers,
//   }).then(response);
// };

// const editProfile = (name, about) => {
//   return fetch(`${apiConfig.baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       name: name,
//       about: about,
//     }),
//   }).then(response);
// };

// const addNewCard = (name, link) => {
//   return fetch(`${apiConfig.baseUrl}/cards`, {
//     method: "POST",
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       name: name,
//       link: link,
//     }),
//   }).then(response);
// };

// Установка like
// const placeLike = (id) => {
//   return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
//     method: "PUT",
//     headers: apiConfig.headers,
//   }).then(response);
// };

// const deleteLike = (id) => {
//   return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
//     method: "DELETE",
//     headers: apiConfig.headers,
//   }).then(response);
// };

//Удаление карточки
// const removeCard = (id) => {
//   return fetch(`${apiConfig.baseUrl}/cards/${id}`, {
//     method: "DELETE",
//     headers: apiConfig.headers,
//   }).then(response);
// };

//Обновление аватара
// const updateAvatar = (picture) => {
//   return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
//     method: "PATCH",
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       avatar: picture,
//     }),
//   }).then(response);
// };

// export {
//   loadProfile,
//   loadCards,
//   editProfile,
//   addNewCard,
//   placeLike,
//   deleteLike,
//   removeCard,
//   updateAvatar,
// };
