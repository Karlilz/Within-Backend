const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completionProgress: {
    type: Number,
    default: 0,
    max: 100,
  },
  completed: {
    type: Boolean,
    default: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
