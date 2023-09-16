'use strict';
const express = require('express');
const session = require('express-session');
const { Vonage } = require('@vonage/server-sdk')
const moment = require('moment');
const Appointment = require('../models/Appointment');
const repository = require('../repositories/AppointmentRepository');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const finder = require('../lib/finder')
require('dotenv').config()

const vonage = new Vonage({
    apiKey: "2cb606e4",
    apiSecret: "q7uMAqANqgJCSUtC"
})



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
    const appointment = new Appointment({
        name: name,
        notification: notification,
    })

    appointment.save().then(function () {
        res.redirect('/');
        console.log(appointment);
    }).catch((error) => console.log(error));
});


//*********** Update Item In The Database *************//

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const reminder = { name: req.body.name, done: req.body.done, notification: req.body.notification };
    repository.updateById(id, reminder)
        .then(res.status(200).json([]))
        .catch((error) => console.log(error));
});


//*********** Set Reminder Priority *************//

router.put('/priority/:id', (req, res) => {
    const { id } = req.params;
    const reminder = { priority: req.body.priority };
    repository.setPriority(id, reminder)
        .then(res.status(200).json([]))
        .catch((error) => console.log(error));
});



//*********** Update All Items In Db / Mark All As Incomplete/ E.O.D. Refresh *************//

router.put('/', (req, res) => {
    const reminder = { done: false };
    repository.updateAll()
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
        const from = "15713968152"
        const to = "+17706346786"
        const text = req.body.message

        async function sendSMS() {
            await vonage.sms.send({ to, from, text })
                .then(resp => { console.log('Message sent successfully'); console.log(resp); })
                .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
        }

        sendSMS();

        res.status(200).json({
                        message: `Message Sent To ${req.body.to}`
                    })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            Error: err
        })
    }
})

router.get("/sms", async (req, res) => {
    console.log("test", req.query)
    async function sendSMS() {
        const from = "15713968152"
        const to = "+17706346786"
        const text = "okie dokie"
        await vonage.sms.send({ to, from, text })
            .then(resp => { console.log('Message sent successfully'); console.log(res); })
            .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
    }

    sendSMS();
    res.status(200).json({
        message: `Message Sent To ${req.body.to}`
    })
})


//******* Recieve Message And Send Auto Response ********//

// router.post('/sms', (req, res) => {
//     try {
//         var body = req.body.Body;
//         if (req.session.update !== undefined && !isNaN(body)) {
//             const id = req.session.update;
//             const name = req.session.nameToBeUpdated;
//             if (body == 1) {
//                 repository.deleteById(id).then((ok) => {
//                     console.log(`Deleted record with id: ${id}`);
//                     const message = `${name} has been deleted.`
//                     const twiml = new MessagingResponse();
//                     twiml.message(message);
//                     res.writeHead(200, { 'Content-Type': 'text/xml' });
//                     res.end(twiml.toString())
//                 }).catch((error) => console.log(error));
//             } else if (body == 2) {
//                 const reminder = { done: true };
//                 repository.updateById(id, reminder).then(() => {
//                     const message = `${name} was marked as complete.`
//                     const twiml = new MessagingResponse();
//                     twiml.message(message);
//                     res.writeHead(200, { 'Content-Type': 'text/xml' });
//                     res.end(twiml.toString())
//                 }).catch((error) => console.log(error));
//             } else if (body == 3) {
//                 req.session.update = undefined
//                 req.session.notify = true
//                 const message = "When should I Remind you?"
//                 const twiml = new MessagingResponse();
//                 twiml.message(message);
//                 res.writeHead(200, { 'Content-Type': 'text/xml' });
//                 res.end(twiml.toString())
//             } else {
//                 const message = "Must choose between 1 and 3 "
//                 const twiml = new MessagingResponse();
//                 twiml.message(message);
//                 res.writeHead(200, { 'Content-Type': 'text/xml' });
//                 res.end(twiml.toString())
//             }
//         } else if (req.session.notify == true) {
//             const reminder = { name: req.session.nameToBeUpdated, notification: body };
//             var due = moment(reminder.notification,'HH').format('HH:mm');
//             repository.updateByName(req.session.nameToBeUpdated, reminder)
//             .then(() => {
//                 const message = `Ok, I will notify you at ${due} `
//                 const twiml = new MessagingResponse();
//                 twiml.message(message);
//                 res.writeHead(200, { 'Content-Type': 'text/xml' });
//                 res.end(twiml.toString())
//                 session_destroy();
//             }).catch((error) => console.log(error));
//         } else {
//             //Creates a session to track number of texts from user
//             //Sets the reply message depending on how many times user has texted
//             const smsCount = req.session.counter || 0;
//             let message = `Hello, I've added **${body}** to the list for you!`;
//             if (smsCount > 0) {
//                 message = `Welcome Back! I've added **${body}** to the list for you!`;
//             }
//             req.session.counter = smsCount + 1;

//             finder.findByName(body, function (err, reminders) {
//                 if (reminders.length === 0) {
//                     twimlGenerator.notFound(body)
//                     const twiml = new MessagingResponse();
//                     twiml.message(message);
//                     res.writeHead(200, { 'Content-Type': 'text/xml' });
//                     res.end(twiml.toString())
//                 } else {
//                     let update = reminders[0]._id;
//                     let nameToBeUpdated = reminders[0].name;
//                     req.session.update = update;
//                     req.session.nameToBeUpdated = nameToBeUpdated;
//                     res.send(twimlGenerator.singleReminder(reminders[0]).toString());
//                 }

//             })
//         }
//     } catch (error) { console.log(error) };
// })

module.exports = router;