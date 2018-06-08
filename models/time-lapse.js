const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeLapseSchema = require('./schemas/time-lapse-schema');

timeLapseSchema.methods.run = function() {
  // TODO: implement run functionality
  //
  // this will initialize a python bin script that will capture images
}

timeLapseSchema.methods.pause = function() {
  // TODO: implement pause functionality
  //
  // this will cause this timeLapse to pause its capturing of images
}

const TimeLapse = mongoose.model('TimeLapse', timeLapseSchema);

module.exports = TimeLapse;
