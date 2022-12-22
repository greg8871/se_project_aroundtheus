import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { selectors } from "../utils/constants.js";
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

const cardFormValidator = new FormValidator(config);

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-popup",
  handleFormSubmit: (evt, data) => {
    evt.preventDefault();
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
  popupSelector: "#add-popup",
  handleFormSubmit: (data) => {
    const card = createCard({
      name: data.title,
      link: data.link,
    });
    renderCard(card);
    addCardPopup.close();
  },
});
addCardPopup.setEventListeners();
const viewImage = new PopupWithImage("#preview__popup");
viewImage.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
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
      cardListSelector
    );
    cardList.renderItems();
  }
);
function renderCard(card) {
  cardList.addItem(card);
}

function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handlePreveiwImage);

  return card.getView();
}
function handleAddCardClick() {
  cardFormValidator.resetValidation();
  addCardPopup.open();
}

function handleEditButtonClick() {
  const { name, job } = userInfo.getUserInfo();
  fillProfileForm(name, job);
  profieFormValidator.resetValidation();
  editProfilePopup.open();
}

const userInfo = new UserInfo({
  userNameSelector: selectors.profileNameSelector,
  userTitleSelector: selectors.profileDescriptionSelector,
});

function fillProfileForm(userName, userTitle) {
  editProfilePopup.setInputValues({
    title: userName,
    description: userTitle,
  });
}

function handlePreveiwImage(card) {
  viewImage.open({ link: card.link, name: card.name });
}

async function init() {
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
}
init();

//cardAddButton.addEventListener("click", handleAddCardClick);
//profileEditButton.addEventListener("click", handleEditButtonClick);
//profieFormValidator.enableValidation();
cardFormValidator.enableValidation();
