import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton'

import './styles.css'

class SendMessageBox extends Component {
    state = {
        newMessage: ''
    }

    handleMessageChanges = input => e => {
        this.setState({ [input]: e.target.value })
    }

    
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          this.props.onSend(this.props.userName, this.props.selectedUser, this.state.newMessage);
          this.setState({ newMessage: '' })
        }
      }

    render() {
        return (
            <div className='sendMessageContainer' onKeyPress={this.handleKeyPress}>
                <div className='sendMessageBox'>
                    <TextField
                        placeholder="Type Message Here"
                        variant="outlined"
                        fullWidth
                        onChange={this.handleMessageChanges('newMessage')}
                        value={this.state.newMessage}
                    />
                </div>
                <div className='sendIconContainer'>
                    <IconButton onClick={() => {
                        this.props.onSend(this.props.userName, this.props.selectedUser, this.state.newMessage);
                        this.setState({ newMessage: '' })
                    }}>
                        <SendIcon className="sendIcon" />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default SendMessageBox;