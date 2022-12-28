export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector.popupSelector);
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add("popup_is-opened");
    window.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_is-opened");
    window.removeEventListener("keyup", this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
}
