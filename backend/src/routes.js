const express = require('express');
const usersController = require('./controllers/users');

const routes = express.Router();

routes.get('/', (req, res) => res.json({ message: 'It works' }));

routes.post('/register', usersController.register);

routes.post('/login', usersController.login);

routes.get('/me', usersController.me);

module.exports = routes;
