const { Serializer } = require('jsonapi-serializer');

const timeLapseSerializer = new Serializer('time-lapses', {
  attributes: ['name', 'dateCreated']
});

module.exports = timeLapseSerializer;
