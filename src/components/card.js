import { api } from "../components/index.js";
// import { closePopup, openPopup } from "../components/modal.js";
import {zoomedPicture} from  "../components/index.js";


// import { deleteLike, placeLike, removeCard } from "../components/api.js";
import {
  cardsList,
  zoomImg,
  popupDelete,
  cardTemplate,
} from "../utils/constants.js"

import PopupWithDelete from "../components/PopupWithDelete.js";

let cardDeleteId;
let cardToDelete;


export default class Card {
  constructor(cardData, user, selector) {
    this._user = user;
    this._selector = selector;
    this._likes = cardData.likes;
    this._link = cardData.link;
    this._name = cardData.name;
    this._cardId = cardData._id;
    this._authorId = cardData.owner._id;
  }

  _getElement() {
    const cardElement = document
      .querySelector(".card-template")
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._title;
    this._likeCount = this._element.querySelector(".card__like-count");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeCount.textContent = this._likes.length;
    this._cardDeleteButton = this._element.querySelector(".card__delete-button");

    this._checkLikes();
    this._checkAuthor();
    this._setEventListeners();

    return this._element;
}

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) => this._likeCard(evt));
    this._cardDeleteButton.addEventListener("click", (evt) => popupForDelete.openPopup(evt));
    this._cardImage.addEventListener("click", () => {
      zoomedPicture.showImagePopup(this._link, this._name);
    });
  }

  _checkLikes() {
   this._likes.forEach((like) => {
    if (like._id === this._authorId) {
      this._likeButton.classList.add("card__like-button_active");
    }
   });
  }

  _checkAuthor () {
    if (this._user !== this._authorId) {
      this._cardDeleteButton.classList.add("card__delete-button_hidden");
    }
  }

  _likeCard(evt) {
    if (evt.target.classList.contains("card__like-button_active")) {
      api.deleteLike(this._cardId)
        .then((res) => {
          this._likeCount.textContent = res.likes.length;
          evt.target.classList.toggle("card__like-button_active");
        })
        .catch((err) => console.log(err));
    } else {
      api.placeLike(this._cardId)
        .then((res) => {
          this._likeCount.textContent = res.likes.length;
          evt.target.classList.toggle("card__like-button_active");
        })
        .catch((err) => console.log(err));
    }
  }

}

//Создание новой карточки
// function createCard(cardData, profile) {
//   const cardTemplate = document.querySelector(".card-template").content;
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImage = cardElement.querySelector(".card__image");
//   const likeCount = cardElement.querySelector(".card__like-count");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const cardDeleteButton = cardElement.querySelector(".card__delete-button");


//   cardImage.src = cardData.link;
//   cardImage.alt = cardData.name;
//   likeCount.textContent = cardData.likes.length;
//   //Делаем лайки активными при загрузке с сервера
//   cardData.likes.forEach((like) => {
//     if (like._id === profile._id) {
//       likeButton.classList.add("card__like-button_active");
//     }
//   });
//   //Проверяем владельца карточки
//   if (profile._id !== cardData.owner._id) {
//     cardDeleteButton.classList.add("card__delete-button_hidden");
//   }
//   cardElement.querySelector(".card__title").textContent = cardData.name;
//   cardElement
//     .querySelector(".card__like-button")
//     .addEventListener("click", (evt) => likeCard(evt, cardData, likeCount));
//   cardDeleteButton.addEventListener("click", (evt) => openDeletePopup (evt,cardData));

//   cardImage.addEventListener("click", () => {
//     zoomedPicture.showImagePopup(cardData.link, cardData.name);
//   });
//   return cardElement;
// }


// function likeCard(evt, cardData, likeCount) {
//   if (evt.target.classList.contains("card__like-button_active")) {
//     api.deleteLike(cardData._id)
//       .then((res) => {
//         likeCount.textContent = res.likes.length;
//         evt.target.classList.toggle("card__like-button_active");
//       })
//       .catch((err) => console.log(err));
//   } else {
//     api.placeLike(cardData._id)
//       .then((res) => {
//         likeCount.textContent = res.likes.length;
//         evt.target.classList.toggle("card__like-button_active");
//       })
//       .catch((err) => console.log(err));
//   }
// }

// //Экземпляр класса для попапа удаления карточки
const popupForDelete = new PopupWithDelete(popupDelete, {
  submitHandler: () => {
      api.removeCard(this.card_Id)
      .then(() => {
        card.remove();
        popupForDelete.closePopup();
      })
      .catch((err) => console.log(err));
  }

});

popupForDelete.setEventListeners();

// Открытие попапа с удалением

// function openDeletePopup (evt,cardData) {
//   popupForDelete.openPopup();
//   cardDeleteId = cardData._id;
//   cardToDelete = evt.target.closest(".card");
// }



export { cardsList, zoomImg };
