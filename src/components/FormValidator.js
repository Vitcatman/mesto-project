export default class FormValidator {
  constructor (config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

_showInputError(inputElement) {
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(this._config.inputErrorClass);
}

_hideInputError(inputElement) {
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._config.inputErrorClass);
  errorElement.textContent = "";
}

_hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

_toggleButtonState = (submitButton, inputList) => {
  if (this._hasInvalidInput(inputList)) {
    submitButton.classList.add(this._config.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(this._config.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

_checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement);
  } else {
    this._hideInputError(inputElement);
  }
};

_setEventListeners = () => {
  this._formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  const inputList = Array.from(
    this._formElement.querySelectorAll(this._config.inputSelector)
  );
  const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(submitButton, inputList);
    });
  });
  this._toggleButtonState(submitButton, inputList);

}

enableValidation() {
  this._setEventListeners();
}
  _resetValidation() {

    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState(submitButton, inputList);
    });
    this._toggleButtonState(submitButton, inputList);
  }

disablesValidation() {
  this._resetValidation()
}

}
