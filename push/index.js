'use strict';

var Apn = require('apn');

var options = {
  production: false,
  pfx: 'private/YourServicePush.p12'
};
var apnConnection = new Apn.Connection(options);

var callbacks = {};
apnConnection.on('transmitted', function(notification, devcie) {
  var c = callbacks[notification];
  if (typeof c === 'function') {
    c();
  }
  callbacks[notification] = undefined;
});

var device = new Apn.Device(
  '1b51c9789f1656305e47458da4ec617097de30b0e859fc4f6a3f8dad9d305b03');

function sendPushToApple(message, payload, callback) {
  var notification = new Apn.notification();
  notification.badge = 1;
  notification.sound = 'default';
  notification.alert = message;
  notification.category = 'uri';
  // notification.contentAvailable = true;
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

