export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeOnEsc = this._closeOnEsc.bind(this);
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
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.closePopup();
      }
      if (evt.target.classList.contains("popup__close-button")) {
        this.closePopup();
      }
    });
  }
}
