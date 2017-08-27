import React from 'react';
import { render } from 'react-dom';
import url from '../styles/style.css';
import Toggler from './components/toggler';
import ServiceSearcher from './components/serviceSearcher';
import ServiceList from './components/serviceList';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isBackgroundUpdate: false,
      serviceName: 'Google*',
      services: []
    }

    this.setIsBackgroundUpdate = this.setIsBackgroundUpdate.bind(this)
    this.setCurrentServiceName = this.setCurrentServiceName.bind(this)
    this.setServiceStatus = this.setServiceStatus.bind(this)
    this.getStorageValue('isBackgroundUpdate')
    this.getStorageValue('serviceName')

    chrome.runtime.connect({ name: "port-from-popup" });
  }

  setCurrentServiceName(newName) {
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

  setServiceStatus(serviceName, status) {

  }

  render() {
    return (
      <div>
        <h4>Update services in background</h4>
        <Toggler initSetting={this.state.isBackgroundUpdate} onSettingChange={this.setIsBackgroundUpdate} />
        {/* <HostSearcher /> */}
        <h4>Start typing service name <br /> (regexp syntax supported)</h4>
        <ServiceSearcher serviceName={this.state.serviceName} onServiceChange={this.setCurrentServiceName} />
        <ServiceList serviceName={this.state.serviceName} onServiceStatusChange={this.setServiceStatus} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));