const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeLapseSchema = new Schema({
  name: String,
  dateCreated: { type: Date, default: Date.now }
});

module.exports = timeLapseSchema
