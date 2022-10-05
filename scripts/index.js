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

const cardAddForm = document.querySelector("#add-card-form");
const cardListEl = document.querySelector(".locations__cards");
const cardTemplate = document.querySelector("#card-template");
const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const previewCloseBtn = document.querSelector(".popup_preview_close");
previewCloseBtn.addEventListener("click", funstion () {
  closePopup(previewPopup);
})

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
  const cardEl = cardTemplate.content.cloneNode(true);
  const imageEl = cardEl.querySelector(".card__image");
  const cardTitle = cardEl.querySelector(".card__title");
  imageEl.src = cardData.link;
  imageEl.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  const cardLikeButton = cardEl.querySelector(".card__heart-button");
  cardLikeButton.addEventListener("click", () => {
  cardLikeButton.classList.toggle(".card__heart-button_active");
  });
 imageEl.addEventLictener("click" , function (){
  const popupImage = previewPopup.querSelector(".popup__image");
  const popupTitle = previewPopup.querSelector(".popup__title");
  popupTitle.src = cardData.link;
  popupTitle.alt = cardData.name;
  openPopup(previewPopup);
 });

  return cardEl;
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;

  openPopup(profileEditPopup);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditPopup);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddPopup);
});
const onImagePreviewp = (cardEl) => {
  toggleModelWindow(previewPopup);
};

cardAddCloseBtn.addEventListener("click", () => {
  closePopup(cardAddPopup);
});
popupPreviewClose.addEventListener("click", () =>
  toggleModelWindow(previewPopup)
);
profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;

  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;

  closePopup();
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
});

initialCards.forEach(function (cardData) {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListEl);
});
