import { enableValidation, disableValidation } from "../components/validate.js";
import { createCard, cardsList } from "../components/cards.js";
import {
  closePopup,
  openPopup,
  openProfilePopup,
  resetPlacePopup,
} from "../components/modal.js";
import "../pages/index.css";

const popupProfile = document.querySelector(".popup_type_profile");
const popupPlace = document.querySelector(".popup_type_place-add");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonPlaceAdd = document.querySelector(".profile__add-button");
const buttonPlaceClose = document.querySelector(
  ".popup__close-button_type_place"
);
const buttonProfileClose = document.querySelector(
  ".popup__close-button_type_profile"
);
const buttonImageClose = document.querySelector(
  ".popup__close-button_type_image"
);
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileInputs = document.querySelectorAll(".edit-form__item");
const placeInputs = document.querySelectorAll(".place-form__item");
const formProfileElement = popupProfile.querySelector(".edit-form");
const popupModal = document.querySelectorAll(".popup");
const nameInput = popupProfile.querySelector(".edit-form__item_element_name");
const jobInput = popupProfile.querySelector(".edit-form__item_element_about");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__form-error",
};

buttonProfileEdit.addEventListener("click", function () {
  openProfilePopup(), disableValidation(profileInputs, config, popupProfile);
});

buttonProfileClose.addEventListener("click", () => closePopup());

buttonImageClose.addEventListener("click", () => closePopup());

buttonPlaceAdd.addEventListener("click", function () {
  openPopup(popupPlace), disableValidation(placeInputs, config, popupPlace);
});

buttonPlaceClose.addEventListener("click", function () {
  closePopup(), resetPlacePopup(popupPlace);
});

function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

formProfileElement.addEventListener("submit", submitProfileForm);

const formPlaceElement = popupPlace.querySelector(".place-form");
const placeInput = popupPlace.querySelector(".place-form__item_el_name");
const imageInput = popupPlace.querySelector(".place-form__item_el_link");

function submitPlaceForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeInput.value,
    link: imageInput.value,
  };

  cardsList.prepend(createCard(newCard));
  closePopup();
  resetPlacePopup(popupPlace);
}

formPlaceElement.addEventListener("submit", submitPlaceForm);

enableValidation(config);

export {
  popupProfile,
  popupModal,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  popupPlace,
};
