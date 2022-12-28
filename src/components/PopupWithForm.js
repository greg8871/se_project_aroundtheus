import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, popupSelector, resetOnClose }) {
    super({ popupSelector });

    this._resetOnClose = resetOnClose;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._formInputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._submitButtonText = this._submitButton.textContent;
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
  setSubmitText(submit, submitText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = submitText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
