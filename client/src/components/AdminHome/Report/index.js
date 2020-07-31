import React, { Component } from 'react';
import Button from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './styles.css';

class Report extends Component {
    render() {
        const {type, content, handleDeleteReport} = this.props;
        return (
            <div className="report">
                <div className="report__header">
                    <h2>{type === 'Post' ? `(Post) ${content.title}` : `(Message) ${content.messageReceiver}`}</h2>
                    <Button className="adminHome__delete-button" size="small" onClick={() => handleDeleteReport(content)}>
                        <DeleteIcon fontSize="small"/>
                    </Button>
                </div>
                <p className="report__p">{type === 'Post' ? content.body : content.messageContent}</p> 
            </div>
        );
    }
}

export default Report;