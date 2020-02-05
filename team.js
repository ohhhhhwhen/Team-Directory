"use strict";

const inquirer = require("inquirer");
const Employee = require("./employee");
const Engineer = require("./engineer");
const Manager = require("./manager");
const Intern = require("./intern");
const prompt = require("./prompt");
let allDone = false;
const teamMembers = [];

async function promptManager() {
  const title = "Manager";
  const answers = await inquirer.prompt(prompt.Manager);
  const manager = new Manager(
    answers.name,
    title,
    answers.id,
    answers.email,
    answers.office
  );
  teamMembers.push(manager);
}

async function promptEngineer() {
  const title = "Engineer";
  const answers = await inquirer.prompt(prompt.Engineer);
  const engineer = new Engineer(
    answers.name,
    title,
    answers.id,
    answers.email,
    answers.username
  );
  teamMembers.push(engineer);
}

async function promptIntern() {
  const title = "Intern";
  const answers = await inquirer.prompt(prompt.Intern);
  const intern = new Intern(
    answers.name,
    title,
    answers.id,
    answers.email,
    answers.school
  );
  teamMembers.push(intern);
}

async function promptAdd() {
  const answers = await inquirer.prompt(prompt.AddMore);
  if (answers.add.toLowerCase() === "engineer") {
    await promptEngineer();
  } else {
    await promptIntern();
  }
}

async function promptDone() {
  const answers = await inquirer.prompt(prompt.Done);
  if (answers.done.toLowerCase() === "yes") {
    allDone = true;
  } else {
    allDone = false;
  }
}

async function init() {
  await promptManager();
  await promptAdd();
  await promptDone();
  while(!allDone){
   await promptAdd();
   await promptDone();
  }
  console.log(teamMembers);
}

init();
