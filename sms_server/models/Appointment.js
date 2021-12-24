const mongoose = require('mongoose');


// Create collection of Appointments
const Schema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber:{
    type: String,
  },
  notification:{
    type: String,
  },
  timeZone:{
    type: String,
  },
  time:{
    type:Date,
  },
  done: {
    type: Boolean,
  },
  priority:{
    type: String,
  },
});

const Appointment = mongoose.model('Appointment', Schema);

module.exports = Appointment;