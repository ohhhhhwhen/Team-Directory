"use strict";

const fs = require("fs");
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
      console.log(teamMembers[0].name);
      console.log(teamMembers[1].name);

  }
}

function buildHTML(teamMembers) {
  fs.writeFile(
    "index.html",
    `<!DOCTYPE html>
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
          ${managerHTML(teamMembers)}
          ${arrayToHTML(teamMembers)}
      </div>
      </div>
    </body>
  </html>`,
    function(err) {
      if (err) throw err;
      console.log("Team Page Created!");
    }
  );
}

async function managerHTML(teamMember) {
  return `
    <div class="col-md-12">
      <div class="card">
          <img class="card-img-top" src="./images/managerimg.jpg"/>
          <div class="card-body">
            <h4>${teamMember[0].name}</h4>
            <h4>${teamMember[0].title}</h4>
            <h4>ID #: ${teamMember[0].id}</h4>
            <h4>Office #: ${teamMember[0].office}</h4>
            <h4>Email: ${teamMember[0].email}</h4>
            </div>
          </div>`;
}

async function internHTML(teamMember) {
  return `
    <div class="col-md-3">
      <div class="card">
          <img class="card-img-top" src="./images/internimg.jpg"/>
          <div class="card-body">
            <h4>${teamMember.name}</h4>
            <h4>${teamMember.title}</h4>
            <h4>ID #: ${teamMember.id}</h4>
            <h4>Email: ${teamMember.email}</h4>
            <h4>School: ${teamMember.school}</h4>
            </div>
          </div>`;
}

async function engineerHTML(teamMember) {
  return `
    <div class="col-md-3">
      <div class="card">
          <img class="card-img-top" src="./images/engineerimg.jpg"/>
          <div class="card-body">
            <h4>${teamMember.name}</h4>
            <h4>${teamMember.title}</h4>
            <h4>ID #: ${teamMember.id}</h4>
            <h4>Email: ${teamMember.email}</h4>
            <h4>GitHub: ${teamMember.username}</h4>
            </div>
          </div>`;
}

async function arrayToHTML(teamMembers) {
  for (let x = 1; x < teamMembers.length; ++x) {
    if (teamMembers[x].title === "Engineer") {
      await engineerHTML(teamMembers[x].title);
    } else {
      await internHTML(teamMembers[x]);
    }
  }
}

promptManager();
