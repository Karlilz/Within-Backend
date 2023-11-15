// Assuming you have already imported necessary modules and models

const JournalEntry = require('../model/JournalEntry');

const journalController = {
  getEntries: async (req, res) => {
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
  },

  addEntry: async (req, res) => {
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
  },
};

module.exports = journalController;
