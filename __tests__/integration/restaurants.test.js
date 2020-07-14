const request = require("supertest");
const app = require("../../src/app");
const factory = require("../factories");
const { restaurants } = require('../../src/repositories/restaurants');


beforeEach(async () => {
    // Em um ambiente normal, limparia a base de testes neste evento para evitar que dados de um teste influencie em outro
    restaurants.clear();
})

describe('Restaurantes', () => {
    it('Deve salvar o novo restaurante com informações validas', async () => {
        const restaurant = factory.createRestaurant()
        await request(app)
            .post('/restaurants')
            .set('accept', 'application/json')
            .send(restaurant)
            .expect(201);
    }),
    it('Deve rejeitar o cadastro de restaurantes que não informem o nome do estabelecimento', async () => {
        const restaurant = factory.createRestaurant()
        restaurant.name = ''
        await request(app)
            .post('/restaurants')
            .set('accept', 'application/json')
            .send(restaurant)
            .expect(400);
    }),
    it('Deve retornar uma lista de Restaurantes cadastros', async () => {
        await request(app)
            .get('/restaurants')
            .set('accept', 'application/json')
            .expect(200);
    })

});
