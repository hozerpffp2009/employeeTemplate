// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
//created a intern class which is an extension of employee
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    //returns school for intern
    getschool() {
        return this.school;
    }
     //returns title "intern"
    getTitle () {
        return "Intern"
    }
}
module.exports = Intern;