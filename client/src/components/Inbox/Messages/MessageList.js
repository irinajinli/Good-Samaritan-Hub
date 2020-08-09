import React, { Component } from 'react'
import Message from './Message'
import {getMessagesForUser} from '../../../actions/inbox'

class MessageList extends Component {
    state = {messages: [], user: {}}

    // componentDidMount() {
    //     getMessagesForUser(this.props.user.username)
    //     .then(messages => {
    //         this.setState({
    //             messages: messages
    //         });
    //     })
    // }

    // componentDidUpdate() {
    //     getMessagesForUser(this.props.user.username)
    //     .then(messages => {
    //         this.setState({
    //             messages: messages
    //         });
    //     })
    // }
    
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
                />
            )
        );
    }
}

export default MessageList;