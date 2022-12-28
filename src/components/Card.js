export default class Card {
  constructor({
    cardData,
    cardSelector,
    handlePreviewImage,
    handleLikeClick,
    handleDeleteClick,
  }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._userId = cardData.userId;
    this._ownerId = cardData.owner._id;
  }

  _setEventListeners() {
    this._element;
    this._imageEl.addEventListener("click", () =>
      this._handlePreviewImage({
        link: this._link,
        name: this._name,
      })
    );
    //this._trashBtn.addEventListener("click", () => this._handleDelete());

    this._element;
    this._likeBtn.addEventListener("click", () => this._handleLikeClick(this));

    this._element;
    this._trashBtn.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );
  }

  _handleLikeButton = () => {
    if (this.isLiked()) {
      this._element;
      this._likeBtn.classList.add("cards__heart-button_active");
    } else {
      this._element;
      this._likeBtn.classList.remove("cards__heart-button_active");
    }
  };

  _handleDelete = () => {
    this._element.remove();
    this._element = null;
  };

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  showLikes(data) {
    this._likes = data || [];
    this._likeCounter.textContent = this._likes.length;
    this._handleLikeButton();
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _removeDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._trashBtn.remove();
    }
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
    this._likeCounter = this._element.querySelector(".cards__like-counter");
    // this._setEventListeners();
    this.showLikes(this._likes);
    this._setEventListeners();
    this._removeDeleteButton();
    return this._element;
  }
}
