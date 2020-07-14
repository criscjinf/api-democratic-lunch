const express = require('express');
const router = express.Router();
const { employees, Employer } = require('../../repositories/employees');

router.get('/', (req, res) => {
    let response = employees.filter(req.query)
    res.status(200).send(response);
});

router.post('/', (req, res) => {
    if (!req.body.name || req.body.name === '' || 
        !req.body.cpf || req.body.cpf === '' ||
        !req.body.email || req.body.email === '') {
        res.status(400).send('Atenção! Os campos name, cpf e email devem ser preenchidos');
    } else {
        let employer = employees.find( el => el.cpf === req.body.cpf)
        if (employer) {
            res.status(400).send('Atenção! Funcionário já cadastrado com este cpf');
        } else {
            employer = new Employer(
                req.body.name,
                req.body.cpf,
                req.body.email
            );
            res.status(201).json(employer);
        }
        
    }
});

router.put('/:idemployer', (req, res) => {
    let employer_id = parseInt(req.params.idemployer);
    let employer = employees.find( el => el.id === employer_id);
    if (!employer) {
        res.status(400).send('Erro ao atualizar funcionário! Nenhum funcionário encontrado com o ID informado');
    } else {
        employer.updateProps(req.body);
        res.status(200).json(employer);
    }
});

router.delete('/:idemployer', (req, res) => {
    let employer_id = parseInt(req.params.idemployer);
    let employer = employees.find( el => el.id === employer_id);
    if (!employer) {
        res.status(400).send('Erro ao excluir funcionário! Nenhum funcionário encontrado com o ID informado');
    } else {
        employees = employees.remove(employer_id);
        res.status(200).send('Funcionário excluido com sucesso');
    }
});

router.delete('/', (req, res) => {
    employees.clear();
    res.status(200).send('Funcionários excluidos com sucesso');
});

module.exports = router