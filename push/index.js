'use strict';

var Apn = require('apn');

var options = {
  production: false,
  pfx: 'private/YourServicePush.p12'
};
var apnConnection = new Apn.Connection(options);

var callbacks = {};
apnConnection.on('transmitted', function (notification, devcie) {
  var c = callbacks[notification];
  if (typeof c === 'function') {
    c();
  }
  callbacks[notification] = undefined;
});

var device = new Apn.Device(
  '455eed6dbe7c86bc7892547fb9e7803d669b86f0ffad8fb13a6251d739f1c9c0');

function sendPushToApple(message, payload, callback) {
  var notification = new Apn.notification();
  notification.badge = 1;
  notification.sound = 'default';
  notification.alert = message;
  notification.category= 'uri';
  if (payload) {
    notification.payload = payload;
  }

  console.log('sendomg message to apple:');
  console.log(notification);
  apnConnection.pushNotification(notification, device);
  if (callback) {
    callbacks[notification] = callback;
  }
}

module.exports = {
  send: sendPushToApple
};

