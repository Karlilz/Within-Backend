const express = require('express');
const router = express.Router();
const JournalEntry = require('../model/JournalEntry');

// INDEX ROUTE 
router.get('/', async (req, res) => {
  try {
    // Assuming you have implemented user authentication middleware
    const userId = req.user._id;

    // Retrieve mood journal entries for the specific user
    const entries = await JournalEntry.find({ user: userId }).sort({ date: 'desc' });

    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// NEW ROUTE

// DELETE ROUTE 
router.delete('/:id', async (req, res) => {
  try {
    // Assuming you have implemented user authentication middleware
    const userId = req.user._id;

    // Delete the mood journal entry for the user
    const deletedEntry = await JournalEntry.findOneAndDelete({ _id: req.params.id, user: userId });

    if (!deletedEntry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.status(200).json({ message: 'Journal entry deleted successfully', entry: deletedEntry });
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE ROUTE 
router.put('/:id', async (req, res) => {
  try {
    // Assuming you have implemented user authentication middleware
    const userId = req.user._id;

    const { content } = req.body;

    // Update the mood journal entry for the user
    const updatedEntry = await JournalEntry.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { content },
      { new: true } // Return the updated entry
    );

    if (!updatedEntry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.status(200).json({ message: 'Journal entry updated successfully', entry: updatedEntry });
  } catch (error) {
    console.error('Error updating journal entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// CREATE ROUTE 
router.post('/', async (req, res) => {
  try {
    // Assuming you have implemented user authentication middleware
    const userId = req.user._id;

    const { content } = req.body;

    // Create a new mood journal entry
    const newEntry = new JournalEntry({
      content,
      user: userId,
      date: new Date(), // You can customize the date format based on your preference
    });

    // Save the entry to the database
    await newEntry.save();

    res.status(201).json({ message: 'Journal entry added successfully', entry: newEntry });
  } catch (error) {
    console.error('Error adding journal entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// EDIT ROUTE

// SHOW ROUTE
router.get('/:id', async (req, res) => {
  try {
    // Assuming you have implemented user authentication middleware
    const userId = req.user._id;

    // Retrieve the specific mood journal entry for the user
    const entry = await JournalEntry.findOne({ _id: req.params.id, user: userId });

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error('Error fetching journal entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
