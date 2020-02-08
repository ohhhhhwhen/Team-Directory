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
  }
}

async function buildHTML(teamMembers) {
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
      <div class="jumbotron text-center">
        <h1 class="display-4">Team Directory</h1>
      </div>
      <div class="container">
        <div class="row">
          ${await managerHTML(teamMembers)}
          ${await arrayToHTML(teamMembers)}
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
      <div class="card" style="background-color: rgb(243, 104, 104); width: 250px;">
        <img class="card-img-top text-center" style="width: 150px; height: 150px;" src="./images/managerimg.png"/>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${teamMember[0].name}</li>
              <li class="list-group-item">${teamMember[0].title}</li>
              <li class="list-group-item">ID #: ${teamMember[0].id}</li>
              <li class="list-group-item">Office #: ${teamMember[0].office}</li>
              <li class="list-group-item">Email: ${teamMember[0].email}</li>
            </ul>
          </div>
      </div>
    </div>`;
}

async function internHTML(teamMember) {
  return `
    <div class="col-md-3">
      <div class="card" style="width: 250px;">
        <img class="card-img-top text-center" style="background-color: rgb(255, 188, 64); width: 150px; height: 150px;" src="./images/internimg.jpg"/>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${teamMember.name}</li>
              <li class="list-group-item">${teamMember.title}</li>
              <li class="list-group-item">ID #: ${teamMember.id}</li>
              <li class="list-group-item">Email: ${teamMember.email}</li>
              <li class="list-group-item">School: ${teamMember.school}</li>
            </ul>
          </div>
      </div>
    </div>`;
}

async function engineerHTML(teamMember) {
  return `
    <div class="col-md-3">
      <div class="card" style="width: 250px;">
        <img class="card-img-top text-center" style="background-color: rgb(127, 221, 127); width: 150px; height: 150px;" src="./images/engineerimg.jpg"/>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${teamMember.name}</li>
              <li class="list-group-item">${teamMember.title}</li>
              <li class="list-group-item">ID #: ${teamMember.id}</li>
              <li class="list-group-item">Email: ${teamMember.email}</li>
              <li class="list-group-item">GitHub: ${teamMember.username}</li>
            </ul>
          </div>
      </div>
    </div>`;
}

async function arrayToHTML(teamMember) {
  for (let x = 1; x < teamMember.length; ++x) {
    if (teamMember[x].title === "Engineer") {
      await engineerHTML(teamMember[x]);
    } else {
      await internHTML(teamMember[x]);
    }
  }
}

promptManager();
