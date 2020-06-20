import React, { Component } from 'react';

class Label extends Component {
    render() {
        const {primary, secondary, blockText} = this.props;
        return (
            <div className="adminHome__label">
                <label className="adminHome__label-bold">{primary}:</label>
                {blockText &&
                    <p className="adminHome__label">{secondary}</p>
                }
                {!blockText && secondary}
            </div>
        );
    }
}

export default Label;