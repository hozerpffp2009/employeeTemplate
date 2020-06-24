const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function begin() {
    console.log("Employee team");
    let myTeam = "";
    let myTeamSize;
    await inquirer.prompt({
            type: "number",
            message: "How many employees on your team?",
            name: "amountTeam"
        })
        .then((data) => {
            myTeamSize = data.amountTeam + 1;
        });
    if (myTeamSize === 0) {
        console.log("There are no employees on your team.");
        return;
    }
    for (i = 1; i < myTeamSize; i++) {
        let name;
        let id;
        let title;
        let email;

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
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```