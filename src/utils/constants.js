export const popupProfile = document.querySelector(".popup_type_profile");
export const popupPlace = document.querySelector(".popup_type_place-add");
export const popupImage = document.querySelector(".popup_type_image");
export const popupAvatar = document.querySelector(".popup_type_avatar-add");
export const popupDelete = document.querySelector(".popup_type_delete-card");
export const buttonProfileEdit = document.querySelector(
  ".profile__edit-button"
);
export const buttonAvatarEdit = document.querySelector(".profile__avatar-edit");
export const buttonPlaceAdd = document.querySelector(".profile__add-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__avatar");
export const profileSubmitButton = document.querySelector(".edit-form__button");
export const placeSubmitButton = document.querySelector(".place-form__button");
export const avatarSubmitButton = document.querySelector(
  ".avatar-form__button"
);
export const formProfileElement = popupProfile.querySelector(".edit-form");
export const formAvatarElement = popupAvatar.querySelector(".avatar-form");
export const popupModals = document.querySelectorAll(".popup");
export const nameInput = popupProfile.querySelector(
  ".edit-form__item_element_name"
);
export const jobInput = popupProfile.querySelector(
  ".edit-form__item_element_about"
);
export const formPlaceElement = popupPlace.querySelector(".place-form");
export const cardTemplate = document.querySelector(".card-template");


export const cardsList = document.querySelector(".cards");
export const zoomImg = document.querySelector(".popup__picture");
export const popupCardDeleteButton = document.querySelector(
  ".popup__delete-button"
);

export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-4",
  headers: {
    authorization: "61de9a72-5985-428d-ba82-f3cc85d60f49",
    "Content-Type": "application/json",
  },
};
export const popupConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__form-error",
};
