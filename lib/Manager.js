// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
//created manager class thats an extension of employee
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    //returns office number
    getofficeNumber() {
        return this.officeNumber;
    }
    //returns title "manager"
    getTitle () {
        return "Manager"
    }
}
module.exports = Manager;