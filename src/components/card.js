import { popupImage } from "../components/index.js";
import { openPopup } from "../components/modal.js";

const cardsList = document.querySelector(".cards");
const zoomImg = document.querySelector(".popup__picture");

//Удаление карточки
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

//Лайк карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

//Создание новой карточки
function createCard(cardData) {
  const cardTemplate = document.querySelector(".card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardImage.addEventListener("click", function () {
    showImagePopup(cardData.link, cardData.name);
  });
  return cardElement;
}

//открытие попапа с фотографией
function showImagePopup(cardLink, cardName) {
  zoomImg.src = cardLink;
  zoomImg.alt = cardName;
  popupImage.querySelector(".popup__description").textContent = cardName;
  openPopup(popupImage);
}

export { createCard, cardsList };
