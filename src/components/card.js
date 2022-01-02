import { popupImage, popupDelete, api } from "../components/index.js";
import { closePopup, openPopup } from "../components/modal.js";
import {PopupWithImage} from  "../components/modal.js";
// import { deleteLike, placeLike, removeCard } from "../components/api.js";


const cardsList = document.querySelector(".cards");
const zoomImg = document.querySelector(".popup__picture");
const popupCardDeleteButton = document.querySelector(".popup__delete-button");
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

//Создание новой карточки
function createCard(cardData, profile) {
  const cardTemplate = document.querySelector(".card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeCount = cardElement.querySelector(".card__like-count");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const popupWithImage = new PopupWithImage(popupImage);
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
  // cardElement
  //   .querySelector(".card__delete-button")
  //   .addEventListener("click", (evt) => deleteCard(evt, cardData));
  cardImage.addEventListener("click", () => {
    popupWithImage.showImagePopup(cardData.link, cardData.name);
  });
  return cardElement;
}

//Открытие попапа с удалением

function openDeletePopup (evt,cardData) {
  openPopup(popupDelete);
  cardDeleteId = cardData._id;
  cardToDelete = evt.target.closest(".card");
}

//Удаление карточки
function deleteCard() {
  api.removeCard(cardDeleteId)
  .then(() => {
    cardToDelete.remove();
    closePopup(popupDelete);
  })
  .catch((err) => console.log(err));
}
popupCardDeleteButton.addEventListener("click", deleteCard);

//открытие попапа с фотографией
// function showImagePopup(cardLink, cardName) {
//   zoomImg.src = cardLink;
//   zoomImg.alt = cardName;
//   popupImage.querySelector(".popup__description").textContent = cardName;
//   openPopup(popupImage);
// }

export { createCard, cardsList, zoomImg };
