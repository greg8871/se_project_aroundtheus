export default class FormValidator {
  constructor(config, formEl) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formEl = formEl;
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._formButton = this._formEl.querySelector(this._submitButtonSelector);
  }
  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }
  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }
  _checkInputValidity() {
    this._toggleButtonState();
    this._inputList.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        this._showError(inputEl);
      } else {
        this._hideError(inputEl);
      }
    });
  }
  disableSubmitButton = () => {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  };

  _enableSubmitButton = () => {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  };

  _hasInvalidInput() {
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._formButton.classList.add(this._inactiveButtonClass);
      this._formButton.disabled = true;
    } else {
      this._formButton.classList.remove(this._inactiveButtonClass);
      this._formButton.disabled = false;
    }
  }
  //_setEventListeners() {
  // this._inputList = Array.from(
  //     this._formEl.querySelectorAll(this._inputSelector)
  // );
  //this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
  // this._toggleButtonState();
  // this._inputList.forEach((inputEl) => {
  //   inputEl.addEventListener("input", (evt) => {
  //   this._toggleButtonState();
  //   this._checkInputValidity(inputEl);
  // });
  //});
  // }
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }

  enableValidation() {
    this._formEl.addEventListener("input", () => this._checkInputValidity());
  }
}
