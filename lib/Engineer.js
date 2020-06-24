// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
//created engineer class thats an extension of employee
class Engineer extends Employee {
    constructor(name, id, email, GitHub) {
        super(name, id, email);
        this.GitHub = GitHub;
    }
    //returns github username
    getGitHub() {
        return this.GitHub;
    }
    //returns title "engineer"
    getTitle () {
        return "Engineer";
    }
}
module.exports = Engineer;