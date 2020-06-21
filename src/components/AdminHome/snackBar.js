import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './snackBar.css';

class snackBar extends Component {
    render() {
        const {handleClose, handleUndo} = this.props;
        return (
            <Card className="snackBar">
                <label className="snackBar__label">Report Deleted!</label>
                <IconButton className="snackBar__close-button" size="small" onClick={handleClose}>
                    <CloseIcon fontSize="inherit"/>
                </IconButton>
                <Button className="snackBar__undo-button" color="primary" size="small" onClick={handleUndo}>
                    Undo
                </Button>
            </Card>
        );
    }
}

export default snackBar;