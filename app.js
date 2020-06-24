const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//created function for employees
async function begin() {
    console.log("Employee team");
    let myTeam = "";
    let myTeamSize;
    //prompts user for how many employees are on the team
    await inquirer.prompt({
            type: "number",
            message: "How many employees on your team?",
            name: "amountTeam"
        })
        .then((data) => {
            myTeamSize = data.amountTeam + 1;
        });
        //if there are 0 team members, then a console log will return "There are no employees on your team."
    if (myTeamSize === 0) {
        console.log("There are no employees on your team.");
        return;
    }
    for (i = 1; i < myTeamSize; i++) {
        let name;
        let id;
        let title;
        let email;
        //begin prompt questions for different employees on the team.
        await inquirer.prompt([
            {
                type: "list",
                message: "what is the employees job title?",
                name: "title",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ]
            },
            {
                    type: "input",
                    message: "Employees name?",
                    name: "name"
                },
                {
                    type: "input",
                    message: "Employees id?",
                    name: "id"
                },
                {
                    type: "input",
                    message: "Employees email?",
                    name: "email"
                },
               
            ])
            .then((data) => {
                name = data.name;
                id = data.id;
                title = data.title;
                email = data.email;
            });
            //begin switch statements
        switch (title) {
            case "Manager":
                await inquirer.prompt([{
                        type: "input",
                        message: "What is your Manager's Office Number?",
                        name: "officeNumber"
                    }])
                    .then((data) => {
                        const manager = new Manager(name, id, email, data.officeNumber);
                        empMember = fs.readFileSync("templates/manager.html");
                        myTeam = myTeam + "\n" + eval('`' + empMember + '`');
                    });
                break;
            case "Engineer":
                await inquirer.prompt([{
                        type: "input",
                        message: "What is your GitHub user id?",
                        name: "GitHub"
                    }])
                    .then((data) => {
                        const engineer = new Engineer(name, id, email, data.GitHub);
                        empMember = fs.readFileSync("templates/engineer.html");
                        myTeam = myTeam + "\n" + eval('`' + empMember + '`');
                    });
                break;
            case "Intern":
                await inquirer.prompt([{
                        type: "input",
                        message: "What school are you currently enrolled in?",
                        name: "school"
                    }])
                    .then((data) => {
                        const intern = new Intern(name, id, email, data.school);
                        empMember = fs.readFileSync("templates/intern.html");
                        myTeam = myTeam + "\n" + eval('`' + empMember + '`');
                    });
                break;
        }
    }
// creates team.html file in the output folder with user information.
    const myteam = fs.readFileSync("templates/main.html");
    myTeam = eval('`' + myteam + '`');
    fs.writeFile("output/team.html", myTeam, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("Success!");


    });
}
begin();
