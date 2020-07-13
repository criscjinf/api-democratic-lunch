const request = require("supertest");
const app = require("../../src/app");
const factory = require("../factories");
const { restaurants } = require('../../src/repositories/restaurants');
const { employees } = require('../../src/repositories/employees');
const { votings } = require('../../src/repositories/voting');


const votingTest = async (employer_id, restaurant_id, status_expect) => {
    let vote = {
        restaurant_id: restaurant_id,
        employer_id: employer_id
    };
    let voting = factory.newVoting();
    await request(app)
        .post(`/votings/${voting.id}/vote`)
        .set('accept', 'application/json')
        .send(vote)
        .expect(status_expect);

    voting.endVoting();
};

describe('Votando no mesmo resutaurante dois dias seguidos', () => {
    it('Não deve permitir votar mais de uma vez na semana no mesmo restaurante', async () => {
        let voted_restaurant = factory.newRestaurant();
        let employer1 = factory.newEmployer()
        let employer2 = factory.newEmployer();
        factory.newRestaurant();
        factory.newRestaurant();

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
    })

});
