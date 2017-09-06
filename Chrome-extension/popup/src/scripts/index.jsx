import React from 'react';
import { render } from 'react-dom';
import url from '../styles/style.css';
import Toggler from './components/toggler';
import ServiceSearcher from './components/serviceSearcher';
import ServiceList from './components/serviceList';
import ChromeStorage from './../../../common/chrome-storage';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isBackgroundUpdate: true,
      serviceName: 'Microsoft*',
      services: []
    }

    this.chromeStorage = new ChromeStorage();

    this.setIsBackgroundUpdate = this.setIsBackgroundUpdate.bind(this)
    this.setCurrentServiceName = this.setCurrentServiceName.bind(this)
    this.setServiceStatus = this.setServiceStatus.bind(this)
    this.setChromeStorageCallback = this.setChromeStorageCallback.bind(this)
    this.getChromeStorageCallback = this.getChromeStorageCallback.bind(this)

    this.chromeStorage.getValue('isBackgroundUpdate', this.getChromeStorageCallback);
    this.chromeStorage.getValue('serviceName', this.getChromeStorageCallback);

    chrome.runtime.connect({ name: "port-from-popup" });
  }

  setCurrentServiceName(newName) {
    this.chromeStorage.setValue('serviceName', newName, this.setChromeStorageCallback);
  }

  setIsBackgroundUpdate(evt) {
    this.chromeStorage.setValue('isBackgroundUpdate', !this.state.isBackgroundUpdate, this.setChromeStorageCallback);
  }

  setChromeStorageCallback(setting) {
    this.setState(setting);
  }

  getChromeStorageCallback(setting) {
    this.setState(setting);
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