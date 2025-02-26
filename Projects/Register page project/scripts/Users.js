export class User {
  static usersList = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  static count = 0;
  isLogin = false;
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.id = ++User.count;

    User.usersList.push(this);
    localStorage.setItem("users", JSON.stringify(User.usersList));
  }
  static login(id) {
    const user = User.usersList.find((user) => user.id === id);
    user.isLogin = true;
    localStorage.setItem("users", JSON.stringify(User.usersList));
  }
  static changePassword(id, password) {
    const user = User.usersList.find((user) => user.id === id);
    user.password = password;
    localStorage.setItem("users", JSON.stringify(User.usersList));
  }
}
