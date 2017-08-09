import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import ServicesManager from './../common/services-manager';

class ServiceList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            services: [],
            serviceName: this.props.serviceName
        }
    }

    render() {
        var names = ['Jake', 'Jon', 'Thruster'];
        var namesList = names.map(function(name) {
            return <li>{name}</li>;
        })

        return <ul>{namesList}</ul>
    }
}

ServiceList.propTypes = {
    serviceName: PropTypes.string
};

export default ServiceList;
