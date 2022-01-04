import {
  popupProfile,
  popupPlace,
  popupImage,
  popupAvatar,
  popupDelete,
  buttonProfileEdit,
  buttonAvatarEdit,
  buttonPlaceAdd,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  avatarInput,
  profileSubmitButton,
  placeSubmitButton,
  avatarSubmitButton,
  formProfileElement,
  formAvatarElement,
  popupModals,
  nameInput,
  jobInput,
  formPlaceElement,
  placeInput,
  imageInput,
} from '../utils/constants.js'
import FormValidator from "./FormValidator.js";
import { createCard, cardsList } from "./card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
// import PopupWithDelete from "../components/PopupWithDelete.js";

import "../pages/index.css";

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-4",
  headers: {
    authorization: "61de9a72-5985-428d-ba82-f3cc85d60f49",
    "Content-Type": "application/json",
  },
};

import Api from "./Api.js"
const api = new Api(apiConfig)

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

//Экземпляр класса для FormValidator
const validationProfile = new FormValidator(config, formProfileElement);
validationProfile.enableValidation();

// экземпляр класса для профиля
const popupWithProfile = new PopupWithForm(popupProfile,{
submitHandler: () => {
  profileSubmitButton.textContent = "Сохранение...";
  api.editProfile(nameInput.value, jobInput.value)
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileSubtitle.textContent = profile.about;
      popupWithProfile.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    });
}
});

popupWithProfile.setEventListeners();

buttonProfileEdit.addEventListener("click", function () {
  // вызов метода для профиля
  validationProfile.disablesValidation();
  popupWithProfile.openProfilePopup()
});
// * Avatar
const validationAvatarEdit = new FormValidator(config, formAvatarElement);
validationAvatarEdit.enableValidation();

//экземпляр класса для аватара
const popupWithAvatar = new PopupWithForm(popupAvatar, {
  submitHandler: () => {
    avatarSubmitButton.textContent = "Сохранение...";
    api.updateAvatar(avatarInput.value)
      .then((res) => {
        profileAvatar.src = res.avatar;
        popupWithAvatar.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarSubmitButton.textContent = "Сохранить";
      });
  }
});
popupWithAvatar.setEventListeners();


buttonAvatarEdit.addEventListener("click", function () {
  validationAvatarEdit.disablesValidation();
  popupWithAvatar.openPopup();
});
// * AddCard
const validationPlaceAdd = new FormValidator(config, formPlaceElement);
validationPlaceAdd.enableValidation();

//экземпляр класса для карточек
const popupWithCard = new PopupWithForm(popupPlace, {
  submitHandler: () => {
    placeSubmitButton.textContent = "Создание...";
    api.addNewCard(placeInput.value, imageInput.value)
      .then((res) => {
        cardsList.prepend(createCard(res, user));
        popupWithCard.closePopup();
        popupWithCard.resetPlacePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        placeSubmitButton.textContent = "Создать";
      });
  }

});

popupWithCard.setEventListeners();


buttonPlaceAdd.addEventListener("click", function () {
  validationPlaceAdd.disablesValidation();
  popupWithCard.openPopup();
});

//Экземпляр класса для попапа увеличения картинки
const zoomedPicture = new PopupWithImage(popupImage);
zoomedPicture.setEventListeners();


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
  zoomedPicture,
};
