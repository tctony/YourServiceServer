'use strict';

var schedule = require('node-schedule');
var crawler = require('./Crawler');

var j = schedule.scheduleJob('* * * * *', function() {
  crawler.tieba.fetchPinnedPosts('万古至尊', function(list) {
    console.log(list);
  });
  crawler.tieba.fetchPinnedPosts('大主宰', function(list) {
    console.log(list);
  });
});
