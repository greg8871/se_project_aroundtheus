export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        !evt.target.closest(".popup__content") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
