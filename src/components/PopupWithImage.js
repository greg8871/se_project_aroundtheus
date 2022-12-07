import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupElement.querySelector(".popup__card-image").textContent = name;
    const image = this._popupElement.querySelector(".popup__image");
    image.src = link;
    image.alt = " ${name}";
    super.open();
  }
}

export default PopupWithImage;
