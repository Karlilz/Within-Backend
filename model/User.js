const mongoose = require('../database/connection');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4, 
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;
