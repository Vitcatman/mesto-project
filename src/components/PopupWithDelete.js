import { popupCardDeleteButton } from "../utils/constants.js";
import Popup from "../components/Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    popupCardDeleteButton.addEventListener("click", this._submitHandler);
  }
}
