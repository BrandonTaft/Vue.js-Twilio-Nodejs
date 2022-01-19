const Appointment = require('../models/Appointment');
require('dotenv').config()
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


/********************* CHECKS FOR ITEMS DUE THIS HOUR ********************/

async function checkForNotifications() {
    const time = new Date();
    const currentHour = time.getHours() + ":" + time.getMinutes();
    const appointmentsDue = await Appointment.find({

        notification: currentHour

    })
    console.log("current Hour", currentHour)
    console.log("Sending", appointmentsDue.length, "Notifications")
    for (var notification of appointmentsDue) {
        sendNotification(notification)
    }
}

/********************* CREATES MESSAGE AND SENDS IT ********************/

//Phone numbers are hard coded in env file for now

async function sendNotification(notification) {
    try {
        client.messages.create({
            to: process.env.MY_NUMBER,
            from: process.env.TWILIO_PHONE_NUMBER,
            /* eslint-disable max-len */
            body: `DONT FORGET TO ${notification.name}!!! `
        });
        console.log("Notification Was Sent for ", notification.name);
    } catch (err) {

        console.error(err);
    }
}

module.exports = {
    checkForNotifications,
};
