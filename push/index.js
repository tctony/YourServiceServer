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
  '5dcb90b61d1776a6f45d121b8bcb1f9154b0f2916d15570d10c08d3e91333590');

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

