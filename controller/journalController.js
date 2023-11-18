const express = require('express');
const router = express.Router();
const JournalEntry = require('../model/JournalEntry');

// INDEX ROUTE
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await JournalEntry.find({ user: userId });
    res.json(entries);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE ROUTE
router.delete("/:id", async (req, res) => {
  try {
    // const userId = req.user.id;
    // const entry = await JournalEntry.findOneAndDelete({ _id: req.params.id, user: userId });
    const entry = await JournalEntry.findOneAndDelete({ _id: req.params.id});
    res.json(entry);
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
});

// UPDATE ROUTE 
router.put('/:id', async (req, res) => {
  try {
    // const userId = req.user.id;
    // const entry = await JournalEntry.findOne({ _id: req.params.id, user: userId });
    const entry = await JournalEntry.findOne({ _id: req.params.id});


    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    entry.title = req.body.title;
    entry.content = req.body.content;
    entry.date = req.body.date;

    await entry.save();

    res.status(200).json(entry);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

// CREATE ROUTE
router.post("/", async (req, res) => {
  try {
    // const userId = req.user.id;

    // req.body.user = userId;

    let response = await JournalEntry.create(req.body);
    res.json(response);
  } catch (error) {
    console.log(error)
    res.status(400).json(error);

  }
});

// SHOW ROUTE
router.get("/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const entry = await JournalEntry.findOne({ _id: req.params.id, user: userId });
    res.json(entry);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
