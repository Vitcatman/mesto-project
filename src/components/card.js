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
// * это перенесется в index.js и будет передаваться такой/почти такой фцнкцией через массив (как у Мишм)
// * так же с другими двумя функциями, их нужно писать не в card.js а в index.js
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
  constructor({cardData, profile, likeCard, showImagePopup, openDeletePopup}, selector) {
    this._cardData = cardData;
    this._profile = profile;
    this._likeCard = likeCard;
    this._showImagePopup = showImagePopup;
    this._openDeletePopup = openDeletePopup;
    this._selector = selector;
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
    
    this._likeButton.addEventListener("click", (evt) => this._likeCard(evt, this._cardData._id, this._likeCount));
    this._cardDeleteButton.addEventListener("click", (evt) => this._openDeletePopup(evt, this._cardData));
    // ? незнаю куда тут сунуть this / может быть this._showImagePopup ?
    this._cardImage.addEventListener("click", () => {
      zoomedPicture._showImagePopup(this._cardData.link, this._cardData.name);
    });
  }

  _setCardValues() {
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._likeCount.textContent = this._cardData.likes;
  }

  _checkLikesAndOwner() {
    this._likes.forEach((like) => {
      if (like._id === this._cardData.owner._id) {
        this._likeButton.classList.add("card__like-button_active");
      }
    });

    if (this._profile._id !== this._cardData.owner._id) {
      this._cardDeleteButton.classList.add("card__delete-button_hidden");
    }
  }

  generate() {
    this.cardElement = this._getElement();

    this._likeButton = this.cardElement.querySelector(".card__like-button");
    this._likeCount = this.cardElement.querySelector(".card__like-count");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete-button");
    this._cardImage = this.cardElement.querySelector(".card__image");

    this._setCardValues();
    this._checkLikesAndOwner();
    this._setEventListeners();

    return this.cardElement
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
