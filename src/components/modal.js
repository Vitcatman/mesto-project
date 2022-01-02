import {
  popupProfile,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  popupImage,
  popupAvatar,
} from "../components/index.js";

import {
  zoomImg
} from "../components/card.js";

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  openPopup() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeOnEsc);
  }

  closePopup() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeOnEsc);
  }

  _closeOnEsc(evt) {
    if (evt.key === "Escape") {
      closePopup(document.querySelector(".popup_opened"));
    }
  }
}

export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  openProfilePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    this.openPopup();
  }
}

export class PopupWithImage extends Popup {
 constructor(popupSelector) {
   super(popupSelector);
 }

 showImagePopup(cardLink, cardName) {
  zoomImg.src = cardLink;
  zoomImg.alt = cardName;
  this._popupSelector.querySelector(".popup__description").textContent = cardName;
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
