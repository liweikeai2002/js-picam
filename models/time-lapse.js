const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeLapseSchema = require('./schemas/time-lapse-schema');
const TimeLapse = mongoose.model('TimeLapse', timeLapseSchema);

module.exports = TimeLapse;
