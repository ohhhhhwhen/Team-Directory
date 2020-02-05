const Team = require("./team");
const Employee = require("./employee");

class Engineer extends Employee {
  constructor(name, title, id, email, username) {
    super(name, title, id, email);
    this.username = username;
    console.log(`${super.getRole()}`);
    console.log(`School: ${this.getGitHub()}`);
    console.log("--------------------");
  }
  getGitHub() {
    return this.username;
  }
}

module.exports = Engineer;