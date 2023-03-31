export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputSelector = config.inputSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._submitButton = this._formElement.querySelector(config.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }; 

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
     this._showInputError(inputElement, inputElement.validationMessage);
    } else {
       this._hideInputError(inputElement);
    }
};

_checkInvalidInput() {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

_setEventListeners() {
  this._toggleButtonState();
  this._inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._toggleButtonState();
    });
  });
};

_toggleButtonState() {
  if (this._checkInvalidInput()) {
    this.disableSubmitButton();
  } else {
    this._enableSubmitButton();
  }
}; 

disableSubmitButton() {
  this._submitButton.setAttribute('disabled', 'true');
  this._submitButton.classList.add(this._inactiveButtonClass);
}

_enableSubmitButton() {
  this._submitButton.classList.remove(this._inactiveButtonClass);
  this._submitButton.removeAttribute('disabled');
}

resetValidation() {
  this._toggleButtonState();
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });
}

enableValidation() {
  this._setEventListeners();
};
}
