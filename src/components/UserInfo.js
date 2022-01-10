
export default class UserInfo {
  constructor(profileTitle, profileSubtitle, profileAvatar) {
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
    this._profileAvatar = profileAvatar;
  }


  getUserInfo() {
    const thisUser = {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
      avatar: this._profileAvatar.src
    }
  return thisUser;

  }

  setUserInfo(profile) {
    this._profileTitle.textContent = profile.name;
    this._profileSubtitle.textContent = profile.about;
    this._profileAvatar.src = profile.avatar;
  }


  getUserId(profile) {
    this._id = profile._id;
    return this._id;
  }
}
