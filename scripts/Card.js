class Card {

  constructor(cardData, cardSelector, handlePreviewImage) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._imageSelector = ".card__image";
    this._handlePreviewImage = handlePreviewImage;
    this._likeSelector = ".card__heart-button"
    this._titleSelector = ".card__title"
    this._trashSelector = ".card__trash"
    this._likeActiveClass = "card__heart-button_active"
    
  }

  _setEventListeners() {
    this._imageEl.addEventListener("click", () => this._handlePreviewImage({
      link: this._link,
      name: this._name
    }));

   _handleLike = () => {
  this._likeBtn.classList.toggle(this._likeActiveClass);
}

this._likeBtn.addEventListener("click", this._handleLike) 
      this._likeBtn.classList.toggle(this._likeActiveClass);
    };

    this._trashBtn.addEventListener("click", ()  =>{
      this._element.remove();
      this._element = null;
    });
  
  };

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();

    this._imageEl = this._element.querySelector(this._imageSelector);
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    this._titleEl.textContent = this._name;
    this._likeBtn = this._element.querySelector(this._likeSelector);
    this._trashBtn = this._element.querySelector(this._trashSelector);

    this._setEventListeners();

    return this._element;

  }
}

export default Card;