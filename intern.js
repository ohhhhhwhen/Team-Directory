const Team = require("./team");
const Employee = require("./employee");

class Intern extends Employee {
  constructor(name, title, id, email, school) {
    super(name, title, id, email);
    this.school = school;
    console.log(`${super.getRole()}`);
    console.log(`School: ${this.getSchool()}`);
    console.log("--------------------");
  }
  getSchool() {
    return this.school;
  }
}

module.exports = Intern;
