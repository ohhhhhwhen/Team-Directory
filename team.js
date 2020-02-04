"use strict";

const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      message: "Enter your name:",
      name: "name"
    },
    {
      type: "input",
      message: "Enter your ID #:",
      name: "id"
    },
    {
      type: "input",
      message: "Enter your email:",
      name: "email"
    },
    {
      type: "input",
      message: "Enter your job title:",
      name: "job"
    }
  ]);
  