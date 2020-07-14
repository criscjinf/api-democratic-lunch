const request = require("supertest");
const app = require("../../src/app");
const factory = require("../factories");
const { employees } = require('../../src/repositories/employees');


describe('Funcionarios', () => {
    it('Deve salvar o funcionário com informações validas', async () => {
        employees.length = 0
        const employer = factory.createEmployee()
        await request(app)
            .post('/employees')
            .set('accept', 'application/json')
            .send(employer)
            .expect(201);
    }),
    it('Deve rejeitar cadastro de funcionário com falta de informação de CPF', async () => {
        employees.length = 0;
        const employer = factory.createEmployee()
        employer.cpf = ''
        await request(app)
            .post('/employees')
            .set('accept', 'application/json')
            .send(employer)
            .expect(400);
    }),
    it('Deve retornar uma lista de usuarios cadastros', async () => {
        await request(app)
            .get('/employees')
            .set('accept', 'application/json')
            .expect(200);
    })

});
