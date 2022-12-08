export default class UserInfo {
  constructor({ userNameSelector, userTitleSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userTitle = document.querySelector(userTitleSelector);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userTitle.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userTitle.textContent = about;
  }
}
