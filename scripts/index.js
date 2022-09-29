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

const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#descriptionInput");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector("#edit-popup");

const profileEditCloseButton = document.querySelector(".popup__close");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileTitleEl = document.querySelector(".profile__name-title");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const cardsContainer = document.querySelector(".locations__cards");
const cardAddPopup = document.querySelector("#add-popup");
const cardAddButton = document.querySelector("#add-button");

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;

  openPopup(profileEditPopup);
});
cardAddButton.addEventListener("click", () => {
  openPopup(cardAddPopup);
});

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;

  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;

  closePopup();
});
profileEditCloseButton.addEventListener("click", closePopup);
initialCards.forEach((card) => {
  const cardElement = createCard(card);

  cardsContainer.append(cardElement);
});
function createCard(card) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  return cardElement;
}
