const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const Auth = require('../models/auth');

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
      const token = jwt.sign({ email: user.email, id: user.id }, 'aleatoria');
      const auth = await Auth.create({ token, user: user.id });
      return res.json({ auth: { token: auth.token, user: auth.user } });
    } catch (err) {
      return res.status(400).send({ error: err.message || 'Login failed' });
    }
  },

  async me(req, res) {
    const inputToken = req.body.token;
    const auth = await Auth.findOne({ token: inputToken }).exec();
    const user = await Users.findById(auth.user).exec();
    console.log(auth, user);
    return res.json({ user });
  },
};
