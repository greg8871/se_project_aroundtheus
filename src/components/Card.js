export default class Card {
  constructor(
    cardData,
    cardSelector,
    handlePreviewImage,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
  }

  _setEventListeners() {
    this._imageEl.addEventListener("click", () =>
      this._handlePreviewImage({
        link: this._link,
        name: this._name,
      })
    );
    //this._trashBtn.addEventListener("click", () => this._handleDelete());
    this._likeBtn.addEventListener("click", () => this._handleLike());

    this._element;
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );
    this._element;
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );
  }

  _handleLike = () => {
    this._likeBtn.classList.toggle("card__heart-button_active");
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
      this._deleteButton.remove();
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
    return this._element;
  }
}
