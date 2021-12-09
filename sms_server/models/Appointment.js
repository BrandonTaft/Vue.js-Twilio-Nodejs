const mongoose = require('mongoose');




// Defines schema for Appointments
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
});

const Appointment = mongoose.model('Appointment', Schema);

module.exports = Appointment;