// TODO: Write code to define and export the Employee class
//created a employee class
class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    //returns name of employee
    getName(){
        return this.name;
    }
    //returns id of employee
    getId(){
        return this.id;
    }
    //returns email of employee
    getEmail() {
        return this.email;
    }
}
module.exports = Employee;