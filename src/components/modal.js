import {
  popupProfile,
  popupModal,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  popupPlace,
} from "../components/index.js";
export {
  openPopup,
  closePopup,
  openProfilePopup,
  createImagePopup,
  resetPlacePopup,
};

const popupImage = document.querySelector(".popup_type_image");

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc);
  popupModal.forEach((element) => {
    element.addEventListener("click", closeOnOverlay);
  });
};

function closePopup() {
  document.querySelector(".popup_opened").classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
  popupModal.forEach((element) => {
    element.removeEventListener("click", closeOnOverlay);
  });
}

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(), resetPlacePopup(popupPlace);
  }
}

const resetPlacePopup = function (popup) {
  popup.querySelector(".place-form").reset();
};

function openProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

//закрытие по клику вне модального окна
function closeOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
    resetPlacePopup(popupPlace);
  }
}

function createImagePopup(evt) {
  openPopup(popupImage);
  popupImage.querySelector(".popup__picture").src =
    evt.target.closest(".card__image").currentSrc;
  popupImage.querySelector(".popup__picture").alt =
    evt.target.closest(".card__image").alt;
  popupImage.querySelector(".popup__description").textContent =
    evt.target.closest(".card__image").alt;
}
