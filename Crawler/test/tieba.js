'use strict';

var arguements = process.argv;
if (arguements && arguements.length < 3) {
  console.log('tieba name is needed');
  process.exit(1);
}

var Crawler = require('crawler');
var crawler = new Crawler();

var Tieba = require('../tieba.js');
var tieba = new Tieba(crawler);

tieba.fetchPinnedPosts(arguements[2], function(postList) {
  if (postList) {
    console.log(postList);
    process.exit(0);
  } else {
    process.exit(1);
  }
});

