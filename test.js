'use strict';

require('./logger.js');

var schedule = require('node-schedule');

var j = schedule.scheduleJob('*/5 * * * * *', function() {
  console.log("console log");
  console.debug('Got cheese.');
  console.info('Cheese is Gouda.');
  console.warn('Cheese is quite smelly.');
  console.error('Cheese is too ripe!');
});


