export default class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.config.inputErrorClass);
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

_setEventListeners() {
  const inputList = Array.from(this._formElement.querySelectorAll(this.config.inputSelector));
  const buttonElement = this._formElement.querySelector(this.config.submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
};

_toggleButtonState(inputList) {
  const formIsValid = inputList.every(item => item.validity.valid);
  const buttonElement = this._formElement.querySelector(this.config.submitButtonSelector);
  if (formIsValid) {
    buttonElement.classList.remove(this.config.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(this.config.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}; 

enableValidation() {
  this._setEventListeners();
};
}
