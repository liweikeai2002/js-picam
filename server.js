// server.js

// initial server based on this handy post: http://www.programwitherik.com/setup-your-ember-project-with-node/

// modules
var express        = require('express');
var app            = express();

// set our port
var port = process.env.PORT || 3000;

// set the static files location
app.use(express.static(__dirname + '/public/ui'));

require('./app/routes')(app); // configure our routes

// startup our app at http://localhost:3000
app.listen(port);

// expose app
exports = module.exports = app;
