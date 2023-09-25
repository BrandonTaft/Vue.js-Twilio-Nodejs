const Appointment = require('../models/Appointment');
require('dotenv').config()
const { Vonage } = require('@vonage/server-sdk')
const vonage = new Vonage({
    apiKey: "2cb606e4",
    apiSecret: "q7uMAqANqgJCSUtC"
})


/********************* CHECKS FOR ITEMS DUE THIS HOUR ********************/

async function checkForNotifications() {
    const time = new Date();
    // const currentHour = time.getHours() + ":" + time.getMinutes();
    const currentHour = time.getHours();
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
        // client.messages.create({
        //     to: process.env.MY_NUMBER,
        //     from: process.env.TWILIO_PHONE_NUMBER,
        //     /* eslint-disable max-len */
        //     body: `DONT FORGET TO ${notification.name}!!! `
        // });
        const from = "15713968152"
        const to = "17706346786"
        const text = notification.name
    await vonage.sms.send({ to, from, text })
        .then(resp => { console.log('Message sent successfully')})
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
        
        console.log("Notification Was Sent for ", notification.name);
    } catch (err) {

        console.error(err);
    }
}

module.exports = {
    checkForNotifications,
};
