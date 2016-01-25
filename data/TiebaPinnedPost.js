'use strict';

var withCollection = require('./config').withCollection,
    assert = require('assert'),
    collection_name = 'TiebaPinnedPost';

var list = function(tieba, callback) {
  withCollection(collection_name, function(collection, db) {
    collection.find({ tieba: tieba }).toArray(function(err, docs) {
      assert.equal(null, err);
      console.log('list post for ' + tieba + ':\n', docs);

      callback(docs);

      db.close();
    });
  });
};

var update = function(tieba, posts, callback) {
  posts.forEach(function(post) {
    post.tieba = tieba;
    withCollection(collection_name, function(collection, db) {
      collection.updateOne({ link: post.link }, post, { upsert: true, w: 1 }, function(err, result) {
        assert.equal(null, err);

        if (result.upsertedCount == 1) {
          console.log('one post inserted:\n', post);
          callback(post);
        }

        db.close();
      });
    });
  });
};

var deleteAll = function() {
  withCollection(collection_name, function(collection, db) {
    collection.deleteMany({}, function(err, result) {
      assert.equal(null, err);

      console.log('all post deleted.');

      db.close();
    });
  });
};

module.exports = {
  list: list,

  update : update,

  deleteAll: deleteAll,
};

