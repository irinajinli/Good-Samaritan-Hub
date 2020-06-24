import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './styles.css';

class undoSnackBar extends Component {
    render() {
        const {handleClose, handleUndo} = this.props;
        return (
            <Card className="undoSnackBar">
                <label className="undoSnackBar__label">Report Deleted!</label>
                <IconButton className="undoSnackBar__close-button" size="small" onClick={handleClose}>
                    <CloseIcon fontSize="inherit"/>
                </IconButton>
                <Button className="undoSnackBar__undo-button" color="secondary" size="small" onClick={handleUndo}>
                    Undo
                </Button>
            </Card>
        );
    }
}

export default undoSnackBar;