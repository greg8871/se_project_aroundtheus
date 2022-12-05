import { ESC_KEYCODE } from "./constants";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscUp = this._handleEscUp.bind(this);
  }

  _handleEscUp(evt) {
    evt.preventDefault();

    if (evt.which === ESC_KETCODE) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListner("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
  open() {
  this._popupElement.classList.add("popup_opened");
  window.addEventListener("keydown", this._handleEscClose);
}

close() {
  this._popupElement.classList.remove("popup_opened");
  window.removeEventListener("keydown", this._handleEscClose);
}
_handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    this.close();
  }
};
