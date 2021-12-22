'use strict';
const express = require('express');
const session = require('express-session');
const moment = require('moment');
const Appointment = require('../models/Appointment');
const repository = require('../repositories/AppointmentRepository');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const client = require("twilio")(accountSid, authToken);
const twimlGenerator = require('../lib/twiml-generator');
const finder = require('../lib/finder')
require('dotenv').config()
/* eslint-disable new-cap */


//********************* Middleware *********************//
const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(bodyParser.json());
router.use(cookieParser());
router.use(session({
    secret: 'SECRETKEY',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//*********** Get All Items From The Database ***********//

router.get('/', function (req, res, next) {
    repository.findAll().then(function (appointments) {
        res.json(appointments);
    }).catch((error) => console.log(error));
});


//************* Add Items To The Database **************//

router.post('/', function (req, res, next) {
    const name = req.body.name;
    const notification = req.body.notification;
    const time = moment(req.body.time, 'YYYY-MM-DD hh:mma');
    const appointment = new Appointment({
        name: name,
        notification: parseInt(notification)
    })

    appointment.save().then(function () {
        res.redirect('/');
        console.log(appointment);
    }).catch((error) => console.log(error));
});


//*********** Update Items In The Database *************//

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const reminder = { name: req.body.name, done: req.body.done };
    repository.updateById(id, reminder)
        .then(res.status(200).json([]))
        .catch((error) => console.log(error));
});


//*********** Delete Item From The Database *************//

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    repository.deleteById(id).then((ok) => {
        console.log(ok);
        console.log(`Deleted record with id: ${id}`);
        res.status(200).json([]);
    }).catch((error) => console.log(error));
});


//****************** Deliver Message *******************//

router.post("/send-message", async (req, res) => {
    try {
        let response = await client.messages.create({
            body: req.body.message,
            from: phoneNumber,
            to: req.body.to
        })

        res.status(200).json({
            response: response,
            message: `Message Sent To ${req.body.to}`
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            Error: err
        })
    }
})


//******* Recieve Message And Send Auto Response ********//

router.post('/sms', (req, res) => {
    try {
        var body = req.body.Body;
        if (req.session.update !== undefined && !isNaN(body)) {
            const id = req.session.update;
            const name = req.session.nameToBeUpdated;
            if (body == 1) {
                repository.deleteById(id).then((ok) => {
                    console.log(`Deleted record with id: ${id}`);
                    const message = `${name} has been deleted.`
                    const twiml = new MessagingResponse();
                    twiml.message(message);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString())
                }).catch((error) => console.log(error));
            } else if (body == 2) {
                const reminder = { done: true };
                repository.updateById(id, reminder).then(() => {
                    const message = `${name} was marked as complete.`
                    const twiml = new MessagingResponse();
                    twiml.message(message);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString())
                }).catch((error) => console.log(error));
            } else if (body == 3) {
                req.session.update = undefined
                req.session.notify = true
                const message = "When should I Remind you?"
                const twiml = new MessagingResponse();
                twiml.message(message);
                res.writeHead(200, { 'Content-Type': 'text/xml' });
                res.end(twiml.toString())
            } else {
                const message = "Must choose between 1 and 3 "
                const twiml = new MessagingResponse();
                twiml.message(message);
                res.writeHead(200, { 'Content-Type': 'text/xml' });
                res.end(twiml.toString())
            }
        } else if (req.session.notify == true) {
            const reminder = { name: req.session.nameToBeUpdated, notification: body };
            var due = moment(reminder.notification,'HH').format('HH:mm');
            repository.updateByName(req.session.nameToBeUpdated, reminder)
            .then(() => {
                const message = `Ok, I will notify you at ${due} `
                const twiml = new MessagingResponse();
                twiml.message(message);
                res.writeHead(200, { 'Content-Type': 'text/xml' });
                res.end(twiml.toString())
            }).catch((error) => console.log(error));
        } else {
            //Creates a session to track number of texts from user
            //Sets the reply message depending on how many times user has texted
            const smsCount = req.session.counter || 0;
            let message = `Hello, I've added **${body}** to the list for you!`;
            if (smsCount > 0) {
                message = `Welcome Back! I've added **${body}** to the list for you!`;
            }
            req.session.counter = smsCount + 1;

            finder.findByName(body, function (err, reminders) {
                if (reminders.length === 0) {
                    twimlGenerator.notFound(body)
                    const twiml = new MessagingResponse();
                    twiml.message(message);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString())
                } else {
                    let update = reminders[0]._id;
                    let nameToBeUpdated = reminders[0].name;
                    req.session.update = update;
                    req.session.nameToBeUpdated = nameToBeUpdated;
                    res.send(twimlGenerator.singleReminder(reminders[0]).toString());
                }

            })
        }
    } catch (error) { console.log(error) };
})

module.exports = router;