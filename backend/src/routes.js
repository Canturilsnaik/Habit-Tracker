const express = require('express');
// const user = require('./controller/users_controller');
// const express = require('express');
const users_controller = require('./controllers/users_controller');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({message: 'It works'})
});

routes.post('/users', (req, res) => {
  res.send(users_controller)
})

module.exports = routes;