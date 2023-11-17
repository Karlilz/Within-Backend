const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('./User'); 

const journalEntrySchema = new mongoose.Schema({
  title: {
    type:String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User', 
  //   // required: true,
  // },
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = JournalEntry;
