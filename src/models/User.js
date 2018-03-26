import JwtDecode from "jwt-decode";

export default class User {
  static from(token) {
    try {
      let obj = JwtDecode(token);
      return new User(obj);
    } catch (_) {
      return null;
    }
  }

  constructor({ user_id, user, username }) {
    this.id = user_id;
    this.user = user;
    this.username = username;
  }

  get isUser() {
    return this.user;
  }
}
