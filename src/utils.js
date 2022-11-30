function closePopupByCloseButtonClick(event) {
  const popup = document.querySelector(".popup_is-opened");

  closePopup(popup);
}

export const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
  popup.addEventListener("click", handleOverlayClick);

  popup
    .querySelector(".popup__close")
    .addEventListener("click", closePopupByCloseButtonClick);
};

export const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
  popup.removeEventListener("click", handleOverlayClick);
  popup
    .querySelector(".popup__close")
    .removeEventListener("click", closePopupByCloseButtonClick);
};
export const handleEscape = (e) => {
  const key = e.key;
  if (key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
};
export const handleOverlayClick = (event) => {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(event.target);
  }
};

//export {openPopup, closePopup};
