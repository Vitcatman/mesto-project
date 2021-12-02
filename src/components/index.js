import { enableValidation, disableValidation } from "../components/validate.js";
import { createCard, cardsList } from "./card.js";
import {
  closePopup,
  openPopup,
  openProfilePopup,
  resetPlacePopup,
} from "../components/modal.js";
import "../pages/index.css";
import {
  loadProfile,
  loadCards,
  editProfile,
  addNewCard,
  updateAvatar,
} from "./api.js";

const popupProfile = document.querySelector(".popup_type_profile");
const popupPlace = document.querySelector(".popup_type_place-add");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_avatar-add");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonAvatarEdit = document.querySelector(".profile__avatar-edit");
const buttonPlaceAdd = document.querySelector(".profile__add-button");
const buttonPlaceClose = document.querySelector(
  ".popup__close-button_type_place"
);
const buttonAvatarClose = document.querySelector(
  ".popup__close-button_type_avatar"
);
const buttonProfileClose = document.querySelector(
  ".popup__close-button_type_profile"
);
const buttonImageClose = document.querySelector(
  ".popup__close-button_type_image"
);
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");
const avatarInput = document.querySelector(".avatar-form__item");
const profileSubmitButton = document.querySelector(".edit-form__button");
const placeSubmitButton = document.querySelector(".place-form__button");
const avatarSubmitButton = document.querySelector(".avatar-form__button");
const formProfileElement = popupProfile.querySelector(".edit-form");
const formAvatarElement = popupAvatar.querySelector(".avatar-form");
const popupModal = document.querySelectorAll(".popup");
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

Promise.all([loadCards(), loadProfile()])
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

buttonProfileEdit.addEventListener("click", function () {
  openProfilePopup(), disableValidation(config, popupProfile);
});

buttonAvatarEdit.addEventListener("click", function () {
  openPopup(popupAvatar), disableValidation(config, popupAvatar);
});

buttonProfileClose.addEventListener("click", () => closePopup(popupProfile));

buttonImageClose.addEventListener("click", () => closePopup(popupImage));

buttonAvatarClose.addEventListener("click", () => closePopup(popupAvatar));

buttonPlaceAdd.addEventListener("click", function () {
  openPopup(popupPlace), disableValidation(config, popupPlace);
});

buttonPlaceClose.addEventListener("click", function () {
  closePopup(popupPlace);
});

//сабмит формы редактирования профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  profileSubmitButton.textContent = "Сохранение...";
  editProfile(nameInput.value, jobInput.value)
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileSubtitle.textContent = profile.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    });
  closePopup(popupProfile);
}

//сабмит формы смены аватара
function submitAvatarForm(evt) {
  evt.preventDefault();
  avatarSubmitButton.textContent = "Сохранение...";
  updateAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    });
  closePopup(popupAvatar);
}

//закрытие по клику вне модального окна
popupModal.forEach((element) => {
  element.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
    }
  });
});

formProfileElement.addEventListener("submit", submitProfileForm);

//сабмит формы добавления новой карточки с местом
function submitPlaceForm(evt) {
  evt.preventDefault();
  placeSubmitButton.textContent = "Создание...";
  addNewCard(placeInput.value, imageInput.value)
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

enableValidation(config);

export {
  popupProfile,
  popupModal,
  popupAvatar,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  popupPlace,
  popupImage,
};
