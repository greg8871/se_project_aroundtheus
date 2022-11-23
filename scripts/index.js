import Card from './Card.js';
import FormValidator from './FormValidator.js'
import { openPopup, closePopup } from './Utils.js';


const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
const config = {
  
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
}
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileTitleEl = document.querySelector(".profile__name-title");
const profileDescriptionEl = document.querySelector(".profile__description");
const previewPopup = document.querySelector("#preview__popup");
const cardAddPopup = document.querySelector("#add-popup");
const cardAddButton = document.querySelector("#add-button");
const cardAddCloseBtn = cardAddPopup.querySelector(".popup__close");
const popupImage = previewPopup.querySelector(".popup__image");
const previewPopupCaption = previewPopup.querySelector(
  ".popup__preview-caption"
);
const cardForm = document.querySelector("#add-card-form");
const addCardFormTitle = cardForm.querySelector('#owner-title')
const addCardFormLink = cardForm.querySelector('#owner-url')
const cardListEl = document.querySelector(".locations__cards");
const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);

const profieFormValidator = new FormValidator(
    config,
    profileEditForm
    );
  const cardFormValidator = new FormValidator(config, cardForm);

const cardSelector  = '#card-template';

function renderCard(cardData, container) {
  const card = new Card(cardData,cardSelector, handlePreveiwImage);
  container.prepend(card.getView());
}
function handleAddCardClick() {
  cardForm.reset();
  cardFormValidator.resetValidation();
  openPopup(cardAddPopup);
}
function handleCardSubmit(evt) {
  evt.preventDefault();
  const card = new Card({name:addCardFormTitle.value, link: addCardFormLink.value,  },cardSelector, handlePreveiwImage)
   cardListEl.prepend(card.getView());
  closePopup(cardAddPopup);
}
function handleEditButtonClick() {
  fillProfileForm();
  profieFormValidator.resetValidation();
  openPopup(editPopup);
}
function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileTitleEl.textContent = profileTitleInput.value;
  profileDescriptionEl.textContent = profileDescriptionInput.value;

  closePopup(editPopup);
}
function initCards(){

}
function fillProfileForm() {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
}

function handlePreveiwImage(card){
  popupImage.src = card.link;
    popupImage.alt = card.name;
    previewPopupCaption.textContent = card.name;
    openPopup(previewPopup);
}
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
  profieFormValidator.resetValidation();
  openPopup(editPopup);
 });
  
  
 
  

  initialCards.forEach(function (cardData) {
  renderCard(cardData, cardListEl);
});

cardAddButton.addEventListener("click", handleAddCardClick);
cardForm.addEventListener("submit", handleCardSubmit);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", handleEditButtonClick);


profieFormValidator.enableValidation();
cardFormValidator.enableValidation();