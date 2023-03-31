import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormHandler) {
      super(popupSelector);
      this._submitFormHandler = submitFormHandler;
      this._form = this._popupSelector.querySelector('.popup__form');
      this._inputList = this._popupSelector.querySelectorAll('.popup__input');
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
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitFormHandler(this._getInputValues());
        this.close();
      });
      super.setEventListeners();
    }
}