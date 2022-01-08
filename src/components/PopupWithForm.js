import Popup from "../components/Popup.js";
import {
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }
  openProfilePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    this.openPopup();
  }

  resetPlacePopup() {
    this._popupSelector.querySelector(".place-form").reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(evt);
    });
  }
}
