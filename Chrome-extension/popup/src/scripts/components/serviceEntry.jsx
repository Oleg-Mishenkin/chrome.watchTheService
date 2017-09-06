import React, { PropTypes } from 'react';
import ServiceStatus from './../../../../common/service-status';

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

function selectNewStatus(oldStatus) {
    switch (oldStatus) {
        case ServiceStatus.Running:
            return ServiceStatus.Stopping;
        case ServiceStatus.Stopped:
            return ServiceStatus.Starting;
        default:
            return oldStatus;
    }
}

function getImageClassName(status) {
    switch (status) {
        case ServiceStatus.Running:
            return 'image-stop';
        case ServiceStatus.Starting:
            return 'image-start image-disabled';
        case ServiceStatus.Stopping:
            return 'image-stop image-disabled';
        case ServiceStatus.Stopped:
            return 'image-start';
    }
}

const ServiceEntry = ({ serviceName, serviceStatus, onChangeStatus }) => {
    return (
        <li>
            <div className="row">
                <div className="col-1"><div className={'image-container ' + getImageClassName(serviceStatus)} onClick={() => onChangeStatus(selectNewStatus(serviceStatus))}></div></div>
                <div className="col-3"><span className={getStatusClassName(serviceStatus)}>{serviceStatus}</span></div>
                <div className="col-8">
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