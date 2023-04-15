//кнопка редактирования
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonEditAvatar = document.querySelector('.profile__avatar-edit');
//формы попапов
const formElementAddCard = document.querySelector('.popup__form_add');

//профиль
const profileTitle = '.profile__title';
const profileSubtitle = '.profile__subtitle';
//кнопка добавления карточки
const buttonAdd = document.querySelector('.profile__add-button');
//попапы-модификаторы
const popupAddCard = '.popup_type_add';
const popupEditProfile = '.popup_type_edit';
const popupViewImage = '.popup_type_view';
const popupEditAvatar = '.popup_type_avatar-add';
const popupConfirmationSelector = '.popup_type_confirm';

const apiData = {
  link: 'https://mesto.nomoreparties.co/v1/cohort-63/',
  headers: {
    authorization: '63c1674b-e0d6-4861-a55c-25296a36a323',
    'Content-Type': 'application/json'
  }
}

const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export { buttonEdit, buttonEditAvatar, formElementAddCard, profileTitle, profileSubtitle, 
        buttonAdd, popupAddCard, popupEditProfile, popupViewImage, popupEditAvatar, popupConfirmationSelector,
        apiData, options }