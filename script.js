const popupProfile = document.getElementById("popup-profile");
const popupPlace = document.getElementById("popup-place");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonPlaceAdd = document.querySelector(".profile__add-button");
const buttonPlaceClose = document.getElementById("place-close");
const buttonProfileClose = document.getElementById("profile-close");

const popupOpen = function (popup) {
  popup.classList.add("popup_opened");
};

const popupClose = function (popup) {
  popup.classList.remove("popup_opened");
};

const profilePopupReset = function (popup) {
  popup.querySelector(".edit-form").reset();
};

const placePopupReset = function (popup) {
  popup.querySelector(".place-form").reset();
};

buttonProfileEdit.addEventListener("click", function () {
  popupOpen(popupProfile);
});
buttonPlaceAdd.addEventListener("click", function () {
  popupOpen(popupPlace);
});
buttonProfileClose.addEventListener("click", function () {
  popupClose(popupProfile), profilePopupReset(popupProfile);
});
buttonPlaceClose.addEventListener("click", function () {
  popupClose(popupPlace), placePopupReset(popupPlace);
});

const formProfileElement = popupProfile.querySelector(".edit-form");
const nameInput = popupProfile.querySelector("#profile-name");
const jobInput = popupProfile.querySelector("#profile-about");
function submitProfileForm(evt) {
  evt.preventDefault();
  const profileTitle = document.querySelector(".profile__title");
  const profileSubtitle = document.querySelector(".profile__subtitle");
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}
formProfileElement.addEventListener("submit", submitProfileForm);
formProfileElement.addEventListener("submit", function () {
  popupClose(popupProfile), profilePopupReset(popupProfile);
});

const cardsList = document.querySelector(".cards");
const cardTemplate = document.querySelector(".card-template").content;

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

const imagePopupTemplate = document.querySelector(".imgpopup-template").content;
const popupImage = document.querySelector(".image-popup");

function createImagePopup(evt) {
  const popupElement = imagePopupTemplate.cloneNode(true);
  popupElement.querySelector(".image-popup__picture").src =
    evt.target.closest(".card__image").currentSrc;
  popupElement.querySelector(".image-popup__picture").alt =
    evt.target.closest(".card__image").alt;
  popupElement.querySelector(".image-popup__heading").textContent =
    evt.target.closest(".card__image").alt;
  popupImage.append(popupElement);
  popupImage.classList.add("image-popup_opened");
  const popupImgClose = document.querySelector(".image-popup__close-button");
  popupImgClose.addEventListener("click", function () {
    popupImage.classList.remove("image-popup_opened"),
      (popupImage.innerHTML = "");
  });
}

const initialCards = [
  {
    name: "Архыз",
    link: "./images/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "./images/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "./images/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "./images/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "./images/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "./images/baikal.jpg",
  },
];

initialCards.forEach(function (element) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__image").alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", createImagePopup);
  cardsList.append(cardElement);
});

const formPlaceElement = popupPlace.querySelector(".place-form");
const placeInput = popupPlace.querySelector("#place-name");
const imgInput = popupPlace.querySelector("#place-link");
function submitPlaceForm(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__image").src = imgInput.value;
  cardElement.querySelector(".card__image").alt = placeInput.value;
  cardElement.querySelector(".card__title").textContent = placeInput.value;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", createImagePopup);
  cardsList.prepend(cardElement);
}
formPlaceElement.addEventListener("submit", submitPlaceForm);
formPlaceElement.addEventListener("submit", function () {
  popupClose(popupPlace), placePopupReset(popupPlace);
});
