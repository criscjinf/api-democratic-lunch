const faker = require("faker-br");
const { Voting } = require("../src/repositories/voting");
const { Employer } = require("../src/repositories/employees");
const { Restaurant } = require("../src/repositories/restaurants");

// Class seguindo o Pattern Factory
const factory = new function () {
    this.createEmployee = function () {
        //Utilizado para executar testes de integração
        let employer = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            cpf: faker.br.cpf()
        };
        return employer
    }

    this.createRestaurant = function () {
        let restaurant = {
            name: faker.company.companyName(),
            address: faker.address.streetAddress(),
            phone: faker.phone.phoneNumber()
        };
        return restaurant
    }

    this.newEmployer = function () {
        //Utilizado para executar teste unitário de votação
        let employer = new Employer(
            faker.name.findName(),
            faker.br.cpf(),
            faker.internet.email()
        );
        return employer
    }

    this.newRestaurant = function () {
        //Utilizado para executar teste unitário de votação
        let restaurant = new Restaurant(
            faker.company.companyName(),
            faker.address.streetAddress(),
            faker.phone.phoneNumber()
        );
        return restaurant
    }

    this.newVoting = function () {
        return new Voting()
    }
}

module.exports = factory;
