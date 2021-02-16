const mongoose = require('mongoose');
const users = require('../models/users');

module.exports = {
  index(req, res) {
    res.json({message: 'Koe'})
  },

 async login(req, res) {
    const { email, password } = req.body;

    let user = await users.findOne({ email });

    if(!user) {
      return res.status(400).send({error: 'User not found'});
    }

    res.send({ user })
  }
}