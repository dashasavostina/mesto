//класс создания карточки
export default class Card {
    constructor(cardObject, templateSelector, userId, ownerData, handleActions) {
      this._card = cardObject;
      this._name = this._card.name;
      this._link = this._card.link;
      this._templateSelector = templateSelector;
      
      this._userId = userId; //id пользователя
      this._cardId = ownerData.cardId; //id карточки
      this._ownerId = ownerData.ownerId; //id владельца карточки
      this._handleCardClick = handleActions.handleCardClick;
      this._handleCardDelete = handleActions.handleCardDelete;
      this._handleCardLike = handleActions.handleCardLike;
      this._handleCardDeleteLike = handleActions.handleCardDeleteLike;
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector) 
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
    }

    renderCardLike(card) {
      this._cardLikes = card.likes;
      if (this._cardLikes.length === 0) {
        this.likeSelector.textContent = '0';
      } else {
        this.likeSelector.textContent = this._cardLikes.length;
      }
      if (this._checkLikeCard()) {
        this._like.classList.add('card__heart_active');
      } else {
        this._like.classList.remove('card__heart_active');
      }
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._cardImg = this._element.querySelector('.card__photo');
      this._like = this._element.querySelector('.card__heart');
      this.likeSelector = this._element.querySelector('.card__heart-counter');
      this._trash = this._element.querySelector('.card__trash');
      this._cardImg.src = this._link;
      this._cardImg.alt = this._title;
      this._element.querySelector('.card__title').textContent = this._name;
      this.renderCardLike(this._card);
      this._setEventListeners();
  
      return this._element;
    }

    deleteCard() {
      this._element.remove();
      this._element = null;
    }

    _checkLikeCard() {
      return this._cardLikes.find((userLike) => userLike._id === this._userId);
    }

    _setEventListeners() {
      this._like.addEventListener('click', () => {
        this._handleLikeButton();
      });

      this._cardImg.addEventListener('click', () => {
        this._handleCardClick({name: this._name, link: this._link});
      });

      if (this._userId === this._ownerId) {
        this._trash.addEventListener('click', () => {
          this._handleCardDelete(this, this._cardId);
        })
      } else {
        this._trash.remove()
      }
    }

    _handleLikeButton() {
      if (this._checkLikeCard()) {
        this._handleCardDeleteLike(this)
      } else {
        this._handleCardLike(this)
      }
    };
  }

  