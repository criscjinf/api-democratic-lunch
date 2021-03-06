const express = require('express');
const router = express.Router();
const { restaurants } = require('../../repositories/restaurants');
const { votings } = require('../../repositories/voting');
const { employees } = require('../../repositories/employees');

router.get('/', (req, res) => {
    res.status(200).send(votings);
});

router.get('/currentvoting', (req, res) => {
    res.status(200).send(votings.currentVoting());
});

router.post('/newvoting', (req, res) => {
    if (restaurants.length === 0) {
        res.status(400).send('Erro ao iniciar votação! Necessário cadastrar restaurantes antes de iniciar uma votação')
    } else {
        try{
            res.status(201).send(votings.newVoting());
        }
        catch(error) {
            res.status(400).send(`${error}`)
        }
    }
});

router.post('/endvoting', async (req, res) => {
    let voting = votings.currentVoting();
    if (voting && !voting.votingClosed) {
        res.status(201).send( await voting.endVoting());
    } else {
        res.status(400).send('Votação já encerrada anteriormente')
    };
});

router.post('/:idvoting/vote', async (req, res) => {
    if (!req.body.restaurant_id || !req.body.employer_id) {
        res.status(400).send('Erro ao registrar voto! Os campos restaurant_id e employer_id devem ser preenchidos');
    } else {
        let employer = employees.find(el => el.id === parseInt(req.body.employer_id))
        if (!employer) {
            res.status(400).send('Erro ao registrar voto! Funcionario não encontrado')
        } else {
            let voting = votings.find(parseInt(req.params.idvoting))
            if (!voting) {
                res.status(400).send('Erro ao registrar voto! ID de votação não localizado')
            } else {
                try {
                    await voting.registerVote(employer, parseInt(req.body.restaurant_id))
                    res.status(201).send('Voto registrado com sucesso');
                } catch (error) {
                    res.status(400).send(`${error}`)
                }
            }
        }
    }
});

router.delete('/', (req, res) => {
    votings.clear();
    res.status(200).send('Votações apagadas da base de dados');
});


module.exports = router