// TODO, @tests: great post here:
//   https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
//
// look into installing morgan and continue to reference this for testing

const express = require('express');
const cors = require('cors');
const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const connectionString = require('./config/database');

//const favicon = require('serve-favicon');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// APPLICATION SETUP

const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTE SETUP

const camera = require('./routes/camera');
const timeLapses = require('./routes/time-lapses');

app.use('/camera', camera);
app.use('/time-lapses', timeLapses);

// DATABASE SETUP

const mongoose = require('mongoose');
const mongoUrl = require('./config/database').test;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database');
});

// ERROR HANDLING

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
