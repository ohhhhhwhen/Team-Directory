const Team = require('./team');

class Employee{
  constructor(name, title, id, email){
      this.name = name;
      this.id = id;
      this.title = title;
      this.email = email;

      console.log(`Name: ${this.getName()}`);
      console.log(`ID: ${this.getID()}`);
      console.log(`Email: ${this.getEmail()}`);

  }
  getName(){
      return this.name;
  }

  getID(){
      return this.id;
  }

  getEmail(){
      return this.email;
  }

  getRole(){
      return this.title;
  }
}

module.exports = Employee;