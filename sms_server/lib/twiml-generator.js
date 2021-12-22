'use strict';
const repository = require('../repositories/AppointmentRepository');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
//***********USE TWILIO NODE HELPER LIBRARY TO EASILY CREATE RESPONSES********* */


// Create response for when no results are found
var tryAgain = function () {
  var resp = new MessagingResponse();
  resp.message('I think you forgot something!');
  return resp;
};

// If no results are found create a new reminder
function notFound(body) {
  var name = body;
  repository.create(name);
  return name
}

// Sets Response for when we do find a match for the query
// Response includes the matching reminder's name, notification time and if its complete or not
var singleReminder = function (reminder) {
  var resp = new MessagingResponse();
  var message = resp.message();
  message.body(
  `${reminder.name}\n${reminder.notification}\n${reminder.done} 
  Reply 
  1 Delete 
  2 Mark As Done
  3 Add Notification`);
  //message.media(reminder.imageUrl);
  return resp;
}

module.exports.tryAgain = tryAgain;

module.exports.notFound = notFound;

module.exports.singleReminder = singleReminder;