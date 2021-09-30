const popupProfile = document.querySelector(".popup_type_profile");
const popupPlace = document.querySelector(".popup_type_place-add");
const popupImage = document.querySelector(".popup_type_image");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonPlaceAdd = document.querySelector(".profile__add-button");
const buttonPlaceClose = document.querySelector(".popup__close-button_type_place");
const buttonProfileClose = document.querySelector(".popup__close-button_type_profile");
const buttonImageClose = document.querySelector(".popup__close-button_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const nameInput = popupProfile.querySelector(".edit-form__item_element_name");
const jobInput = popupProfile.querySelector(".edit-form__item_element_about");

const popupOpen = function (popup) {
  popup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

const popupClose = function (popup) {
  popup.classList.remove("popup_opened");
};

const placePopupReset = function (popup) {
  popup.querySelector(".place-form").reset();
};

buttonProfileEdit.addEventListener("click", function () {
  popupOpen(popupProfile);
});

buttonProfileClose.addEventListener("click", function () {
  popupClose(popupProfile);
});

buttonImageClose.addEventListener("click", function () {
  popupClose(popupImage);
});

buttonPlaceAdd.addEventListener("click", function () {
  popupOpen(popupPlace);
});

buttonPlaceClose.addEventListener("click", function () {
  popupClose(popupPlace), placePopupReset(popupPlace);
});

const formProfileElement = popupProfile.querySelector(".edit-form");

function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupClose(popupProfile);
}
formProfileElement.addEventListener("submit", submitProfileForm);

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

const cardsList = document.querySelector(".cards");

function createImagePopup(evt) {
  popupOpen(popupImage);
  popupImage.querySelector(".popup__picture").src =
  evt.target.closest(".card__image").currentSrc;
  popupImage.querySelector(".popup__picture").alt =
  evt.target.closest(".card__image").alt;
  popupImage.querySelector(".popup__description").textContent =
  evt.target.closest(".card__image").alt;
};

function createCard(cardData) {
  const cardTemplate = document.querySelector(".card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__like-button").addEventListener("click", likeCard);
  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
  cardImage.addEventListener("click", createImagePopup);
  return cardElement;
}

function addCard() {
  initialCards.forEach((element) => {
    const card = createCard(element);
    cardsList.append(card);
  });
}
addCard(initialCards);

const formPlaceElement = popupPlace.querySelector(".place-form");
const placeInput = popupPlace.querySelector(".place-form__item_el_name");
const imageInput = popupPlace.querySelector(".place-form__item_el_link");

function submitPlaceForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeInput.value,
    link: imageInput.value,
  };
  const card = createCard(newCard);
  cardsList.prepend(card);
  popupClose(popupPlace);
  placePopupReset(popupPlace);
}

formPlaceElement.addEventListener("submit", submitPlaceForm);
