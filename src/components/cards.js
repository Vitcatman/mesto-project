import {createImagePopup} from "../components/modal.js";
import {initialCards} from "../components/initial-cards.js";

const cardsList = document.querySelector(".cards");

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_active");
}


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
  cardImage.addEventListener("click", createImagePopup);
  return cardElement;
}

function addCard() {
  initialCards.forEach((element) => {
    cardsList.append(createCard(element));
  });
}
addCard(initialCards);

export {createCard, cardsList}
