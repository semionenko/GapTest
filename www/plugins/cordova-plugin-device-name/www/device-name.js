cordova.define("cordova-plugin-device-name.DeviceName", function(require, exports, module) {
/*
 * Cordova Device Name Plugin
 *
 * ZeroConf plugin for Cordova/Phonegap 
 * by Sylvain Brejeon
 */

var argscheck = require('cordova/argscheck');
var channel = require('cordova/channel');
var utils = require('cordova/utils');
var exec = require('cordova/exec');
var cordova = require('cordova');

channel.createSticky('onDeviceNameReady');
// Tell cordova channel to wait on the DeviceNameReady event
channel.waitForInitialization('onDeviceNameReady');

function DeviceName() {
    this.name = null;
    var me = this;
    channel.onCordovaReady.subscribe(function() {
        me.get(function(info) {
            me.name = info.name;
            channel.onDeviceNameReady.fire();
        }, function(e) {
            utils.alert("[ERROR] Error initializing Cordova: " + e);
        });
    });
}

DeviceName.prototype.get = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'DeviceName.get', arguments);
    exec(successCallback, errorCallback, "DeviceName", "get", []);
};

module.exports = new DeviceName();

});
