const app = require('express')();
const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000
const twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const { MongoClient } = require('mongodb');

require('dotenv').config()
const client = require("twilio")(accountSid, authToken);

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hey"
  });
});

app.post("/send-message", async (req, res) => {
  try {
    let response = await client.messages.create({
      body: req.body.message,
      from: process.env.TWILIO_PHONE_NUMBER,
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
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  console.log(req.body.Body)
  twiml.message('LEAVE ME ALONE');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});




async function main() {

  const uri = "mongodb+srv://Brandon:Zxcvbnm13579@checklist.za5qv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
    await listReminders(client);
    await createReminder(client,
      {
        name: "Check Email",
        priority: "High",
        date: 11 / 30 / 21
      }
    );

    await findOneReminderByName(client, "Check Email");

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);


async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


async function createReminder(client, newReminder) {
  const result = await client.db("MyDB").collection("Reminders").insertOne(newReminder);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function findOneReminderByName(client, nameOfReminder) {
  const result = await client.db("MyDB").collection("Reminders").findOne({ name: nameOfReminder });

  if (result) {
    console.log(`Found a Reminder in the collection with the name '${nameOfReminder}':`);
    console.log(result);
  } else {
    console.log(`No Reminders found with the name '${nameOfReminder}'`);
  }
}

// async function findAllReminders(client) {
// const newResult = client.db("MyDB").collection("Reminders").find();
// console.log("look :", newResult)

async function listReminders(client) {
  reminderList = await client.db("MyDB").collection("Reminders").find();
  
  console.log("The Reminders:");
  reminderList.forEach(db => console.log(` - ${db.name}`));
};

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

// app.listen(PORT, () => {
//   console.log(`App is runing on port ${PORT}`);
// });