import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './styles.css';

class SaveSnackBar extends Component {
    render() {
        const {handleClose} = this.props;
        return (
            <Card className="saveSnackBar">
                <label className="saveSnackBar__label">Saved Successfully!</label>
                <IconButton className="saveSnackBar__close-button" size="small" onClick={handleClose}>
                    <CloseIcon fontSize="inherit"/>
                </IconButton>
            </Card>
        );
    }
}

export default SaveSnackBar;