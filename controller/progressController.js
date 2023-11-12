// Import necessary modules
const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// Method: Get Progress
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Retrieve progress data for the specified user
    const userProgress = await Progress.find({ user: userId });

    if (!userProgress) {
      return res.status(404).json({ message: 'Progress data not found for the user' });
    }

    // Return the progress data
    res.status(200).json(userProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Method: Update Progress
router.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { confidenceScore, otherMetric } = req.body;

  try {
    // Find the progress data for the specified user
    let userProgress = await Progress.findOne({ user: userId });

    // If no progress data exists, create a new entry
    if (!userProgress) {
      userProgress = new Progress({ user: userId });
    }

    // Update the progress data
    userProgress.confidenceScore = confidenceScore || userProgress.confidenceScore;
    userProgress.otherMetric = otherMetric || userProgress.otherMetric;

    // Save the updated progress data
    await userProgress.save();

    // Return the updated progress data
    res.status(200).json(userProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
