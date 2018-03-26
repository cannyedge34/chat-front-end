const ID_TOKEN_KEY = "token";

export default {
  getToken() {
    return window.localStorage.getItem(ID_TOKEN_KEY);
  }
};
