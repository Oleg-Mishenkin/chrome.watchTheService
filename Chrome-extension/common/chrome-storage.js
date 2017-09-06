class ChromeStorage {
    getValue(settingName, callback) {
        chrome.storage.sync.get(settingName, function (setting) {
            if (setting != undefined && callback) {
               callback(setting);
            }
        });
    }

    setValue(settingName, value, callback) {
        var chromeStorageValue = {};
        chromeStorageValue[settingName] = value;
        chrome.storage.sync.set(chromeStorageValue);
        if (callback)
            callback(chromeStorageValue);
    }

    getAll(callback) {
        chrome.storage.sync.get(null, function (settings) {
            if (settings != undefined && callback) {
               callback(settings);
            }
        });
    }
}

export default ChromeStorage;