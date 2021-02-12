const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:3000/', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})