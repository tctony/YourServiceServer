'use strict';

require('./logger.js');

var schedule = require('node-schedule');
var crawler = require('./crawler');
var data = require('./data');
var push = require('./push');

// every 5 minute
var j = schedule.scheduleJob('0 */5 * * * *', function() {
  crawler.tieba.fetchPinnedPosts('万古至尊', function(tieba, posts) {
    data.tiebaPinnedPost.update(tieba, posts, function(newpost) {
      var message = tieba + '有更新: ' + newpost.title;
      push.send(message, {
        uri: newpost.link
      });
    });
  });
  crawler.tieba.fetchPinnedPosts('大主宰', function(tieba, posts) {
    data.tiebaPinnedPost.update(tieba, posts, function(newpost) {
      var message = tieba + '有更新: ' + newpost.title;
      push.send(message, {
        uri: newpost.link
      });
    });
  });
});

