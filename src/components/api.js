const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    authorization: '61de9a72-5985-428d-ba82-f3cc85d60f49',
    'Content-Type': 'application/json'
  }
}

function response(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
};

const loadProfile = () => {
 return fetch(`${apiConfig.baseUrl}/users/me`, {headers: apiConfig.headers})
 .then(response)
}

const loadCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {headers: apiConfig.headers})
  .then(response)
 }

 const editProfile = (name, about) => {
  return fetch(`${apiConfig.baseUrl}/users/me`,{
  method: 'PATCH',
  headers: apiConfig.headers,
  body: JSON.stringify({
    name: name,
    about: about,
  }),
  })
  .then(response);
 };

 const addNewCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}/cards`,{
  method: 'POST',
  headers: apiConfig.headers,
  body: JSON.stringify({
    name: name,
    link: link,
  }),
  })
  .then(response);
 };

 // Установка like
 const placeLike = (id) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: apiConfig.headers})
  .then(response)
 }

 const deleteLike = (id) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: apiConfig.headers})
  .then(response)
 }

 //Удаление карточки
 const removeCard = (id) => {
  return fetch(`${apiConfig.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: apiConfig.headers})
  .then(response)
 }

 //Обновление аватара
 const updateAvatar = (picture) => {
   return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
     method: 'PATCH',
     headers: apiConfig.headers,
     body: JSON.stringify({
      avatar: picture,
    })
    })
    .then(response)

  }


 export {loadProfile, loadCards, editProfile, addNewCard, placeLike, deleteLike, removeCard, updateAvatar}


