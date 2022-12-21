export default class UserInfo {
  constructor({ userNameSelector, userTitleSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userTitle = document.querySelector(userTitleSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userTitle.textContent,
      avatar: this._avatarElement.style.backgroundImage,
      _id: this._ownerId,
    };
  }
  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userTitle.textContent = about;
    this._avatarElement.style.backgroundImage = `url(${avatar})`;
    this._ownerId = _id;
  }
}
