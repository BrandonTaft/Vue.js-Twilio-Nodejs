'use strict';

var Reminder = require('../models/Appointment');

//Search DB for Reminder by name
//This can return multiples 
var findByName = function(name, callback) {
  Reminder.find({
    "name": {
      "$regex": name, "$options": "i"
    }
  }, callback).sort("name");
};

// If multiples are returned a message with the options will be sent
// Once the user selects and sends back the number corresponding with the specific employee id
// Will Search DB for employee by I.D., then send the employee info
var findById = function(id, callback) {
  Reminder.findOne({
    "_id": id
  }, callback);
};

module.exports.findByName = findByName;

module.exports.findById = findById;