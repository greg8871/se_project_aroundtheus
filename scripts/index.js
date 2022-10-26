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

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector("#edit-popup");
const profileEditCloseButton = profileEditPopup.querySelector(".popup__close");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileTitleEl = document.querySelector(".profile__name-title");
const profileDescriptionEl = document.querySelector(".profile__description");
const previewPopup = document.querySelector("#preview__popup");
const cardsContainer = document.querySelector(".locations__cards");
const cardAddPopup = document.querySelector("#add-popup");
const cardAddButton = document.querySelector("#add-button");
const cardAddCloseBtn = cardAddPopup.querySelector(".popup__close");
const popupImage = previewPopup.querySelector(".popup__image");
const previewPopupCaption = previewPopup.querySelector(
  ".popup__preview-caption"
);
const cardAddForm = document.querySelector("#add-card-form");
const cardListEl = document.querySelector(".locations__cards");
const cardTemplate = document.querySelector("#card-template");
const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const previewCloseBtn = previewPopup.querySelector(".popup__close");
previewCloseBtn.addEventListener("click", () => {
  closePopup(previewPopup);
});

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

function renderCard(cardEl, container) {
  container.prepend(cardEl);
}

function getCardView(cardData) {
  const cardEl = cardTemplate.content.firstElementChild.cloneNode(true);
  const imageEl = cardEl.querySelector(".card__image");
  const cardTitle = cardEl.querySelector(".card__title");
  imageEl.src = cardData.link;
  imageEl.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  const cardLikeBtn = cardEl.querySelector(".card__heart-button");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__heart-button_active");
  });

  imageEl.addEventListener("click", function () {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    previewPopupCaption.textContent = cardData.name;
    openPopup(previewPopup);
  });

  const cardTrashBtn = cardEl.querySelector(".card__trash");
  cardTrashBtn.addEventListener("click", function () {
    console.log(cardEl);

    cardEl.remove();
  });

  return cardEl;
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
  profileTitleInput.dispatchEvent(new Event("input"));
  profileDescriptionInput.dispatchEvent(new Event("input"));
  openPopup(profileEditPopup);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditPopup);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddPopup);
});

cardAddCloseBtn.addEventListener("click", () => {
  closePopup(cardAddPopup);
});

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;

  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;

  closePopup(profileEditPopup);
});
cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({
    name,
    link,
  });
  renderCard(cardView, cardListEl);
  closePopup(cardAddPopup);
  e.target.reset();
});

initialCards.forEach(function (cardData) {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListEl);
});
