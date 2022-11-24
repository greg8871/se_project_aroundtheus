class Card {
  constructor(cardData, cardSelector, handlePreviewImage) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
  }

  _setEventListeners() {
    this._imageEl.addEventListener("click", () =>
      this._handlePreviewImage({
        link: this._link,
        name: this._name,
      })
    );

    this._likeBtn.addEventListener("click", this._handleLike);

    this._trashBtn.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });
  }

  _handleLike = () => {
    this._likeBtn.classList.toggle("card__heart-button_active");
  };

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();

    this._imageEl = this._element.querySelector(".card__image");
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;

    const titleEl = this._element.querySelector(".card__title");
    titleEl.textContent = this._name;

    this._likeBtn = this._element.querySelector(".card__heart-button");
    this._trashBtn = this._element.querySelector(".card__trash");

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
