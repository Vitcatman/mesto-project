// комментарий новый
import FormValidator from "../components/validate.js";
import { createCard, cardsList } from "./card.js";
import PopupWithForm from "../components/modal.js";

import {
  closePopup,
  openPopup,
  openProfilePopup,
  resetPlacePopup,
} from "../components/modal.js";
import "../pages/index.css";
// import {
//   loadProfile,
//   loadCards,
//   editProfile,
//   addNewCard,
//   updateAvatar,
// } from "./api.js";

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-4",
  headers: {
    authorization: "61de9a72-5985-428d-ba82-f3cc85d60f49",
    "Content-Type": "application/json",
  },
};

import Api from "../components/api.js"
const api = new Api(apiConfig)

const popupProfile = document.querySelector(".popup_type_profile");
const popupPlace = document.querySelector(".popup_type_place-add");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_avatar-add");
const popupDelete = document.querySelector(".popup_type_delete-card");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonAvatarEdit = document.querySelector(".profile__avatar-edit");
const buttonPlaceAdd = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");
const avatarInput = document.querySelector(".avatar-form__item");
const profileSubmitButton = document.querySelector(".edit-form__button");
const placeSubmitButton = document.querySelector(".place-form__button");
const avatarSubmitButton = document.querySelector(".avatar-form__button");
const formProfileElement = popupProfile.querySelector(".edit-form");
const formAvatarElement = popupAvatar.querySelector(".avatar-form");
const popupModals = document.querySelectorAll(".popup");
const nameInput = popupProfile.querySelector(".edit-form__item_element_name");
const jobInput = popupProfile.querySelector(".edit-form__item_element_about");
const formPlaceElement = popupPlace.querySelector(".place-form");
const placeInput = popupPlace.querySelector(".place-form__item_el_name");
const imageInput = popupPlace.querySelector(".place-form__item_el_link");
let user;

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__form-error",
};

Promise.all([api.loadCards(), api.loadProfile()])
  .then(([cards, profile]) => {
    cards.forEach((card) => {
      cardsList.append(createCard(card, profile));
    });
    profileTitle.textContent = profile.name;
    profileSubtitle.textContent = profile.about;
    profileAvatar.src = profile.avatar;
    user = profile;
  })
  .catch((err) => {
    console.log(err);
  });
// * Profile


const validationProfile = new FormValidator(config, formProfileElement);
validationProfile.enableValidation();

// экземпляр класса для профиля
const popupWithProfile = new PopupWithForm(popupProfile);

buttonProfileEdit.addEventListener("click", function () {
  // вызов метода для профиля
  validationProfile.disablesValidation();
  popupWithProfile.openProfilePopup()
  //openProfilePopup();
  // formProfileElement.reset();
});
// * Avatar
const validationAvatarEdit = new FormValidator(config, formAvatarElement);
validationAvatarEdit.enableValidation();

//экземпляр класса для аватара
const popupWithAvatar = new PopupWithForm(popupAvatar);


buttonAvatarEdit.addEventListener("click", function () {
  validationAvatarEdit.disablesValidation();
  popupWithAvatar.openPopup();
  // disableValidation(config, popupAvatar);
});
// * AddCard
const validationPlaceAdd = new FormValidator(config, formPlaceElement);
validationPlaceAdd.enableValidation();

//экземпляр класса для карточек
const popupWithCard = new PopupWithForm(popupPlace);

buttonPlaceAdd.addEventListener("click", function () {
  validationPlaceAdd.disablesValidation();
  popupWithCard.openPopup();
  // disableValidation(config, popupPlace);
});

//сабмит формы редактирования профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  profileSubmitButton.textContent = "Сохранение...";
  api.editProfile(nameInput.value, jobInput.value)
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileSubtitle.textContent = profile.about;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    });
}


//сабмит формы смены аватара
function submitAvatarForm(evt) {
  evt.preventDefault();
  avatarSubmitButton.textContent = "Сохранение...";
  api.updateAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    });
}

//закрытие по клику вне модального окна и по крестику
popupModals.forEach((element) => {
  element.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(element);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(element);
    }
  });
});

formProfileElement.addEventListener("submit", submitProfileForm);

//сабмит формы добавления новой карточки с местом
function submitPlaceForm(evt) {
  evt.preventDefault();
  placeSubmitButton.textContent = "Создание...";
  api.addNewCard(placeInput.value, imageInput.value)
    .then((res) => {
      cardsList.prepend(createCard(res, user));
      closePopup(popupPlace);
      resetPlacePopup(popupPlace);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      placeSubmitButton.textContent = "Создать";
    });
}

formPlaceElement.addEventListener("submit", submitPlaceForm);

formAvatarElement.addEventListener("submit", submitAvatarForm);

// enableValidation(config);

export {
  popupProfile,
  popupModals,
  popupAvatar,
  popupDelete,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  popupPlace,
  popupImage,
  api,
};
