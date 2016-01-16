'use strict';

var schedule = require('node-schedule');
var crawler = require('./Crawler');
var data = require('./Data');
var push = require('./Push');

var j = schedule.scheduleJob('* * * * *', function() {
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

