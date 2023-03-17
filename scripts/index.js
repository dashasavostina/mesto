import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { initialCards } from "./cards.js";

//кнопка редактирования
const buttonEdit = document.querySelector('.profile__edit-button');
//формы попапов
const formElementEditProfile = document.querySelector('.popup__form_profile');
const formElementAddCard = document.querySelector('.popup__form_add');
//поля ввода форм
const nameInput = formElementEditProfile.querySelector('.popup__input_type_name');
const jobInput = formElementEditProfile.querySelector('.popup__input_type_job');
const titleInput = formElementAddCard.querySelector('.popup__input_type_title');
const imageInput = formElementAddCard.querySelector('.popup__input_type_image');
//профиль
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//кнопка добавления карточки
const buttonAdd = document.querySelector('.profile__add-button');
//попапы-модификаторы
const popupAddCard = document.querySelector('.popup_type_add');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupViewImage = document.querySelector('.popup_type_view');

const cardsContainer = document.querySelector('.elements');

const cardPhoto = popupViewImage.querySelector('.popup__img');
const cardTitle = popupViewImage.querySelector('.popup__text');

const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

//функция открытия попапов
function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

//функция закрытия попапов
const closePopup = function(popup)  {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//слушатели
buttonEdit.addEventListener('click', function() {
  formValidators['edit-form'].resetValidation();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  showPopup(popupEditProfile)});
buttonAdd.addEventListener('click', function () {
  formElementAddCard.reset();
  formValidators['add-form'].resetValidation();
  showPopup(popupAddCard)});
formElementEditProfile.addEventListener('submit', handleFormSubmitEdit);

//функция закрытия попапа по кнопке Esc
const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//закрытие попапа по крестику и оверлей
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})


//функция вставки карточки в контейнер
function renderCard(card) {
  cardsContainer.prepend(card);
}

//функция создания новой карточки
function createCard(item) {
  const card = new Card (item, '.elements-template', handleOpenPopup).generateCard();
  renderCard(card);
return card;
}


//функция добавления новой карточки
formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objInput = {name: titleInput.value, link: imageInput.value};
  createCard(objInput);
  closePopup(popupAddCard);
  formElementAddCard.reset();
})

//функция редактирования профиля
function handleFormSubmitEdit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

  //функция открытия попапа картинки
  function handleOpenPopup(name, link) {
    cardPhoto.src = link;
    cardPhoto.alt = name;
    cardTitle.textContent = name;
    showPopup(popupViewImage);
  };

    //рендер карточек
    function renderInitialCards() {
      initialCards.forEach((item) => {
        const cardElement = createCard(item);
        cardsContainer.prepend(cardElement);
      });
    }

    renderInitialCards();
    