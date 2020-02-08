"use strict";

const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./employee");
const Engineer = require("./engineer");
const Manager = require("./manager");
const Intern = require("./intern");
const prompt = require("./prompt");
const teamMembers = [];
let members = "";

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
      await promptEngineer();
      break;
    case "Add Intern":
      await promptIntern();
      break;
    default:
      await arrayToHTML(teamMembers);
      await buildHTML(teamMembers, members);
      console.log(members);    
  }
}

async function buildHTML(teamMembers, members) {
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
        <h1 class="display-4">Team Directory</h1>
      </div>
      <div class="container" style="border: solid;">
        <div class="row">
          ${await managerHTML(teamMembers)}
          ${members}
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
    <div class="col-md-4">
      <div class="card" style="background-color: rgb(243, 104, 104); width: 250px;">
        <img class="card-img-top text-center" style="margin-left: 50px; width: 150px; height: 150px;" src="./images/managerimg.png"/>
          <div class="card-body">
          <h5 class="text-center">${teamMember[0].name} ${teamMember[0].title}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID #: ${teamMember[0].id}</li>
              <li class="list-group-item">Email: ${teamMember[0].email}</li>
              <li class="list-group-item">Office #: ${teamMember[0].office}</li>
            </ul>
          </div>
      </div>
    </div>`;
}

async function internHTML(teamMember) {
  let internstr = `
    <div class="col-md-4">
      <div class="card" style="background-color: rgb(255, 188, 64); width: 250px;">
        <img class="card-img-top text-center" style="margin-left: 50px; width: 150px; height: 150px;" src="./images/internimg.png"/>
          <div class="card-body">
          <h5 class="text-center">${teamMember.name} ${teamMember.title}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID #: ${teamMember.id}</li>
              <li class="list-group-item">Email: ${teamMember.email}</li>
              <li class="list-group-item">School: ${teamMember.school}</li>
            </ul>
          </div>
      </div>
    </div>`;
    members = members + internstr;
}

async function engineerHTML(teamMember) {
  let engineerstr = `
    <div class="col-md-4">
      <div class="card" style="background-color: rgb(127, 221, 127); width: 250px;">
        <img class="card-img-top text-center" style="margin-left: 50px; width: 150px; height: 150px;" src="./images/engineerimg.png"/>
          <div class="card-body">
          <h5 class="text-center">${teamMember.name} ${teamMember.title}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID #: ${teamMember.id}</li>
              <li class="list-group-item">Email: ${teamMember.email}</li>
              <li class="list-group-item">GitHub: ${teamMember.username}</li>
            </ul>
          </div>
      </div>
    </div>`;
  members = members + engineerstr;

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
