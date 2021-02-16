const Users = require('../models/users');

module.exports = {
  index(req, res) {
    res.json({ message: 'Koe' });
  },

  async register(req, res) {
    console.log(req.body);
    try {
      const user = await Users.create(req.body);
      return res.send({ user });
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  },
};
