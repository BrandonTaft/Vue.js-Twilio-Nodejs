const app = require('express')();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000
const twilio = require('twilio');
const accountSid = proccess.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

require('dotenv').config()

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hello Twilio"
  });
});

app.post("/send-message", async(req, res) => {
    try {
      let response = await client.messages.create({
        body: req.body.message,
        from: process.env.TWILIO_NUMBER,
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




app.listen(PORT, () => {
  console.log(`App is runing on port ${PORT}`);
});