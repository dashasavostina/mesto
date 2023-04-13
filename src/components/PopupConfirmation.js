import Popup from "./Popup";
export default class PopupConfirmation extends Popup {
    constructor(popupSelector, callbackConfirmation) {
      super(popupSelector);
      this._submitButton = this._popupElement.querySelector('.popup__form');
      this._callbackConfirmation = callbackConfirmation;
    }

    open(cardObject, cardId) {
      this._cardObject = cardObject;
      this._cardId = cardId;
      super.open();
    }


    setEventListeners() {
        this._submitButton.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackConfirmation(this._cardObject, this._cardId);
            
        })
        super.setEventListeners();
    }
}