import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import ServicesManager from './../../../../common/services-manager';
import ServiceEntry from './serviceEntry';

class ServiceList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            services: [],
            serviceName: this.props.serviceName || '',
            error: false
        }

        this.manager = new ServicesManager('http://localhost:3000/tasks');

        this.loadServices();
    }

    componentWillReceiveProps(newProps) {
        this.setState({ serviceName: newProps.serviceName }, this.loadServices);
    }

    loadServices() {
        var that = this;
        this.manager.getServices(this.state.serviceName).then(function (res) {
            return res.json();
        }).then(function (json) {
            that.setState({ services: json });
        }).catch(function (error) {
            console.log(error);
            that.setState({ error: true });
        });
    }

    render() {
        if (this.state.error)
            return <div className='error'>An error occured during obtaining services list</div>
        else {
            var serviceList = this.state.services.map(function (service) {
                return <ServiceEntry key={service.name} serviceName={service.name} serviceStatus={service.status} />
            })

            return <ul>{serviceList}</ul>
        }
    }
}

ServiceList.propTypes = {
    serviceName: PropTypes.string
};

export default ServiceList;
