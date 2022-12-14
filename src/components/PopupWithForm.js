import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, popupSelector, resetOnClose }) {
    super({ popupSelector });

    this._resetOnClose = resetOnClose;
    this._formEl = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._formEl.querySelectorAll(".popup__input");
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._submitButtonText = this._submitButton.textContent;
    this._formInputList = Array.from(
      this._formEl.querySelectorAll(".popup__form")
    );
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data[input.name] != null) {
        input.value = data[input.name];
      }
    });
  }
  setEventListeners() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }
  close() {
    if (this._resetOnClose) {
      this._formEl.reset();
    }
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
