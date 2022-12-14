export default class Card {
  constructor({
    data,
    cardSelector,
    handlePreviewImage,
    handleLikeClick,
    handleDeleteClick,
    handleCardClick,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
  }
  getId() {
    return this._id;
  }
  getLikeList() {
    return this._likesList;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element;
    this._imageEl.addEventListener("click", () =>
      this._handleCardClick({
        link: this._link,
        name: this._name,
      })
    );
    //this._trashBtn.addEventListener("click", () => this._handleDelete());

    this._likeBtn.addEventListener("click", () => this._handleLikeClick(this));

    this._element;
    this._trashBtn.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );
  }

  _updateLikeButtonState = () => {
    if (this.isLiked()) {
      this._likeBtn.classList.add("cards__heart-button_active");
    } else {
      this._likeBtn.classList.remove("cards__heart-button_active");
    }
  };

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  _renderLikes() {
    this._likeCounter.textContent = this._likes.length;
    this._updateLikeButtonState();
  }
  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }
  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _removeDeleteButton() {
    console.log(this._userId, this._ownerId);
    console.log(this._userId !== this._ownerId);
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
    this._setEventListeners();
    this._removeDeleteButton();
    this._renderLikes();
    return this._element;
  }
}
