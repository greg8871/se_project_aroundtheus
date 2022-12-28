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
      userAvatar: this._userAvatar.src,
    };
  }
  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userTitle.textContent = about;
    if (avatar) {
      this._avatarElement.src = avatar;
    }
  }
}
