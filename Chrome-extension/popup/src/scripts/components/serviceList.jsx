import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import ServicesManager from './../../../../common/services-manager';
import ServiceEntry from './serviceEntry';
import ServiceStatus from './../../../../common/service-status';

class ServiceList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            services: [],
            serviceName: this.props.serviceName,
            hostName: this.props.hostName,
            error: false
        }

        this.loadServices();
    }

    componentWillReceiveProps(newProps) {
        this.setState({ serviceName: newProps.serviceName, hostName: newProps.hostName }, this.loadServices);
    }

    loadServices() {
        var that = this;
        this.manager = new ServicesManager(this.state.hostName);
        this.manager.getServices(this.state.serviceName).then(function (json) {
            that.setState({ services: json, error: false });
        }).catch(function (error) {
            console.log(error);
            that.setState({ error: true });
        });
    }

    changeServiceStatus(changedService, newStatus) {
        var currentServices = this.state.services;
        currentServices.map(function (service) {
            if (service.name == changedService.name) {
                service.status = newStatus;
            }
        })

        if (newStatus == ServiceStatus.Starting) {
            this.manager.start(changedService.name).catch(function (error) {
                console.log(error);
                that.setState({ error: true });
            });
        }

        if (newStatus == ServiceStatus.Stopping) {
            this.manager.stop(changedService.name).catch(function (error) {
                console.log(error);
                that.setState({ error: true });
            });
        }

        this.setState({ services: currentServices });
    }

    render() {
        var that = this;
        if (this.state.error)
            return <div className='error'>An error occured during obtaining services list</div>
        else {
            var serviceList = this.state.services.map(function (service) {
                return <ServiceEntry key={service.name} serviceName={service.name} serviceStatus={service.status} onChangeStatus={(status) => that.changeServiceStatus(service, status)} />
            })

            return <ul>{serviceList}</ul>
        }
    }
}

ServiceList.propTypes = {
    serviceName: PropTypes.string
};

export default ServiceList;
