import Popup from "../components/Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, popupCardDeleteButton, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupCardDeleteButton = popupCardDeleteButton
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupCardDeleteButton.addEventListener("click", this._submitHandler);
  }
}
