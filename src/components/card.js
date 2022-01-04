import { api } from "../components/index.js";
// import { closePopup, openPopup } from "../components/modal.js";
import {zoomedPicture} from  "../components/index.js";


// import { deleteLike, placeLike, removeCard } from "../components/api.js";
import {
  cardsList,
  zoomImg,
  popupDelete,
} from "../utils/constants.js"

import PopupWithDelete from "../components/PopupWithDelete.js";



let cardDeleteId;
let cardToDelete;

function likeCard(evt, cardData, likeCount) {
  if (evt.target.classList.contains("card__like-button_active")) {
    api.deleteLike(cardData._id)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        evt.target.classList.toggle("card__like-button_active");
      })
      .catch((err) => console.log(err));
  } else {
    api.placeLike(cardData._id)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        evt.target.classList.toggle("card__like-button_active");
      })
      .catch((err) => console.log(err));
  }
}


export default class Card {
  constructor(cardData, profile, selector) {
    //? думаю что тут придется делать как у Миши, но это не точно
    this._selector = selector;
    this._likes = cardData.likes;
    this._link = cardData.link;
    this._name = cardData.name;
    this._owner = cardData.owner._id;
    this._cardId = cardData._id;
    this._profileId = profile._id;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners(){
    
    this._cardLike.addEventListener("click", (evt) => this._likeCard(evt, this._cardId, likeCount));

    // this._cardDeleteButton = this._cardElement.querySelector(".card__delete-button")
    this._cardDeleteButton.addEventListener("click", (evt) => this._openDeletePopup(evt, cardData));
    // ? откуда showImagePopup?
    this._cardImage.addEventListener("click", () => {
      zoomedPicture.this._showImagePopup(cardData.link, cardData.name);
    });
  }

  _setCardValues() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCount.textContent = this._likes.length;
  }

  _checkLikesAndOwner() {
    this._likes.forEach((like) => {
      if (like._id === this._profileId) {
        this._likeButton.classList.add("card__like-button_active");
      }
    });

    if (this._profileId !== this._owner) {
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

  generate() {
    this.cardElement = this._getElement();

  }
}

//Создание новой карточки
function createCard(cardData, profile) {
  const cardTemplate = document.querySelector(".card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeCount = cardElement.querySelector(".card__like-count");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;
  //Делаем лайки активными при загрузке с сервера
  cardData.likes.forEach((like) => {
    if (like._id === profile._id) {
      likeButton.classList.add("card__like-button_active");
    }
  });
  //Проверяем владельца карточки
  if (profile._id !== cardData.owner._id) {
    cardDeleteButton.classList.add("card__delete-button_hidden");
  }
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => likeCard(evt, cardData, likeCount));
  cardDeleteButton.addEventListener("click", (evt) => openDeletePopup (evt,cardData));

  cardImage.addEventListener("click", () => {
    zoomedPicture.showImagePopup(cardData.link, cardData.name);
  });
  return cardElement;
}

// //Экземпляр класса для попапа удаления карточки
const popupForDelete = new PopupWithDelete(popupDelete, {
  submitHandler: () => {
      api.removeCard(cardDeleteId)
      .then(() => {
        cardToDelete.remove();
        popupForDelete.closePopup();
      })
      .catch((err) => console.log(err));
  }

});

popupForDelete.setEventListeners();

// Открытие попапа с удалением

function openDeletePopup (evt,cardData) {
  popupForDelete.openPopup();
  cardDeleteId = cardData._id;
  cardToDelete = evt.target.closest(".card");
}



export { createCard, cardsList, zoomImg };
