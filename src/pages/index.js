import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { initialCards } from "../components/cards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

//кнопка редактирования
const buttonEdit = document.querySelector('.profile__edit-button');
//формы попапов
const formElementAddCard = document.querySelector('.popup__form_add');

//профиль
const profileTitle = '.profile__title';
const profileSubtitle = '.profile__subtitle';
//кнопка добавления карточки
export const buttonAdd = document.querySelector('.profile__add-button');
//попапы-модификаторы
const popupAddCard = '.popup_type_add';
const popupEditProfile = '.popup_type_edit';
const popupViewImage = '.popup_type_view';

const cardsContainer = document.querySelector('.elements');

const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//добавление карточки в секцию
const submitAddCardFormHandler = ({title, image}) => {
  cardList.addItem(createCard({name: title, link: image}));
}

const submitEditProfileFormHandler = ({name, job}) => {
  userInfo.setUserInfo({name, job})
}

const popupProfile = new PopupWithForm(popupEditProfile, submitEditProfileFormHandler);
popupProfile.setEventListeners();
const popupWithImage = new PopupWithImage(popupViewImage);
popupWithImage.setEventListeners();
const popupWithFormAddCard = new PopupWithForm(popupAddCard, submitAddCardFormHandler);
popupWithFormAddCard.setEventListeners();
const userInfo = new UserInfo({titleSelector: profileTitle, jobSelector: profileSubtitle});

//функция открытия попапа картинки
const handleCardClick = (data) => {
  popupWithImage.open(data);
};

const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = createCard(item);
  cardList.addItem(card)}
    }, '.elements');
cardList.renderItems();

const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(options);

//слушатели
buttonEdit.addEventListener('click', function() {
  formValidators['edit-form'].resetValidation();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open()});
buttonAdd.addEventListener('click', function () {
  formElementAddCard.reset();
  formValidators['add-form'].resetValidation();
  popupWithFormAddCard.open()});

//функция вставки карточки в контейнер
function renderCard(card) {
  cardsContainer.prepend(card);
}

//функция создания новой карточки
function createCard(item) {
  const card = new Card (item, '.elements-template', handleCardClick).generateCard();
  renderCard(card);
  return card;
}