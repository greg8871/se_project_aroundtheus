import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, popupSelector }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._formInputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
  }
  _getInputValues() {
    const data = {};
    this._formInputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  setInputValues(data) {
    this._formInputList.forEach((input) => {
      if (data[input.name] != null) {
        input.value = data[input.name];
      }
    });
  }
  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
  close() {
    this._formElement.reset();
    super.close();
  }
}
