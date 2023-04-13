export default class UserInfo {
    constructor({titleSelector, jobSelector, avatarSelector}) {
      this._titleSelector = document.querySelector(titleSelector);
      this._jobSelector = document.querySelector(jobSelector);
      this._avatarSelector = document.querySelector(avatarSelector);
    }

    getUserInfo() {
      return {
        name: this._titleSelector.textContent,
        job: this._jobSelector.textContent
      }
    }

    setUserInfo({name, job}) {
        this._titleSelector.textContent = name;
        this._jobSelector.textContent = job;
    }

    setUserAvatar(avatarLink) {
      this._avatarSelector.src = avatarLink; 
    }
}