import Popup from '../components/Popup.js';
import {zoomImg} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
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

