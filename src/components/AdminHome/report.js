import React, { Component } from 'react';
import Button from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class Report extends Component {
    render() {
        const {type, content} = this.props;
        return (
            <div className="adminHome__reported-item">
                <div>
                   <h2>{type}</h2>
                    <p className="adminHome__label">{content}</p> 
                </div>
                <Button className="adminHome__delete-button">
                    <DeleteIcon/>
                </Button>
            </div>
        );
    }
}

export default Report;