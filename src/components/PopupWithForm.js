import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormHandler) {
      super(popupSelector);
      this._submitFormHandler = submitFormHandler;
      this._form = this._popupElement.querySelector('.popup__form');
      this._inputList = this._popupElement.querySelectorAll('.popup__input');
      this._submitButton = this._popupElement.querySelector('.popup__submit');
      this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }

    setInputValues(data) {
        this._inputList.forEach(input => {
            input.value = data[input.name]
        })
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
      super.setEventListeners();
    
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const initialText = this._submitButton.textContent;
        this._submitButton.textContent = 'Сохранение...';
        this._submitFormHandler(this._getInputValues())
          .then(() => this.close())
          .finally(() => {
            this._submitButton.textContent = initialText;
          }) 
      });
    }
}