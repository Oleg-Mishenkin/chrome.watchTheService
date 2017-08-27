import ServicesManager from './../../common/services-manager';

var counter = 1;
var port;

chrome.browserAction.setBadgeBackgroundColor({ color: "red" });
chrome.runtime.onInstalled.addListener(function () {
    chrome.alarms.create("monitor_sevices", { periodInMinutes: 0.1 });
});

chrome.alarms.onAlarm.addListener(function () {
    counter++;
    // chrome.browserAction.setBadgeText({ text: counter.toString() });
});

chrome.runtime.onConnect.addListener(function (p) {
    port = p;
    port.onDisconnect.addListener(onDisconnect);
    chrome.browserAction.setBadgeText({ text: "connected!" });
});

function onDisconnect() {
    chrome.browserAction.setBadgeText({ text: "disconnected!" });
}