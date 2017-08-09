import React from 'react';
import { render } from 'react-dom';
import url from '../styles/style.css';
import Toggler from './components/toggler';
import ServiceSearcher from './components/serviceSearcher';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isBackgroundUpdate: false,
      serviceName: ''
    }

    this.setIsBackgroundUpdate = this.setIsBackgroundUpdate.bind(this)
    this.setCurrentService = this.setCurrentService.bind(this)
    this.getStorageValue('isBackgroundUpdate')
    this.getStorageValue('serviceName')
  }

  setCurrentService(newName) {
    var settingName = 'serviceName';
    this.setStorageValue(settingName, newName);
  }

  setIsBackgroundUpdate(evt) {
    var settingName = 'isBackgroundUpdate';
    this.setStorageValue(settingName, !this.state.isBackgroundUpdate);
  }

  setStorageValue(settingName, value) {
    var chromeStorageValue = {};
    chromeStorageValue[settingName] = value;
    chrome.storage.sync.set(chromeStorageValue);
    this.setState(chromeStorageValue);
  }

  getStorageValue(settingName) {
    var that = this;
    chrome.storage.sync.get(settingName, function (setting) {
      if (setting != undefined) {
        that.setState(setting);
      }
    });
  }

  render() {
    return (
      <div>
        <h4>Update services in background</h4>
        <Toggler initSetting={this.state.isBackgroundUpdate} onSettingChange={this.setIsBackgroundUpdate.bind(this)} />
        {/* <HostSearcher /> */}
        <h4>Start typing service name (regexp syntax supported)</h4>
        <ServiceSearcher serviceName={this.state.serviceName} onServiceChange={this.setCurrentService.bind(this)} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));