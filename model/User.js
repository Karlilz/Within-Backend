// const mongoose = require('../database/connection');

// const UserLogInSchema = new mongoose.Schema({
//     username: {type: String, required: true, min: 4, unique: true},
//     password: {type: String, required:true}
// });

// const UserLogIn = mongoose.model('UserLogIn', UserLogInSchema);

// module.exports = UserLogIn;



const mongoose = require('../database/connection');
const bcrypt = require('bcrypt');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4, // Adjust as needed
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;

  // Hash the password only if it's modified or a new user
  if (!user.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Salt factor: 10
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
