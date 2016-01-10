'use strict';

var mongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var MONGO_URL = 'mongodb://localhost:27017/YourService';
if (!process.env['DB_URL']) {
  process.env['DB_URL'] = MONGO_URL;
}

var withMongo = function(callback) {
  assert.equal('function', typeof callback);

  mongoClient.connect(MONGO_URL, function(err, db) {
    assert.equal(null, err);

    callback(db);
  });
};

var withCollection = function(name, callback) {
  withMongo(function(db){
    var collection = db.collection(name);
    callback(collection, db);
  });
};

module.exports = {
  mongoClient: mongoClient,

  mongoUrl: MONGO_URL,

  withMongo: withMongo,

  withCollection: withCollection,
};
