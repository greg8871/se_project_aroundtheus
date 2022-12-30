import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Card from "../components/Card.js";

import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import {
  cardSelector,
  selectors,
  validationSettings,
  cardForm,
  editPopup,
  cardAddButton,
  profileEditButton,
  profileNameInput,
  profileTitleInput,
} from "../utils/constants.js";
const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
const cardsApi = new Api("https://around.nomoreparties.co/v1/group-12", {
  authorization: "d8092ba9-4c2a-4483-82e5-2411b2c0153d",
  "Content-Type": "application/json",
});
let cardSection = null;
let userId = null;

const cardFormValidator = new FormValidator(config, cardForm);
const addFormValidator = new FormValidator(config, editPopup);
addFormValidator.enableValidation();

const avatarFormElement = document.querySelector("#avatar-form");
const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarFormElement
);
avatarFormValidator.enableValidation();

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-popup",
  handleFormSubmit: (evt, data) => {
    editProfilePopup.renderFormLoading(true);
    cardsApi
      .editProfile({
        name: data.name,
        about: data.description,
      })
      .then((res) => {
        editProfilePopup.setUserInfo(res);
      })
      .then(() => editProfilePopup.close())
      .catch((err) => console.log(err))
      .finally(() => {
        editProfilePopup.renderFormLoading(false);
      });
  },
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: selectors.cardAddPopup,
  handleFormSubmit: (data, evt) => {
    evt.preventDefault();
    const card = createCard({
      name: data.title,
      link: data.link,
    });
    renderCard(card);
    addCardPopup.close();
  },
});
addCardPopup.setEventListeners();

const newAvatarPopup = new PopupWithForm({
  popupSelector: selectors.avatarPopupElement,
  handleFormSubmit: (data) => {
    newAvatarPopup.setSubmitText(true);
    Api.editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        newAvatarPopup.close();
      })
      .catch((error) => console.log(`An error has occured ${error}`))
      .finally(() => newAvatarPopup.setSubmitText(false));
  },
  resetOnClose: true,
});
newAvatarPopup.setEventListeners();
const imagePopup = new PopupWithImage({
  popupSelector: selectors.previewPopup,
});
imagePopup.setEventListeners();

const confirmationPopup = new PopupWithConfirmation({
  popupSelector: selectors.confirmPopup,
  closeButtonSelector: selectors.conformationCloseButton,
});
confirmationPopup.setEventListeners();
document.querySelector(selectors.avatarButton).addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  newAvatarPopup.open();
});
profileEditButton.addEventListener("click", () => {
  const { userName, userTitle } = userInfo.getUserInfo();
  profileNameInput.value = userName;
  profileTitleInput.value = userTitle;
  addFormValidator.resetValidation();
  fillProfileForm(userName, userTitle);
  editProfilePopup.open();
});
cardAddButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});

Promise.all([cardsApi.getUserInfo(), cardsApi.getInitialCards()]).then(
  ([data, initialCards]) => {
    userId = data._id;
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    });
    const cardList = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          renderCard(createCard(data, userId));
        },
      },
      selectors.locationsCardSelector
    );
    cardList.renderItems();

    function renderCard(card) {
      cardList.addItem(card);
    }
  }
);
function createCard(cardData) {
  const card = new Card({
    cardData,
    cardSelector: selectors.cardTemplate,
    handlePreviewImage,
    handleLikeClick: () => {
      imagePopup.open(cardData);
    },
  });

  return card.getView();
}
/* function handleAddCardClick() {
  cardFormValidator.resetValidation();
  addCardPopup.open();
}

function handleEditButtonClick() {
  const { name, job } = userInfo.getUserInfo();
  fillProfileForm(name, job);
  profieFormValidator.resetValidation();
  editProfilePopup.open();
} */

const userInfo = new UserInfo({
  userNameSelector: selectors.profileNameSelector,
  userTitleSelector: selectors.profileDescriptionSelector,
  avatarSelector: selectors.avatarImage,
});

function fillProfileForm(userName, userTitle) {
  editProfilePopup.setInputValues({
    title: userName,
    description: userTitle,
  });
}

function handlePreviewImage(card) {
  imagePopup.open({ link: card.link, name: card.name });
}
function handleLikeClick(card) {}

/* async function init() {
  Promise.all([cardsApi.getUserInfo(), cardsApi.getInitialCards()])
    .then(([userData, cards]) => {
      profileInfoElement.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
        _id: userData._id,
      });
      cardSection.renderItems(cards);
    })
    .catch((err) => console.log(err));
} */
//init();

//cardAddButton.addEventListener("click", handleAddCardClick);
//profileEditButton.addEventListener("click", handleEditButtonClick);
//profieFormValidator.enableValidation();
cardFormValidator.enableValidation();
