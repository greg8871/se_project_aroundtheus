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
const api = new Api("https://around.nomoreparties.co/v1/group-12", {
  authorization: "d8092ba9-4c2a-4483-82e5-2411b2c0153d",
  "Content-Type": "application/json",
});
let cardSection = null;
let userId = null;

const cardFormValidator = new FormValidator(config, cardForm);
const profileFormValidator = new FormValidator(config, editPopup);
profileFormValidator.enableValidation();

const avatarFormElement = document.querySelector("#avatar-form");
const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarFormElement
);
avatarFormValidator.enableValidation();
const userInfo = new UserInfo({
  userNameSelector: selectors.profileNameSelector,
  userTitleSelector: selectors.profileDescriptionSelector,
  avatarSelector: selectors.avatarImage,
});
const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-popup",
  handleFormSubmit: (data) => {
    api
      .editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        editProfilePopup.close();
      })
      .catch((error) => {
        console.log(`An error has occured ${error}`);
      })
      .finally(() => editProfilePopup.setSubmitText(false));
  },
  resetOnClose: true,
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: selectors.cardAddPopup,
  handleFormSubmit: (cardData) => {
    addCardPopup.setSubmitText(true, "Creating...");
    api
      .postCard(cardData)
      .then((cardData) => {
        cardSection.addItem(renderCard(cardData, userId));
        addCardPopup.close();
      })
      .catch((error) => {
        console.log(`An error has occured ${error}`);
      })
      .finally(() => addCardPopup.setSubmitText(false));
  },
  resetOnClose: true,
});
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm({
  popupSelector: selectors.avatarPopupElement,
  handleFormSubmit: (data) => {
    avatarPopup.setSubmitText(true);
    api
      .editAvatar(data)
      .then((data) => {
        userInfo.setAvatar(data.avatar);
        avatarPopup.close();
      })
      .catch((error) => console.log(`An error has occured ${error}`))
      .finally(() => avatarPopup.setSubmitText(false));
  },
  resetOnClose: true,
});
avatarPopup.setEventListeners();
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
  avatarPopup.open();
});
profileEditButton.addEventListener("click", () => {
  const { userName, userTitle } = userInfo.getUserInfo();
  profileNameInput.value = userName;
  profileTitleInput.value = userTitle;
  editProfilePopup.open();
});
cardAddButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  addCardPopup.open();
});

function renderCard(cardData, userId) {
  const card = new Card({
    data: { ...cardData, userId },
    cardSelector: "#card-template",
    handleCardClick: () => {
      imagePopup.open(cardData);
    },
    handleLikeClick: (data) => {
      if (card.isLiked()) {
        api
          .removeLikes(data._cardId)
          .then((response) => {
            card.updateLikes(response.likes);
          })
          .catch((error) => {
            console.log(`An error has occured ${error}`);
          });
      } else {
        api
          .addLikes(data._cardId)
          .then((response) => {
            card.updateLikes(response.likes);
          })
          .catch((error) => {
            console.log(`An error has occured ${error}`);
          });
      }
    },

    handleDeleteClick: (card) => {
      confirmationPopup.setConfirmDelete(() => {
        confirmationPopup.setSubmitText(true, "Deleting...");
        api
          .deleteCard(card._cardId)
          .then(() => {
            card.deleteCard();
            confirmationPopup.close();
          })
          .catch((error) => {
            console.log(`An error has occured ${error}`);
          })
          .finally(() => confirmationPopup.setSubmitText(false));
      });
      confirmationPopup.open();
    },
  });
  return card.getView();
}
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([data, cards]) => {
    userId = data._id;
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
    });
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          cardSection.addItem(renderCard(cardData, userId));
        },
      },
      selectors.locationsCardSelector
    );
    cardSection.renderItems();
  }
);
function fillProfileForm(userName, userTitle) {
  editProfilePopup.setInputValues({
    title: userName,
    description: userTitle,
  });
}

cardFormValidator.enableValidation();
