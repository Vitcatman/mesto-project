import {
  popupProfile,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  popupImage,
  popupAvatar,
} from "../components/index.js";

class Popup {
  constructor(popup) {
    this._popup = popup
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeOnEsc);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeOnEsc);
  }

  closeOnEsc(evt) {
    if (evt.key === "Escape") {
      closePopup(document.querySelector(".popup_opened"));
    }
  }
}

export default class PopupWithForm extends Popup {
  constructor(popup) {
    super(popup);
  }
  openProfilePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    this.openPopup();
  }
}



//открытие попапа
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc);
};

//закрытие попапа
const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
};

//закрытие попапа по Esc
function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

//Сброс формы
const resetPlacePopup = function (popup) {
  popup.querySelector(".place-form").reset();
};

function openProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

export { openPopup, closePopup, openProfilePopup, resetPlacePopup };
