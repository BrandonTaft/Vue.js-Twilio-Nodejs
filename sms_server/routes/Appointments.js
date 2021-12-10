'use strict';
const express = require('express');
const router = express.Router();
const moment = require('moment');
const Appointment = require('../models/Appointment');
const repository = require('../repositories/AppointmentRepository');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const bodyParser = require("body-parser");
const client = require("twilio")(accountSid, authToken);
require('dotenv').config()
/* eslint-disable new-cap */


//********************* Middleware *********************//

router.use(bodyParser.urlencoded({
  extended: false
}));

router.use(bodyParser.json());


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
  const twiml = new MessagingResponse();
  console.log(req.body.Body)
  //twiml.message('LEAVE ME ALONE');
  const name = req.body.Body;
  repository.create(name).then((reminder) => {
    res.json(reminder);
  }).catch((error) => console.log(error));
  //res.writeHead(200, { 'Content-Type': 'text/xml' });
  //res.end(twiml.toString());
});


module.exports = router;
