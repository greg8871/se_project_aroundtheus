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
