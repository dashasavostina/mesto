import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import "./index.css";

//кнопка редактирования
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonEditAvatar = document.querySelector('.profile__avatar-edit');
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

const apiJoin = new Api(apiData);
let userId;

//добавление карточки в секцию
const submitAddCardFormHandler = ({title, image}) => {
  popupWithFormAddCard.setSavingProcessText();
  apiJoin.addNewCard({name: title, link: image})
  .then((card) => {
    cardList.addItem(createCard(card));
    popupWithFormAddCard.close();
  })
  .catch((err) => {
    console.log(`При добавлении новой карточки возникла ошибка: ${err}`)
  })
  .finally(() => {
    popupWithFormAddCard.returnSavingProcessText();
  })
}

const submitEditProfileFormHandler = (userProfileData) => {
  popupProfile.setSavingProcessText();
  apiJoin.sendUserData(userProfileData)
  .then(res => {
    userInfo.setUserInfo({name: res.name, job: res.about});
    popupProfile.close();
  })
  .catch((err) => {
    console.log(`При редактировании профиля произошла ошибка: ${err}`)
  })
  .finally(() => {
    popupProfile.returnSavingProcessText()
  })
}

const submitEditAvatarFormHandler = (userProfileData) => {
  popupWithEditAvatar.setSavingProcessText();
  apiJoin.sendAvatarData(userProfileData)
  .then((res) => {
    userInfo.setUserAvatar(res.avatar);
    popupWithEditAvatar.close();
    })
    .catch(err => {
      console.log(`Ошибка обновления аватара: ${err}`)
   })
   .finally(() => {
     popupWithEditAvatar.returnSavingProcessText();
   })
  }

const callbackConfirmation = (cardElement, cardId) => {
  apiJoin.deleteCard(cardId)
  .then(() => {
    cardElement.deleteCard();
    popupConfirmation.close();
  })
  .catch((err) => {
    console.log(`Ошибка при удалении карточки: ${err}`)
  })
}


const popupProfile = new PopupWithForm(popupEditProfile, submitEditProfileFormHandler);
popupProfile.setEventListeners();
const popupWithImage = new PopupWithImage(popupViewImage);
popupWithImage.setEventListeners();
const popupWithFormAddCard = new PopupWithForm(popupAddCard, submitAddCardFormHandler);
popupWithFormAddCard.setEventListeners();
const userInfo = new UserInfo({
  titleSelector: profileTitle, 
  jobSelector: profileSubtitle, 
  avatarSelector: '.profile__avatar-img'});
const popupWithEditAvatar = new PopupWithForm(popupEditAvatar, submitEditAvatarFormHandler);
popupWithEditAvatar.setEventListeners();
const popupConfirmation = new PopupConfirmation(popupConfirmationSelector, callbackConfirmation);
popupConfirmation.setEventListeners();

const cardList = new Section({renderer: (item) => {
  const card = createCard(item);
  cardList.addItem(card)}
    }, '.elements');

Promise.all([ apiJoin.getUserData(), apiJoin.getInitialCards() ])
  .then(([ userProfileData, cardObject ]) => {
    userId = userProfileData._id;
    userInfo.setUserInfo({ name: userProfileData.name, job: userProfileData.about });
    userInfo.setUserAvatar(userProfileData.avatar);
    cardList.renderItems(cardObject.reverse());
  })
  .catch((err) => { console.log(`Возникла глобальная ошибка: ${err}`) })

//валидация
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
buttonEditAvatar.addEventListener('click', function () {
  popupWithEditAvatar.open();
  formValidators['avatar-edit-form'].resetValidation();
})

//функция создания новой карточки
const createCard = function (cardObject) {
  const card = new Card (
    cardObject, 
    '.elements-template',
    userId,
    {cardId: cardObject._id, ownerId: cardObject.owner._id, }, {
    handleCardClick: () => {
      popupWithImage.open(cardObject)},

    handleCardDelete: (cardElement, cardId) => {
      popupConfirmation.open(cardElement, cardId)},

    handleCardLike: (card) => {
      apiJoin.sendCardLike(card._cardId)
      .then((res) => {
        card.renderCardLike(res);
      })
      .catch((err) => {
        console.log(`При лайке карточки возникла ошибка: ${err}`)
      })
    },

    handleCardDeleteLike: (card) => {
      apiJoin.deleteCardLike(card._cardId)
       .then((res) => {
        card.renderCardLike(res);
       })
       .catch((err) => {
        console.log(`При дизлайке карточки возникла ошибка: ${err}`)
       })
    },
  }).generateCard();
  return card;
}