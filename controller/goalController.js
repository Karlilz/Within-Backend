// Import necessary modules and models
const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal'); // Import your Goal model

// Get Goals: Retrieve confidence-related goals for the user
router.get('/goals', async (req, res) => {
  try {
    // Assuming you have user authentication middleware that attaches the user ID to the request
    const userId = req.user.id;

    // Fetch goals from the database for the authenticated user
    const goals = await Goal.find({ userId });

    res.status(200).json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add Goal: Allow users to set new goals
router.post('/goals', async (req, res) => {
  try {
    // Assuming you have user authentication middleware that attaches the user ID to the request
    const userId = req.user.id;

    // Extract goal data from the request body
    const { content, dueDate } = req.body;

    // Create a new goal instance
    const newGoal = new Goal({
      content,
      dueDate,
      userId,
    });

    // Save the goal to the database
    await newGoal.save();

    res.status(201).json(newGoal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update Goal: Enable users to update their goal progress
router.put('/goals/:id', async (req, res) => {
  try {
    // Extract goal ID from the request parameters
    const goalId = req.params.id;

    // Find the goal in the database
    const goal = await Goal.findById(goalId);

    // Check if the goal exists
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Assuming you have user authentication middleware that attaches the user ID to the request
    const userId = req.user.id;

    // Check if the authenticated user owns the goal
    if (goal.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access to the goal' });
    }

    // Update goal progress (you may have other fields to update as well)
    goal.progress = req.body.progress;

    // Save the updated goal to the database
    await goal.save();

    res.status(200).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;
