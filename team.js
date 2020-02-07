"use strict";

const inquirer = require("inquirer");
const Employee = require("./employee");
const Engineer = require("./engineer");
const Manager = require("./manager");
const Intern = require("./intern");
const prompt = require("./prompt");
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
  teamBuilder();
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
  teamBuilder();
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
  teamBuilder();
}

async function teamBuilder() {
  const answer = await inquirer.prompt(prompt.AddorDone);
  switch (answer.pick) {
    case "Add Engineer":
      promptEngineer();
      break;
    case "Add Intern":
      promptIntern();
      break;
    default:
      buildHTML(teamMembers);
  }
}

function buildHTML(manager, teammates) {
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
          ${managerHTML(manager)}
          {{team}}
      </div>
      </div>
    </body>
  </html>`;
}

async function managerHTML(teamMember) {
  return `
    <div class="col-md-12">
      <div class="card">
          <img class="card-img-top" src="./images/managerimg.jpg"/>
          <div class="card-body">
            <h4>${teamMember.name}</h4>
            <h4>${teamMember.title}</h4>
            <h4>ID #: ${teamMember.id}</h4>
            <h4>Office #: ${teamMember.office}</h4>
            <h4>Email: ${teamMember.email}</h4>
            </div>
          </div>`;
}

async function internHTML(teamMembers) {
  return `
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
}

async function engineerHTML(teamMembers) {
  return `
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
}

async function arrayToHTML() {
  for (let x = 1; x < teamMembers.length; ++x) {
    if (teamMembers[x].title === "Engineer") {
      await engineerHTML(teamMembers[x].title);
    } else {
      await internHTML(teamMembers[x]);
    }
  }
}

promptManager();