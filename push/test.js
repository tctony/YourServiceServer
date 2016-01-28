'use strict';

var push = require('./index.js');

push.send('hello from your service server', { uri: "http://www.qq.com" }, function(){
  console.log('test notification sent successfully.');
  process.exit(0);
});
