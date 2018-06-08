'use strict';

class SchemaGenerator {
  constructor(blueprintPath) {
    this.blueprintPath = blueprintPath;
  }
}

module.exports = function(blueprintPath) {
  return new SchemaGenerator(blueprintPath);
};
