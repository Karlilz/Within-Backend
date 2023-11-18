const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User', 
  //   // required: true,
  // },
  content: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
