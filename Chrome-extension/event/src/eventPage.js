import ServicesManager from './../../common/services-manager';
import ChromeStorage from './../../common/chrome-storage';
import ServiceStatus from './../../common/service-status';

var isActive = false;
var port;
var alarmName = "monitor_sevices";

chrome.browserAction.setBadgeBackgroundColor({ color: "red" });
chrome.runtime.onInstalled.addListener(function () {
    new ChromeStorage().setValue('isBackgroundUpdate', true);
    chrome.alarms.create(alarmName, { periodInMinutes: 0.1 });
});

chrome.alarms.onAlarm.addListener(function () {
    var storage = new ChromeStorage();

    storage.getAll(function (settings) {
        var manager = new ServicesManager(settings.host || 'localhost');

        if (isActive || settings.isBackgroundUpdate) {
            manager.getServices(settings.serviceName).then(function (json) {
                var stoppedServicesNum = json.reduce(function (accumulator, currentValue) {
                    if (currentValue.status == ServiceStatus.Stopped)
                        return accumulator + 1;
                    else return accumulator;
                }, 0);

                if (stoppedServicesNum)
                    chrome.browserAction.setBadgeText({ text: stoppedServicesNum.toString() });
            });
        }
        else
            chrome.browserAction.setBadgeText({ text: '' });
    });
});

chrome.runtime.onConnect.addListener(function (p) {
    isActive = true;
    if (p.name == "port-from-popup") {
        port = p;
        port.onDisconnect.addListener(onDisconnect);
    }
});

function onDisconnect() {
    isActive = false;
}