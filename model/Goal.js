// Import necessary modules
const mongoose = require('mongoose');

// Define the Goal schema
const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for associating goals with users
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
  progress: {
    type: Number,
    default: 0, // Default progress value, can be updated as the user makes progress
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

// Create the Goal model using the schema
const Goal = mongoose.model('Goal', goalSchema);

// Export the Goal model
module.exports = Goal;
