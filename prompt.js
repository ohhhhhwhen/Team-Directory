module.exports = {
  Manager: [
    {
      type: "input",
      message: "Enter Name:",
      name: "name"
    },
    {
      type: "input",
      message: "Enter ID #:",
      name: "id"
    },
    {
      type: "input",
      message: "Enter Email:",
      name: "email"
    },
    {
      type: "input",
      message: "Enter Office Number:",
      name: "office"
    }
  ],
  Engineer: [
    {
      type: "input",
      message: "Enter Name:",
      name: "name"
    },
    {
      type: "input",
      message: "Enter ID #:",
      name: "id"
    },
    {
      type: "input",
      message: "Enter Email:",
      name: "email"
    },
    {
      type: "input",
      message: "Enter GitHub Username:",
      name: "username"
    }
  ],
  Intern: [
    {
      type: "input",
      message: "Enter Name:",
      name: "name"
    },
    {
      type: "input",
      message: "Enter ID #:",
      name: "id"
    },
    {
      type: "input",
      message: "Enter Email:",
      name: "email"
    },
    {
      type: "input",
      message: "Enter School Name:",
      name: "school"
    }
  ],
  AddorDone: [
    {
      type: "list",
      message: "Pick One:",
      name: "pick",
      choices: [
        "Add Intern",
        "Add Engineer",
        "All Done"
      ]
    }
  ]
};
