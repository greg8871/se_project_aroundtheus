import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupElement.querySelector(".popup__card-image").textcontent = name;
    const image = this._popupElement.querySelector(".popu__image");
    image.src = link;
    image.alt = " ${name}";
    super.open();
  }
}

export default PopupWithImage;
