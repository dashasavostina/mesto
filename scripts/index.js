//кнопка редактирования
const buttonEdit = document.querySelector('.profile__edit-button');
//кнопка закрытия попапов
const buttonClose = document.querySelectorAll('.popup__close');
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
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupView = document.querySelector('.popup_type_view');

const templateCards = document.querySelector('.elements-template').content.querySelector('.elements__rectangle');
const cardsContainer = document.querySelector('.elements');
const addButtonCard = document.querySelector('.popup_type_add');

//функция открытия попапов
function showPopup(popup) {
  popup.classList.add('popup_opened');
}

//функция закрытия попапов
const closePopup = function(popup)  {
  popup.classList.remove('popup_opened');
}

//слушатели
buttonEdit.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  showPopup(popupEdit)});
buttonAdd.addEventListener('click', function () {
  titleInput.value = "";
  imageInput.value = "";
  showPopup(popupAdd)});
formElementEditProfile.addEventListener('submit', handleFormSubmitEdit);

//функция закрытия по крестику
const handleClickByCloseButton = (evt) => {
  closePopup(evt.target.closest('.popup'));
  titleInput.value = "";
  imageInput.value = "";
};
const renderButtonClose = Array.from(buttonClose).forEach(
  (element) => {
    element.addEventListener('click', handleClickByCloseButton);
  }
);

//функция добавления новой карточки
formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const title = titleInput.value;
  const link = imageInput.value;
  const card = createCard({name: title, link: link});
  cardsContainer.prepend(card);
  closePopup(popupAdd);
})

//функция редактирования профиля
function handleFormSubmitEdit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

//функция лайка
const handleLikeButton = function(evt) {
  evt.target.classList.toggle('elements__heart_active')}

//рендер карточек
function renderCards() {
  const cards = initialCards.map((card) => {
    return createCard(card);
  })
  cardsContainer.prepend(...cards);
}

renderCards(initialCards);
  
//функция создания карточки
function createCard(cardData) {
  const card = templateCards.cloneNode(true);
  card.querySelector('.elements__title').textContent = cardData.name;
  const cardImg = card.querySelector('.elements__photo');
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  const imgView = popupView.querySelector('.popup__img');
    const titleView = popupView.querySelector('.popup__text');
    const imgAlt = popupView.querySelector('.popup__img');
  cardImg.addEventListener('click', function() {
    showPopup(popupView);
    imgView.src = cardData.link;
    titleView.textContent = cardData.name;
    imgAlt.alt = cardData.name;
  })

  card
    .querySelector('.elements__heart')
    .addEventListener('click', handleLikeButton);

  card
    .querySelector('.elements__trash')
    .addEventListener('click', () => {
      card.remove();
    }) ;
    return card;
  }