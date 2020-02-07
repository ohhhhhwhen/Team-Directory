"use strict";

const inquirer = require("inquirer");
const Employee = require("./employee");
const Engineer = require("./engineer");
const Manager = require("./manager");
const Intern = require("./intern");
const prompt = require("./prompt");
const allDone = false;
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
  } else if (answers.add.toLowerCase() === "intern") {
    await promptIntern();
  } else {
    await promptAdd();
  }
}

async function promptDone() {
  const answers = await inquirer.prompt(prompt.Done);
  if (
    answers.done.toLowerCase() === "yes" ||
    answers.done.toLowerCase() === "y"
  ) {
    allDone = true;
  } else if (
    answers.done.toLowerCase() === "no" ||
    answers.done.toLowerCase() === "n"
  ) {
    allDone = false;
  } else {
    await promptDone();
  }
}

function mainHTML() {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      />
      <script
        src="https://kit.fontawesome.com/ce46380fe9.js"
        crossorigin="anonymous"
      ></script>
      <title>Team Directory</title>
    </head>
    <body>
      <div class="container">
        <div class="jumbotron">
          <h1 class="display-4">Team Directory</h1>
        </div>
      <div class="row">
          
      </div>
      </div>
    </body>
  </html>`;
}

async function managerHTML(teamMembers) {
  const managerStr = `
    <div class="col-md-12">
      <div class="card">
          <img class="card-img-top" src="./images/managerimg.jpg"/>
          <div class="card-body">
            <h4>${teamMembers.name}</h4>
            <h4>${teamMembers.title}</h4>
            <h4>ID #: ${teamMembers.id}</h4>
            <h4>Office #: ${teamMembers.office}</h4>
            <h4>Email: ${teamMembers.email}</h4>
            </div>
          </div>`;
  console.log(managerStr);
}

async function internHTML(teamMembers) {
  const internStr = `
    <div class="col-md-12">
      <div class="card">
          <img class="card-img-top" src="./images/internimg.jpg"/>
          <div class="card-body">
            <h4>${teamMembers.name}</h4>
            <h4>${teamMembers.title}</h4>
            <h4>ID #: ${teamMembers.id}</h4>
            <h4>Email: ${teamMembers.email}</h4>
            <h4>School: ${teamMembers.school}</h4>
            </div>
          </div>`;
  console.log(internStr);
}

async function engineerHTML(teamMembers) {
  const engineerStr = `
    <div class="col-md-12">
      <div class="card">
          <img class="card-img-top" src="./images/engineerimg.jpg"/>
          <div class="card-body">
            <h4>${teamMembers.name}</h4>
            <h4>${teamMembers.title}</h4>
            <h4>ID #: ${teamMembers.id}</h4>
            <h4>Email: ${teamMembers.email}</h4>
            <h4>GitHub: ${teamMembers.username}</h4>
            </div>
          </div>`;
  console.log(engineerStr);
}

async function init() {
  await promptManager();
  await promptAdd();
  await promptDone();
  while (!allDone) {
    await promptAdd();
    await promptDone();
  }
  for (const x = 0; x < teamMembers.length; ++x) {
    if (teamMembers[x] === "Manager") {
      await managerHTML(teamMembers[x]);
    } else if (teamMembers[x] === "Intern") {
      await internHTML(teamMembers[x]);
    } else {
      await engineerHTML(teamMembers[x]);
    }
  }
}

init();
