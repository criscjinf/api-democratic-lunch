const request = require("supertest");
const app = require("../../src/app");
const factory = require("../factories");
const { votings } = require("../../src/repositories/voting");
const { response } = require("../../src/app");

beforeEach(async () => {
    // Em um ambiente normal, limparia a base de testes neste evento para evitar que dados de um teste influencie em outro
    votings.clear();
})

const votingTest = async (employer_id, restaurant_id, status_expect) => {
    let vote = {
        restaurant_id: restaurant_id,
        employer_id: employer_id
    };
    let voting = factory.newVoting();// Força a criação de uma nova votação 
    await request(app)
        .post(`/votings/${voting.id}/vote`)
        .set('accept', 'application/json')
        .send(vote)
        .expect(status_expect);

    await voting.endVoting();
};

describe('Votação', () => {
    it('Não deve permitir votar mais de uma vez na semana no mesmo restaurante', async () => {
        let voted_restaurant = factory.newRestaurant();
        let employer1 = factory.newEmployer()
        let employer2 = factory.newEmployer();
        factory.newRestaurant();
        factory.newRestaurant();
        factory.newRestaurant();
        votings.clear();
        await votingTest(
            employer1.id,
            voted_restaurant.id,
            201
        );

        await votingTest(
            employer2.id,
            voted_restaurant.id,
            400
        );
    });

});
