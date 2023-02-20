const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

const hasInvalidInput = function (inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(options.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(options.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }; 

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
  };

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
  }; 

const setEventListeners = function (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(`${options.inputSelector}`));
    const buttonElement = formElement.querySelector(`${options.submitButtonSelector}`);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 

const enableValidation = function (formElementsList) {
    const formList = Array.from(document.querySelectorAll(`${formElementsList.formSelector}`));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };


const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

enableValidation(options); 
