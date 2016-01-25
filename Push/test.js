'use strict';

var push = require('./index.js');

push.send('hello from your service server', {}, function(){
  console.log('test notification sent successfully.');
  process.exit(0);
});
