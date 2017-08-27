import React, { PropTypes } from 'react';

function getStatusClassName(status) {
    switch (status) {
        case 'Running':
            return 'success';
        case 'Starting':
        case 'Stopping':
            return 'warn';
        case 'Stopped':
            return 'error';
    }
}

const ServiceEntry = ({ serviceName, serviceStatus }) => {
    return (
        <li>
            <div className="row">
                <div className="col-3"><span className={getStatusClassName(serviceStatus)}>{serviceStatus}</span></div>
                <div className="col-9">
                    {serviceName}
                </div>
            </div>
        </li>
    );
};

ServiceEntry.propTypes = {
    serviceName: PropTypes.string.isRequired,
    serviceStatus: PropTypes.string.isRequired
};

export default ServiceEntry;