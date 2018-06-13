const mongoose = require('mongoose');
const schema = require('./schema');

schema.methods.run = function() {
  // TODO: implement run functionality
  //
  // this will initialize a python bin script that will capture images
}

schema.methods.pause = function() {
  // TODO: implement pause functionality
  //
  // this will cause this timeLapse to pause its capturing of images
}

const TimeLapse = mongoose.model('TimeLapse', schema);

module.exports = TimeLapse;
