const request = require("supertest");
const app = require("../../src/app");
const factory = require("../factories");
const { restaurants } = require('../../src/repositories/restaurants');
const { employees } = require('../../src/repositories/employees');
const { votings } = require('../../src/repositories/voting');


beforeEach(async () => {
    // Em um ambiente normal, limparia a base de testes neste evento para evitar que dados de um teste influencie em outro
    restaurants.length = 0;
    employees.length = 0;
    votings.deleteAll();
})

describe('Funcionarios Votando', () => {
    it('Não deve permitir votar mais de uma vez ao dia', async () => {
        let voted_restaurant = factory.newRestaurant();
        let employer = factory.newEmployer();
        factory.newRestaurant();//Somente adicionando mais um restaurante a votação
        let voting = factory.newVoting();
        let vote = {
            restaurant_id: voted_restaurant.id,
            employer_id: employer.id
        }
        await request(app)
            .post(`/votings/${voting.id}/vote`)
            .set('accept', 'application/json')
            .send(vote)
            .expect(201)

        await request(app)
            .post(`/votings/${voting.id}/vote`)
            .set('accept', 'application/json')
            .send(vote)
            .expect(400);
    })

});
