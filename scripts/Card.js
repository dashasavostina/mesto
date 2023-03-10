//класс создания карточки
export default class Card {
    constructor(data, templateSelector, handleOpenPopup) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleOpenPopup = handleOpenPopup;
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector) 
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._cardImg = this._element.querySelector('.card__photo');
      this._cardImg.src = this._link;
      this._cardImg.alt = this._title;
      this._element.querySelector('.card__title').textContent = this._name;
      this._setEventListeners();
  
      return this._element;
    }

    _setEventListeners() {
      this._like = this._element.querySelector('.card__heart');
      this._like.addEventListener('click', () => {
        this._handleLikeButton();
      });

      this._element.querySelector('.card__trash')
      .addEventListener('click', () => {
        this._element.remove();
      });

      this._cardImg.addEventListener('click', () => {
        this._handleOpenPopup(this._name, this._link);
      });
    }

    _handleLikeButton() {
      this._like.classList.toggle('card__heart_active')};
  }