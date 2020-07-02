import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {
    state = {  }

    render() {
        const {messages, user} = this.props
        return (
                messages.map(message => 
                    <Message
                        key={message.messageId}
                        message={message.messageContent}
                        username={user.username}
                        messageSender={message.messageSender}
                />
                )
        );
    }
}

export default MessageList;