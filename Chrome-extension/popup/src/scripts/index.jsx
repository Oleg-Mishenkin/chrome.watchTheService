import React from 'react';
import { render } from 'react-dom';
import url from '../styles/style.css';
import Toggler from './components/toggler';
import ValueSearcher from './components/valueSearcher';
import ServiceList from './components/serviceList';
import ChromeStorage from './../../../common/chrome-storage';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isBackgroundUpdate: true,
      serviceName: '',
      hostName: '',
      services: []      
    }

    this.chromeStorage = new ChromeStorage();

    this.setIsBackgroundUpdate = this.setIsBackgroundUpdate.bind(this);
    this.setCurrentServiceName = this.setCurrentServiceName.bind(this);
    this.setCurrentHostName = this.setCurrentHostName.bind(this);
    this.setChromeStorageCallback = this.setChromeStorageCallback.bind(this);

    this.chromeStorage.getAll(this.setChromeStorageCallback);
    this.port = chrome.runtime.connect({ name: "port-from-popup" })    
  }

  setCurrentServiceName(newName) {
    this.chromeStorage.setValue('serviceName', newName, this.setChromeStorageCallback);
  }

  setCurrentHostName(newName) {
    this.chromeStorage.setValue('hostName', newName, this.setChromeStorageCallback);
  }

  setIsBackgroundUpdate(evt) {
    this.chromeStorage.setValue('isBackgroundUpdate', !this.state.isBackgroundUpdate, this.setChromeStorageCallback);
  }

  setChromeStorageCallback(setting) {
    this.setState(setting);
  }

  render() {
    var shouldRenderList = this.state.serviceName.length > 0 && this.state.hostName.length > 0;
    return (
      <div>
        <h4>Update services in background</h4>
        <Toggler initSetting={this.state.isBackgroundUpdate} onSettingChange={this.setIsBackgroundUpdate} />
        <h4>Host name</h4>
        <ValueSearcher valueName={this.state.hostName} onValueChange={this.setCurrentHostName} hint="localhost/WatchTheService/api/services" />
        <h4>Start typing service name <br /> (regexp syntax supported)</h4>
        <ValueSearcher valueName={this.state.serviceName} onValueChange={this.setCurrentServiceName} hint="Microsoft*" />
        {shouldRenderList ?
          <ServiceList serviceName={this.state.serviceName} hostName={this.state.hostName} servicesSourcePort={this.port} />
          : ''
        }
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));