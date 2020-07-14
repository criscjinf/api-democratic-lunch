const ObjectBase = require('../classes/objectBase');
const ObjectList = require('../classes/objectList');

const employees = new ObjectList();
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