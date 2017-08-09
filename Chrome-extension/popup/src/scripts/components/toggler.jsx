import React, { PropTypes } from 'react';

const Toggler = ({initSetting, onSettingChange}) => {
    return (
            <input checked={initSetting} type="checkbox" className='webkit-switch' onChange={onSettingChange} />
        );
};

Toggler.propTypes = {
    initSetting: PropTypes.bool
};

export default Toggler;