import React, { PropTypes } from 'react';

class ValueSearcher extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentValueName: this.props.valueName
        }

        this.onValueNameChanged = this.onValueNameChanged.bind(this);
        this.inputChangedTimeout = null;
    }

    onValueNameChanged(evt) {
        this.setState({ currentValueName: evt.target.value });
        if (this.inputChangedTimeout != null)
            clearTimeout(this.inputChangedTimeout);
        this.inputChangedTimeout = setTimeout(function () { this.props.onValueChange(this.state.currentValueName); }.bind(this), 1000)
    }

    componentWillReceiveProps(newProps) {
        this.setState({ currentValueName: newProps.valueName });
    }

    componentWillUnmout() {
        if (this.inputChangedTimeout != null)
            clearTimeout(this.inputChangedTimeout);
    }

    render() {
        return (
            <input type='text' value={this.state.currentValueName} onChange={this.onValueNameChanged} placeholder={this.props.hint} />
        );
    }
}

ValueSearcher.propTypes = {
    valueName: PropTypes.string
};

export default ValueSearcher;