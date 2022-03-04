export default class User {
  constructor(details) {
    const { name, email } = details;
    this.name = name;
    this.email = email;
  }

  get info() {
    return this.name
  }
}
