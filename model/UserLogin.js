const mongoose = require('../database/connection');

const UserLogInSchema = new mongoose.Schema({
    username: {type: String, required: true, min: 4, unique: true},
    password: {type: String, required:true}
});

const UserLogIn = mongoose.model('UserLogIn', UserLogInSchema);

module.exports = UserLogIn;