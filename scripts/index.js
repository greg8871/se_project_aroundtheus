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
const modal = document.querySelector(".modal");

const editButton = document.querySelector("#openModal");

const closeButton = document.querySelector("#closeModal");

const nameInput = document.querySelector("#nameInput");

const jobInput = document.querySelector("#descriptionInput");

const profileFormElement = document.querySelector(".modal__form");

const profileName = document.querySelector(".profile__title");

const profileJob = document.querySelector(".profile__description");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup");
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
const locationCards = document.querySelector(".locations__cards");

function closePopup() {
  profileEditPopup.classList.remove("popup_is-opened");
}
function openPopup() {
  profileEditPopup.classList.add("popup_is-opened");
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;

  openPopup();
});

profileEditCloseButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;

  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;

  closePopup();
});
initialCards.forEach((card) => {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.style.backgroundImage = `url(${card.link})`;
  cardTitle.textContent = card.name;

  locationCards.append(cardElement);
});
