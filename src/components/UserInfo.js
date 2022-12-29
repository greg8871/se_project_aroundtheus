export default class UserInfo {
  constructor({ userNameSelector, userTitleSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userTitle = document.querySelector(userTitleSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userTitle: this._userTitle.textContent,
      avatar: this._avatarElement.style.backgroundImage,
      // _id: this._ownerId,
    };
  }
  setUserInfo({ name, about, avatar, id }) {
    this._userName.textContent = name;
    this._userTitle.textContent = about;
    this._avatarElement.style.backgroundImage = `url(${avatar})`;
    this._ownerId = id;
  }
}
