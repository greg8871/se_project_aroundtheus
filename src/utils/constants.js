export const avatarButton = document.querySelector("#avatar-button");

export const profileNameInput = document.querySelector(
  ".popup__input_type_name"
);

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

const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);

const cardSelector = "#card-template";

export const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const selectors = {
  cardListElement: ".cards__array",
  cardTemplate: "#card-template",

  profileEditPopup: "#edit-popup",
  cardAddPopup: "#add-popup",
  profileNameElement: ".profile__name",
  profileTitleElement: ".profile__title",
  avatarPopupElement: "#avatar-popup",
  avatarButton: "#avatar-button",
  avatarImage: ".profile__image",
  confirmPopup: "#confirm-popup",
};

export {
  profileEditButton,
  profileEditForm,
  previewPopup,
  cardAddPopup,
  cardAddButton,
  cardForm,
  profileTitleInput,
  editPopup,
  profileTitleEl,
  profileDescriptionEl,
  cardAddCloseBtn,
  popupImage,
  previewPopupCaption,
  profileNameSelector,
  profileDescriptionSelector,
  cardSelector,
};
