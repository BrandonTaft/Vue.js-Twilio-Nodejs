const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const config = require('./config/Config');
const appointments = require('./routes/Appointments');
const app = express();

require('dotenv').config()


//************* Create Database Connection ************//

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//******************** Middleware *******************//

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.use('/', appointments);

//******Catch 404 Errors And Forward To Error Handler*****//

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//************** Handles And Renders Error Page **************//

app.use(function(err, req, res, next) {
  if (err.status !== 404) {
    console.error(err);
  }

});



  

module.exports = app;
