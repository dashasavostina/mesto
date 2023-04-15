import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import "./index.css";
import { buttonEdit, buttonEditAvatar, formElementAddCard, profileTitle, profileSubtitle, 
        buttonAdd, popupAddCard, popupEditProfile, popupViewImage, popupEditAvatar, popupConfirmationSelector,
        apiData, options 
      } from "../utils/constants.js"

//объявление апи
const apiJoin = new Api(apiData);
let userId;

//добавление карточки в секцию
const submitAddCardFormHandler = ({title, image}) => {
  return apiJoin.addNewCard({name: title, link: image})
  .then((card) => {
    cardList.addItem(createCard(card));
  })
  .catch((err) => {
    console.log(`При добавлении новой карточки возникла ошибка: ${err}`)
  })
}

//функция обработчика сабмита профиля
const submitEditProfileFormHandler = (userProfileData) => {
  return apiJoin.sendUserData(userProfileData)
  .then(res => {
    userInfo.setUserInfo({name: res.name, job: res.about});
  })
  .catch((err) => {
    console.log(`При редактировании профиля произошла ошибка: ${err}`)
  })
}

//функция обработчика сабмита аватара
const submitEditAvatarFormHandler = (userProfileData) => {
  return apiJoin.sendAvatarData(userProfileData)
  .then((res) => {
    userInfo.setUserAvatar(res.avatar);
    })
    .catch(err => {
      console.log(`Ошибка обновления аватара: ${err}`)
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

//объявление попапов
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

//функция отрисовки карточки в секцию
const cardList = new Section({renderer: (item) => {
  const card = createCard(item);
  cardList.addItem(card)}
    }, '.elements');

//промисы получения данных с сервера
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