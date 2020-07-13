const express = require('express');
const router = express.Router();
var { restaurants, Restaurant } = require('../../repositories/restaurants');

router.get('/', (req, res) => {
    let response = restaurants.filter(el => el.checkFilters(req.query))
    res.status(200).send(response);
});

router.post('/', (req, res) => {
    if (!req.body.name) {
        res.status(400).send('Atenção! O campo name deve ser preenchidos');
    } else {
        let restaurant = restaurants.find( el => el.name === req.body.name)
        if (restaurant) {
            res.status(400).send('Atenção! Já existe um restaurante cadastrado com este nome')
        } else {
            restaurant = new Restaurant(
                req.body.name,
                req.body.address,
                req.body.phone
            );
            res.status(201).json(restaurant);
        };
    }
});

router.put('/:idrestaurant', (req, res) => {
    let restaurant_id = parseInt(req.params.idrestaurant);
    let restaurant = restaurants.find( el => el.id === restaurant_id)
        if (restaurant) {
            res.status(400).send('Erro ao atualizar restaurante! Nenhum restaurante encontrado com o ID informado')
        } else {
            restaurant.updateProps(req.body);
            res.status(201).json(restaurant);
        }
});

router.delete('/', (req, res) => {
    let restaurant_id = parseInt(req.params.idemployer);
    let restaurants = restaurants.find( el => el.id === restaurant_id);
    if (!employer) {
        res.status(400).send('Erro ao excluir restaurante! Nenhum restaurante encontrado com o ID informado');
    } else {
        restaurants = restaurants.filter(el => el.id !== restaurant_id);
        res.status(200).send('Restaurante excluido com sucesso');
    }
});

module.exports = router