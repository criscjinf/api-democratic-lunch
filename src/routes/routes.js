const routes = require('express').Router();
const employees_route = require('./partials/_employeesRoute');
const restaurants_route = require('./partials/_restaurantsRoute');
const votings_route = require('./partials/_votingsRoute');
const { next } = require('sucrase/dist/parser/tokenizer');

routes.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


routes.use('/employees', employees_route);
routes.use('/restaurants', restaurants_route);
routes.use('/votings', votings_route);

module.exports = routes