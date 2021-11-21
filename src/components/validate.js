function showInputError(inputElement, formElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

const hideInputError = (inputElement, formElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (submitButton, inputList, config) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
};

const checkInputValidity = (inputElement, formElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, formElement, config);
  } else {
    hideInputError(inputElement, formElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  //find all inputs
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  //add listeners for each input
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, formElement, config);
      toggleButtonState(submitButton, inputList, config);
    });
  });
  toggleButtonState(submitButton, inputList, config);
};
//find all forms
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  //set eventlistener for each form
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};



export function disableValidation(inputList, config, formElement) {
  inputList.forEach((inputElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    hideInputError(inputElement, formElement, config);
    toggleButtonState(submitButton, inputList, config);
  });
}
