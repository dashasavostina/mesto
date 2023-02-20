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

const toggleButtonState = (object, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(object.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(object.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }; 

const showInputError = (object, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(object.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(object.errorClass);
  };

const hideInputError = (object, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.classList.remove(object.errorClass);
    errorElement.textContent = '';
  }; 

const setEventListeners = function (object, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(`${object.inputSelector}`));
    const buttonElement = formElement.querySelector(`${object.submitButtonSelector}`);
    toggleButtonState(object, inputList, buttonElement);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        isValid(object, formElement, inputElement);
        toggleButtonState(object, inputList, buttonElement);
      });
    });
  }; 

const enableValidation = function (object) {
    const formList = Array.from(document.querySelectorAll(object.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(object, formElement);
    });
  };


const isValid = (object, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(object, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(object, formElement, inputElement);
    }
};

enableValidation(options); 
