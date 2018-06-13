const { Schema } = require('mongoose');

const timeLapseSchema = new Schema({
  name: String,
  dateCreated: { type: Date, default: Date.now }
});

module.exports = timeLapseSchema;
