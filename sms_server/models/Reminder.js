const mongoose = require('mongoose');



// Defines schema for reminders items
const Schema = new mongoose.Schema({
  name: {
    type: String,
  },
  done: {
    type: Boolean,
  },
});

const Reminder = mongoose.model('Reminder', Schema);



module.exports = Reminder;