const express = require('express');
const user = require('./models/users');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({message: 'It works'})
});

routes.post('/users', user)

module.exports = routes;