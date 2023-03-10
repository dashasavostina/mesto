import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { initialCards } from "./cards.js";

//кнопка редактирования
const buttonEdit = document.querySelector('.profile__edit-button');
//кнопка закрытия попапов
const buttonCloseList = document.querySelectorAll('.popup__close');
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
//кнопка сохранения карточки
const submitButtonCard = document.querySelector('.popup__submit_add');
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

const formList = Array.from(document.querySelectorAll(options.formSelector));
formList.forEach(formSelector => {
  const validator = new FormValidator(options, formSelector);
  validator.enableValidation();
})

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
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  showPopup(popupEditProfile)});
buttonAdd.addEventListener('click', function () {
  titleInput.value = "";
  imageInput.value = "";
  showPopup(popupAddCard)});
formElementEditProfile.addEventListener('submit', handleFormSubmitEdit);

//функция закрытия по крестику
const handleClickByCloseButton = (evt) => {
  closePopup(evt.target.closest('.popup'));
};
Array.from(buttonCloseList).forEach(
  (element) => {
    element.addEventListener('click', handleClickByCloseButton);
  }
);

//функция закрытия попапа по оверлей 
document.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened') ) {
    evt.preventDefault();
    closePopup(evt.target.closest('.popup'))
  }
});

//функция закрытия попапа по кнопке Esc
const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//функция вставки карточки в контейнер
function renderCard(card) {
  cardsContainer.prepend(card);
}

//функция добавления новой карточки
formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objInput = {name: titleInput.value, link: imageInput.value};
  const card = new Card (objInput, '.elements-template', handleOpenPopup).generateCard();
  renderCard(card);
  closePopup(popupAddCard);
  formElementAddCard.reset();
  submitButtonCard.classList.add('popup__submit_disabled');
  submitButtonCard.disabled = true;
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
        const card = new Card(item, '.elements-template', handleOpenPopup);
        const cardElement = card.generateCard();
        cardsContainer.prepend(cardElement);
      });
    }

    renderInitialCards();
    