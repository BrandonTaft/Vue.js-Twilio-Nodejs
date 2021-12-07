const express = require('express');
const createError = require('http-errors');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const config = require('./config/Config');
const routes = require('./routes/Routes');
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/reminders', routes);
app.use('/', routes);


//******Catch 404 Errors And Forward To Error Handler*****//

app.use((req, res, next) => {
  next(createError(404));
});


//****** Sets Locals, Only Provides Errors In Development *******//

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  //************** Renders Error Page **************//

  res.status(err.status || 500);
  res.render('error');
});




app.listen(config.APP_PORT, () => {
  console.log("Server Is Running on ", config.APP_PORT)
});


module.exports = app;
