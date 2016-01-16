'use strict';

var Apn = require('apn');

var options = {
  'pfx': 'private/YourServicePush.p12'
};
var apnConnection = new Apn.Connection(options);

var device = new Apn.Device(
  '455eed6dbe7c86bc7892547fb9e7803d669b86f0ffad8fb13a6251d739f1c9c0');

function sendPushToApple(message, payload) {
  var pushMessage = new Apn.notification();
  pushMessage.badge = 1;
  pushMessage.sound = 'default';
  pushMessage.alert = message;
  if (payload) {
    pushMessage.payload = payload;
  }

  apnConnection.pushNotification(pushMessage, device);
}

module.exports = {
  send: sendPushToApple
};

