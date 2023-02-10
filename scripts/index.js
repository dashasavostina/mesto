//кнопка редактирования
const editButton = document.querySelector('.profile__edit-button');
//попап
const popup = document.querySelector('.popup');
//кнопка закрытия попапов
const closeButton = document.querySelectorAll('.popup__close');
//формы попапов
const formElementProfile = document.querySelector('.popup__form_profile');
const formElementAdd = document.querySelector('.popup__form_add');
//поля ввода форм
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_job');
const titleInput = formElementAdd.querySelector('.popup__input_type_title');
const imageInput = formElementAdd.querySelector('.popup__input_type_image');
//профиль
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//кнопка добавления карточки
const addButton = document.querySelector('.profile__add-button');
//кнопка сохранения карточки
const submitButtonCard = document.querySelector('.popup__submit_add');
//попапы-модификаторы
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupView = document.querySelector('.popup_type_view');
//массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const template = document.querySelector('.elements-template').content.querySelector('.elements__rectangle');
const elements = document.querySelector('.elements');
const addButtonCard = document.querySelector('.popup_type_add');

//функция открытия попапов
function showPopup(popup) {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
//функция закрытия попапов
const closePopup = function(popup)  {
  popup.classList.remove('popup_opened');
}

//слушатели
editButton.addEventListener('click', function() {showPopup(popupEdit)});
addButton.addEventListener('click', function () {showPopup(popupAdd)});
formElementProfile.addEventListener('submit', handleFormSubmitEdit);

//функция закрытия по крестику
const close = (evt) => {
  closePopup(evt.target.closest('.popup'));
  titleInput.value = "";
  imageInput.value = "";
};
const exit = Array.from(closeButton).forEach(
  (element) => {
    element.addEventListener('click', close);
  }
);

//функция добавления новой карточки
submitButtonCard.addEventListener('click', (evt) => {
  evt.preventDefault();
  const title = titleInput.value;
  const link = imageInput.value;
  const card = createCard({name: title, link: link});
  elements.prepend(card);
  popupAdd.classList.remove('popup_opened');
  titleInput.value = "";
  imageInput.value = "";
})

//функция редактирования профиля
function handleFormSubmitEdit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

//функция лайка
const like = function(evt) {
  evt.target.classList.toggle('elements__heart_active')}

//рендер карточек
function renderCards() {
  initialCards.forEach(function (item){
    const card = template.cloneNode(true);
    const imgCard = card.querySelector('.elements__photo');
    card.querySelector('.elements__title').textContent = item.name;
    imgCard.src = item.link;
    imgCard.alt = item.name;
    elements.prepend(card);
    const imgView = popupView.querySelector('.popup__img');
    const titleView = popupView.querySelector('.elements__title_type_view');
    const imgAlt = popupView.querySelector('.popup__img');
    imgCard.addEventListener('click', function() {
      showPopup(popupView);
      imgView.src = item.link;
      titleView.textContent = item.name;
      imgAlt.alt = item.name;
    })
  card
    .querySelector('.elements__heart')
    .addEventListener('click', like);
  card
    .querySelector('.elements__trash')
    .addEventListener('click', () => {
      card.remove();
    }) ;
    return card;
  }) 
  }

renderCards(initialCards);
  
//функция создания карточки
function createCard(item) {
  const card = template.cloneNode(true);
  card.querySelector('.elements__title').textContent = item.name;
  const cardImg = card.querySelector('.elements__photo');
  cardImg.src = item.link;
  cardImg.alt = item.name;
  const imgView = popupView.querySelector('.popup__img');
    const titleView = popupView.querySelector('.elements__title_type_view');
    const imgAlt = popupView.querySelector('.popup__img');
  cardImg.addEventListener('click', function() {
    showPopup(popupView);
    imgView.src = item.link;
    titleView.textContent = item.name;
    imgAlt.alt = item.name;
  })

  card
    .querySelector('.elements__heart')
    .addEventListener('click', like);

  card
    .querySelector('.elements__trash')
    .addEventListener('click', () => {
      card.remove();
    }) ;
    return card;
  }