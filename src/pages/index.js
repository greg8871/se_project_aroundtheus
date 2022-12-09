import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
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
};
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
const profileNameSelector = ".profile__name-title";
const profileDescriptionSelector = ".profile__description";
const addCardFormTitle = cardForm.querySelector("#owner-title");
const addCardFormLink = cardForm.querySelector("#owner-url");
const cardListSelector = ".locations__cards";
const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const cardSelector = "#card-template";
const profieFormValidator = new FormValidator(config, profileEditForm);
const cardFormValidator = new FormValidator(config, cardForm);
const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-popup",
  handleFormSubmit: (data) => {},
});
editProfilePopup.setEventListeners();
const addCardPopup = new PopupWithForm({
  popupSelector: "#add-popup",
  handleFormSubmit: (data) => {},
});
addCardPopup.setEventListeners();
const viewImage = new PopupWithImage("#preview__popup");
viewImage.setEventListeners();
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(renderCard(data));
    },
  },
  cardListSelector
);
cardList.renderItems();

function renderCard(cardData) {
  const card = new Card(cardData, cardSelector, handlePreveiwImage);
  return card.getView();
}
function handleAddCardClick() {
  profieFormValidator.resetValidation();
  addCardPopup.open();
}
function handleCardSubmit(evt) {
  evt.preventDefault();
  renderCard({
    name: addCardFormTitle.value,
    link: addCardFormLink.value,
    cardSelector,
  });
  closePopup(cardAddPopup);
}

function handleEditButtonClick() {
  profieFormValidator.resetValidation();
  editProfilePopup.open();
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleEl.textContent = profileTitleInput.value;
  profileDescriptionEl.textContent = profileDescriptionInput.value;

  closePopup(editPopup);
}

const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userTitleSelector: profileDescriptionSelector,
});

const { userName, userTitle } = userInfo.getUserInfo();
document.querySelector(profileNameSelector).value = userName;
document.querySelector(profileDescriptionSelector).value = userTitle;

function handlePreveiwImage(card) {
  viewImage.open({ link: card.link, name: card.name });
  //popupImage.src = card.link;
  //popupImage.alt = card.name;
  // previewPopupCaption.textContent = card.name;
  //openPopup(previewPopup);
}

cardAddButton.addEventListener("click", handleAddCardClick);
cardForm.addEventListener("submit", handleCardSubmit);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", handleEditButtonClick);
profieFormValidator.enableValidation();
cardFormValidator.enableValidation();
