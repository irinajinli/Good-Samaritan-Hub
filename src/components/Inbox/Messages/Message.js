import React, { Component } from 'react'
import ReportIcon from '@material-ui/icons/Report';
import Modal from '@material-ui/core/Modal';
import MyDialog from '../../MyDialog';
import './styles.css';

class Message extends Component {

    state = {dialogOpen: false}

    handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    }

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    }

    render() {
        let classMessageName = "messageContainer"
        if (this.props.username == this.props.messageSender) {
            classMessageName += "RightMessage"
            var message = 
                <p>{this.props.message}</p>
        } else {
            var message = 
                <>
                <ReportIcon className="reportButton" onClick={this.handleDialogOpen}/>
                <Modal open={this.state.dialogOpen}>
                    <MyDialog 
                                title='Report this message?'
                                body=''
                                actionName='Report'
                                handleClose={this.handleDialogClose}
                                handleDoAction={this.handleDialogClose}
                    />
                </Modal>
                <p className="rightMessageText"> {this.props.message} </p>
                </>
            classMessageName += "LeftMessage"
        }
        return (
            <div className={classMessageName}>
              {message}
            </div>
        );
    }
}

export default Message;