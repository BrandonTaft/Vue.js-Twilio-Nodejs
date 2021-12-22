'use strict';

var Reminder = require('../models/Appointment');

//Search DB for Reminder by name
//If it cant find the name it creates a new reminder
var findByName = function (body, callback) {
  Reminder.find({
    name: {
      $regex: body, $options: "i"
    }
  }, callback);
};


module.exports.findByName = findByName;
