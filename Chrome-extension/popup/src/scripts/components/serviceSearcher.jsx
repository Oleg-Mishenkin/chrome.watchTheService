import React, { PropTypes } from 'react';

class ServiceSearcher extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isBackgroundUpdate: false,
            currentServiceName: this.props.serviceName
        }

        this.onServiceNameChanged = this.onServiceNameChanged.bind(this);
        this.inputChangedTimeout = null;
    }

    onServiceNameChanged(evt) {
        this.setState({ currentServiceName: evt.target.value });
        if (this.inputChangedTimeout != null)
            clearTimeout(this.inputChangedTimeout);
        this.inputChangedTimeout = setTimeout(function () { this.props.onServiceChange(this.state.currentServiceName); }.bind(this), 1000)
    }

    componentWillReceiveProps(newProps) {
        this.setState({ currentServiceName: newProps.serviceName });
    }

    componentWillUnmout() {
        if (this.inputChangedTimeout != null)
            clearTimeout(this.inputChangedTimeout);
    }

    render() {
        return (
            <input type='text' value={this.state.currentServiceName} onChange={this.onServiceNameChanged} />
        );
    }
}

ServiceSearcher.propTypes = {
    serviceName: PropTypes.string
};

export default ServiceSearcher;