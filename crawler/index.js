'use strict';

var Crawler = require('crawler');
var crawler = new Crawler({
  maxConnections: 10
});

var Tieba = require('./tieba.js');

module.exports = {
  engine: crawler,
  tieba: new Tieba(crawler),
};
