const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
require('dotenv').config();

app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => {
  console.log('Success!!')
})