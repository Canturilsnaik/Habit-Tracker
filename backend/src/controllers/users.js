const bcrypt = require('bcrypt');
const Users = require('../models/users');

module.exports = {
  index(req, res) {
    res.json({ message: 'Koe' });
  },

  async register(req, res) {
    try {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      const { email, id } = await Users.create({
        ...req.body,
        password: encryptedPassword,
      });
      return res.status(201).json({ user: { email, id } });
    } catch (err) {
      return res.status(400).json({ error: err.message || 'Registration failed' });
    }
  },

  async login(req, res) {
    try {
      const user = await Users.findOne({ email: req.body.email }).select('+password').exec();
      if (!user) throw new Error('usuario não existe');
      const result = await bcrypt.compare(req.body.password, user.password);
      if (!result) throw new Error('senha incorreta');
      return res.json({ user: { email: user.email, id: user.id } });
    } catch (err) {
      return res.status(400).send({ error: err.message || 'Login failed' });
    }
  },
};
