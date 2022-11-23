class FormValidator {
    constructor(config, formEl) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        
        this._formEl = formEl;
    }
        _showInputError(inputEl){
          const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);   
        inputEl.classList.add(this._inputErrorClass);
        errorMessageEl.textContent = inputEl.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
    };
    _hideInputError(inputEl){
        const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        errorMessageEl.textContent = "";
        errorMessageEl.classList.remove(this._errorClass);  
    };
        _checkInputValidity(inputEl){
            if (!inputEl.validity.valid) {
                this._showInputError(inputEl);
              } else {
                this._hideInputError(inputEl);
              }
        };
        disableSubmitButton = () => {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
          }
        
         
          _enableSubmitButton = () => {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
          }   

        _toggleButtonState() {
            if (this._hasInvalidInput()) {
                this.disableSubmitButton();
              } else {
                this._enableSubmitButton();
              }
        };

        _hasInvalidInput(){
            return this._inputList.some((inputEl) => {
                return !inputEl.validity.valid;
              });
        };

        _setEventListeners(){
            this._inputList = Array.from(this._formEl.querySelectorAll(this._inputSelector));;
            this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
            this._toggleButtonState();
            this._inputList.forEach((inputEl) => {
             inputEl.addEventListener("input", (evt) => {
            this._toggleButtonState();
            this._checkInputValidity(inputEl);
      });
    });
        }
        resetValidation() {
          this._toggleButtonState()
          this._inputList.forEach((input) => {
            this._hideInputError(input);
          })
        }


    enableValidation(){
        this._formEl.addEventListener("submit", (e) => {
              e.preventDefault();
    });
    this._setEventListeners() 

    }
}

export default  FormValidator;