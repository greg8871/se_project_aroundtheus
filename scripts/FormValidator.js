class FormValidator {

    constructor(settings, formElement) {
        this.formElement = formElement;
    }
}
const settings ={
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
}

