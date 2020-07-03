import React, { Component } from 'react';
import './styles.css';
import InboxSideBarItem from './InboxSideBarItem/InboxSideBarItem'
import SendMessageBox from './SendMessageBox/SendMessageBox'
import MessageList from './Messages/MessageList';
import Paper from '@material-ui/core/Paper'


class Inbox extends Component {
    handleMessageSent = (username, selectedUser, newMessageContent) => {
        if (newMessageContent !== '') {
            const curr_id = this.props.messages.reduce((a, b) => a.messageId > b.messageId ? a.messageId : b.messageId);
            var newMessage = { messageId: curr_id + 1, messageSender: username, messageReceiver: selectedUser, date: Date.now(), messageContent: newMessageContent }
            var newMessages = this.props.messages.concat(newMessage)
            this.props.handleUpdateMessages(newMessages)

            var conversationUser = this.props.conversations.filter(convo => convo.username === selectedUser);
            const conversations = [...this.props.conversations];
            const index = conversations.indexOf(conversationUser[0])
            conversations[index] = { ...conversationUser[0] }
            conversations[index].lastMessageTime = newMessage.date
            this.props.handleUpdateConversation(conversations)
        }
    }

    handleChangeSelectedUser = (username) => {
        this.setState({ selectedUser: username })
    };

    constructor(props) {
        super(props);
        if (props.lookingAtUser !== null) {
            const found = props.conversations.some(convo => convo.username === props.lookingAtUser.username)

            if (!found) {
                const curr_time = Date.now()
                const full_name = props.lookingAtUser.firstName + " " + props.lookingAtUser.lastName
                var new_conversation = { username: props.lookingAtUser.username, name: full_name, image: 'https://picsum.photos/70', lastMessageTime: curr_time }
                const conversations = [...props.conversations, new_conversation];
                props.handleUpdateConversation(conversations)
            }
            this.state = { selectedUser: props.lookingAtUser.username }

        } else {
            var sorted_conversations = [...props.conversations]
            sorted_conversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime)
            this.state = {
                selectedUser: sorted_conversations[0].username
            }
        }
    }

    render() {

        const { user } = this.props

        var sorted_conversations = [...this.props.conversations]
        sorted_conversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime)

        return (
            <div className="inboxScreen">
                <Paper className="sideBar">
                    {sorted_conversations.map(user =>
                        <InboxSideBarItem
                            key={user.username}
                            username={user.username}
                            name={user.name}
                            image={user.image}
                            handleChangeSelectedUser={this.handleChangeSelectedUser}
                            activeUser={this.state.selectedUser}
                        />
                    )}
                </Paper>
                <Paper className="messagesScreen">
                    <div className="messageScreenMessages">
                        <MessageList
                            messages={this.props.messages.filter(message =>
                                (message.messageSender === user.username || message.messageReceiver === user.username) && (message.messageSender === this.state.selectedUser || message.messageReceiver === this.state.selectedUser))}
                            user={user}
                        />
                    </div>
                    <div className="messageScreenSendMessage">
                        <SendMessageBox
                            onSend={this.handleMessageSent}
                            userName={user.username}
                            selectedUser={this.state.selectedUser}
                        />
                    </div>
                </Paper>
            </div>
        );
    }
}

export default Inbox;