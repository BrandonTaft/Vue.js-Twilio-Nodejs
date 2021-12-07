const express = require('express');
const app = express.Router();
const repository = require('../repositories/ReminderRepository');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const bodyParser = require("body-parser");
const client = require("twilio")(accountSid, authToken);
require('dotenv').config()


//********************* Middleware *********************//

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


//*********** Get All Items From The Database ***********//

app.get('/', (req, res) => {
  repository.findAll().then((Reminders) => {
    res.json(Reminders);
  }).catch((error) => console.log(error));
});


//************* Add Items To The Database **************//

app.post('/', (req, res) => {
  const { name } = req.body;
  repository.create(name).then((reminder) => {
    res.json(reminder);
  }).catch((error) => console.log(error));
});


//*********** Delete Item From The Database *************//

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  repository.deleteById(id).then((ok) => {
    console.log(ok);
    console.log(`Deleted record with id: ${id}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});


//*********** Update Items In The Database *************//

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const reminder = { name: req.body.name, done: req.body.done };
  repository.updateById(id, reminder)
    .then(res.status(200).json([]))
    .catch((error) => console.log(error));
});


//****************** Deliver Message *******************//

app.post("/send-message", async (req, res) => {
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

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  console.log(req.body.Body)
  //twiml.message('LEAVE ME ALONE');
  const  name  = req.body.Body;
     repository.create(name).then((reminder) => {
       res.json(reminder);
     }).catch((error) => console.log(error));
  //res.writeHead(200, { 'Content-Type': 'text/xml' });
  //res.end(twiml.toString());
});
// app.post('/', (req, res) => {
//   const { name } = req.body;
//   repository.create(name).then((reminder) => {
//     res.json(reminder);
//   }).catch((error) => console.log(error));
// });

module.exports = app;
