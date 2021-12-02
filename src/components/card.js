import { popupImage} from "../components/index.js";
import { openPopup } from "../components/modal.js";
import { deleteLike, placeLike, removeCard } from "../components/api.js";

const cardsList = document.querySelector(".cards");
const zoomImg = document.querySelector(".popup__picture");

//Удаление карточки
function deleteCard(evt,cardData) {
  removeCard(cardData._id)
  .then(() =>{
    evt.target.closest(".card").remove();
  })
}

function likeCard(evt, cardData, likeCount) {
  if (evt.target.classList.contains("card__like-button_active")) {
    deleteLike(cardData._id)
    .then((res) =>{
      likeCount.textContent = res.likes.length;
      evt.target.classList.toggle("card__like-button_active");
    })
    .catch((err) => console.log(err))
  } else {
    placeLike(cardData._id)
    .then((res) =>{
      likeCount.textContent = res.likes.length;
      evt.target.classList.toggle("card__like-button_active");
    })
    .catch((err) => console.log(err))
  }
}

//Создание новой карточки
function createCard(cardData, profile) {
  const cardTemplate = document.querySelector(".card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeCount = cardElement.querySelector('.card__like-count');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;
  //Делаем лайки активными при загрузке с сервера
  cardData.likes.forEach((like) => {
    if (like._id === profile._id) {
      likeButton.classList.add('card__like-button_active')
    }})
  //Проверяем владельца карточки
    if (profile._id !== cardData.owner._id) {
      cardDeleteButton.classList.add("card__delete-button_hidden")
    }
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => likeCard(evt, cardData, likeCount));
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => deleteCard(evt, cardData));
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
