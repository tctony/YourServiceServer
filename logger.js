'use strict';

var log4js = require('log4js');
var defaultLogger = log4js.getLogger();
log4js.replaceConsole(defaultLogger);

module.exports = {
  log4js: log4js
};
