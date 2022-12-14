import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCaption = document.querySelector(".popup__preview-caption");
    this._popupImage = document.querySelector(".popup__image");
  }

  open({ name, link }) {
    this._popupCaption.textContent = name;
    this._popupImage.alt = name;
    this._popupImage.src = link;

    super.open();
  }
}
