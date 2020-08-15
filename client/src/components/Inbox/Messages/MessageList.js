import React, { Component } from 'react'
import Message from './Message'
import {reportMessage} from '../../../actions/inbox'

class MessageList extends Component {
    state = {messages: [], user: {}}

    handleReportMessage = (message) => {
        reportMessage(message)
    }
    
    componentDidUpdate() {
        const {messages} = this.props;
    }

    render() {
        // const { messages, user } = this.props
        const { user, messages} = this.props
        return (
            messages.map(message =>
                <Message
                    key={message._id}
                    message={message.messageContent}
                    username={user.username}
                    messageSender={message.messageSender}
                    handleReportMessage={this.handleReportMessage}
                    messageToReport={message}
                />
            )
        );
    }
}

export default MessageList;