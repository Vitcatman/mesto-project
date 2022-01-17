import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    // определяем форму
    this._form = this._popup.querySelector(".popup__form");
    // достаём все элементы полей
    this._inputList = this._form.querySelectorAll(".popup__input");
    this.submitButton = this._popup.querySelector(".popup__submit-button");
  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  renderLoading(isLoading, buttonText = "Сохранить") {
    if (isLoading === true) {
      this.submitButton.textContent = "Сохраняем...";
    } else {
      this.submitButton.textContent = buttonText;
    }
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }
}
