import {
  profileTitle,
  profileSubtitle,
  profileAvatar,
} from "../utils/constants.js";

export default class UserInfo {
  constructor(profile) {
    this._name = profile.name;
    this._about = profile.about;
    this._avatar = profile.avatar;
    this._id = profile._id;
  }

  setUserInfo() {
    profileTitle.textContent = this._name;
    profileSubtitle.textContent = this._about;
    profileAvatar.src = this._avatar;
  }

  setUserId(id) {
    this._id = id;
  }

  getUserId() {
    return this._id;
  }
}
