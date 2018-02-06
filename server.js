// Create our application
const express = require('express');
const app = express();

// Setup our application
app.set('port', process.env.PORT || 3001);
app.use(express.static(__dirname + `/public`));

// Load our routes
require('./app/routes')(app); // configure our routes

app.listen(app.get('port'), function appListen() {
  console.log(`js-picam app started! listening on port ${app.get('port')}`);
});

// expose app
exports = module.exports = app;
