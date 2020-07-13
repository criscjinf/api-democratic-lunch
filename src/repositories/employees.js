import ObjectBase from '../classes/objectBase'
var employees = []
class Employer extends ObjectBase {
    constructor (name, cpf, email) {
        super (
            employees,
            ['locked']
        );
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.locked = false;
    }
}

module.exports = {employees, Employer}