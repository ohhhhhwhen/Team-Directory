const Team = require('./team');
const Employee = require('./employee');

class Manager extends Employee{
  constructor(name, title, id, email, office){
    super(name, title, id, email);
    this.office = office;
    console.log(`Office Number: ${this.office}`);
    console.log(`${super.getRole()}`);
    console.log('--------------------');
  }
}

module.exports = Manager;