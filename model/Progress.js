// Import the necessary modules
const mongoose = require('mongoose');
const User = require('./User');

// Define the Progress schema
const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  confidenceScore: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create the Progress model
const Progress = mongoose.model('Progress', progressSchema);

// Export the Progress model
module.exports = Progress;
