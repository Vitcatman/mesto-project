import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, zoomImg) {
    super(popupSelector);
    this._zoomImg = zoomImg;
  }

  openPopup(cardLink, cardName) {
    this._zoomImg.src = cardLink;
    this._zoomImg.alt = cardName;
    this._popup.querySelector(".popup__description").textContent =
      cardName;
    super.openPopup();
  }
}
