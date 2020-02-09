"use strict";

const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const prompt = require("./prompt");
const teamMembers = [];
let members = "";

async function promptManager() {
  const answers = await inquirer.prompt(prompt.Manager);
  const manager = new Manager(
    answers.name,
    answers.id,
    answers.email,
    answers.office
  );
  teamMembers.push(manager);
  teamBuilder();
}

async function promptEngineer() {
  const answers = await inquirer.prompt(prompt.Engineer);
  const engineer = new Engineer(
    answers.name,
    answers.id,
    answers.email,
    answers.username
  );
  teamMembers.push(engineer);
  teamBuilder();
}

async function promptIntern() {
  const answers = await inquirer.prompt(prompt.Intern);
  const intern = new Intern(
    answers.name,
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
      await promptEngineer();
      break;
    case "Add Intern":
      await promptIntern();
      break;
    default:
      // await arrayToHTML(teamMembers);
      await buildHTML(teamMembers);
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
      <title>Team Directory</title>
    </head>
    <body>
      <div class="jumbotron text-center" style="background-image: url(https://image.shutterstock.com/image-vector/kids-learn-coding-banner-computer-260nw-1392200774.jpg);">
        <h1 class="display-4" style="margin-top: -48px;">Team Directory</h1>
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
  let role = teamMember[0].getRole();
  let mail = teamMember[0].getEmail();
  let offN = teamMember[0].getOfficeNumber();
  return `
    <div class="col-md-4">
      <div class="card" style="background-color: rgb(243, 104, 104); width: 300px;">
        <img class="card-img-top text-center" style="margin-left: 75px; width: 150px; height: 150px;" src="./images/managerimg.png"/>
          <div class="card-body">
          <h5 class="text-center">${teamMember[0].name}</h5>
          <h5 class="text-center">${role}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID #: ${teamMember[0].id}</li>
              <li class="list-group-item">
                  Email:
                  <a
                    style="font-size: 16px; color: rgb(243, 104, 104); text-decoration: none;"
                    href="mailto:${mail}"
                    target="_blank"
                    >${mail}</a
                  >
                </li>
              <li class="list-group-item">Office #: ${offN}</li>
            </ul>
          </div>
      </div>
    </div>`;
}

async function internHTML(teamMember) {
  let role = teamMember.getRole();
  let mail = teamMember.getEmail();
  let internstr = `
    <div class="col-md-4">
      <div class="card" style="background-color: rgb(255, 188, 64); width: 300px;">
        <img class="card-img-top text-center" style="margin-left: 75px; width: 150px; height: 150px;" src="./images/internimg.png"/>
          <div class="card-body">
          <h5 class="text-center">${teamMember.name}</h5>
          <h5 class="text-center">${role}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID #: ${teamMember.id}</li>
              <li class="list-group-item">
                  Email:
                  <a
                    style="font-size: 16px; color: rgb(255, 188, 64); text-decoration: none;"
                    href="mailto:${mail}"
                    target="_blank"
                    >${mail}</a
                  >
                </li>
              <li class="list-group-item">School: ${teamMember.school}</li>
            </ul>
          </div>
      </div>
    </div>`;
    members = members + internstr;
}

async function engineerHTML(teamMember) {
  let role = teamMember.getRole();
  let mail = teamMember.getEmail();
  let gH = teamMember.getGithub();
  let engineerstr = `
    <div class="col-md-4">
      <div class="card" style="background-color: rgb(127, 221, 127); width: 300px;">
        <img class="card-img-top text-center" style="margin-left: 75px; width: 150px; height: 150px;" src="./images/engineerimg.png"/>
          <div class="card-body">
          <h5 class="text-center">${teamMember.name}</h5>
          <h5 class="text-center">${role}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID #: ${teamMember.id}</li>
              <li class="list-group-item">
                  Email:
                  <a
                    style="font-size: 16px; color: rgb(127, 221, 127); text-decoration: none;"
                    href="mailto:${mail}"
                    target="_blank"
                    >${mail}</a
                  >
                </li>
              <li class="list-group-item">GitHub: <a style="font-size: 16px; color: rgb(127, 221, 127); text-decoration: none;" href="https://github.com/${teamMember.username}" target="_blank">${teamMember.username}</a></li>
            </ul>
          </div>
      </div>
    </div>`;
  members = members + engineerstr;

}

async function arrayToHTML(teamMember) {
  for (let x = 1; x < teamMember.length; ++x) {
    if (teamMember[x] instanceof Engineer) {
      await engineerHTML(teamMember[x]);
    } else {
      await internHTML(teamMember[x]);
    }
  }
  return members;
}

promptManager();
