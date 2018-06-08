'use strict';

// TODO:
//
// This class should create schema's and models for items passed to it.
// It should overwrite any existing schemas and only create models if the files
// don't already exist.

class SchemaGenerator {
  constructor(blueprintPath) {
    this.blueprintPath = blueprintPath;
  }
}

module.exports = function(blueprintPath) {
  return new SchemaGenerator(blueprintPath);
};
