// const config = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__submit-button",
//   inactiveButtonClass: "popup__save-button_disabled",
//   inputErrorClass: "popup__input_error",
//   errorClass: "popup__form-error",
// };

export default class FormValidator {
  constructor (config, formElement) {
    this._config = config;
    this._formElement = formElement
  }

  _setEventListeners(submitButton, inputList) {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(submitButton, inputList);
      });
    });
    this._toggleButtonState(submitButton, inputList);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState(submitButton, inputList) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._config.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._config.inactiveButtonClass);
      submitButton.disabled = false;
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    });
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
  };

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  enableValidation() {
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._setEventListeners(this._submitButton, this._inputList);
  };
}


// function showInputError(inputElement, formElement, config) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   errorElement.textContent = inputElement.validationMessage;
//   inputElement.classList.add(config.inputErrorClass);
// }

// const hideInputError = (inputElement, formElement, config) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.textContent = "";
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const toggleButtonState = (submitButton, inputList, config) => {
//   if (hasInvalidInput(inputList)) {
//     submitButton.classList.add(config.inactiveButtonClass);
//     submitButton.disabled = true;
//   } else {
//     submitButton.classList.remove(config.inactiveButtonClass);
//     submitButton.disabled = false;
//   }
// };

// const checkInputValidity = (inputElement, formElement, config) => {
//   if (!inputElement.validity.valid) {
//     showInputError(inputElement, formElement, config);
//   } else {
//     hideInputError(inputElement, formElement, config);
//   }
// };

// const setEventListeners = (formElement, config) => {
//   formElement.addEventListener("submit", (evt) => {
//     evt.preventDefault();
//   });

//   //find all inputs
//   const inputList = Array.from(
//     formElement.querySelectorAll(config.inputSelector)
//   );
//   const submitButton = formElement.querySelector(config.submitButtonSelector);

//   //add listeners for each input
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(inputElement, formElement, config);
//       toggleButtonState(submitButton, inputList, config);
//     });
//   });
//   toggleButtonState(submitButton, inputList, config);
// };
// //find all forms
// export const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   //set eventlistener for each form
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, config);
//   });
// };

// export function disableValidation(config, formElement) {
//   const inputList = Array.from(
//     formElement.querySelectorAll(config.inputSelector)
//   );
//   const submitButton = formElement.querySelector(config.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//     hideInputError(inputElement, formElement, config);
//     toggleButtonState(submitButton, inputList, config);
//   });
// }
