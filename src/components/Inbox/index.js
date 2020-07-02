import React, { Component } from 'react';
import './styles.css';
import InboxSideBarItem from './InboxSideBarItem/InboxSideBarItem'
import SendMessageBox from './SendMessageBox/SendMessageBox'
import MessageList from './Messages/MessageList';


class Inbox extends Component {
    state = {
        conversations: [
            { username: 'user2', name: 'Bobsy Bob', image: 'https://picsum.photos/70', lastMessageTime: '1593648000' },
            { username: 'user3', name: 'Diane Doh', image: 'https://picsum.photos/70', lastMessageTime: '1593646000' },
            { username: 'user4', name: 'Jack Scott', image: 'https://picsum.photos/70', lastMessageTime: '1593644000' },
        ],
        messages: [
            { messageId: 0, messageSender: 'user', messageReceiver: 'user2', date: '1593648000', messageContent: 'Hi Bobsy' },
            { messageId: 1, messageSender: 'user2', messageReceiver: 'user', date: '1593648000', messageContent: 'Hi John' },
            { messageId: 2, messageSender: 'user', messageReceiver: 'user2', date: '1593648000', messageContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { messageId: 3, messageSender: 'user2', messageReceiver: 'user', date: '1593648000', messageContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { messageId: 4, messageSender: 'user', messageReceiver: 'user3', date: '1593648000', messageContent: 'Hello Diane' },
            { messageId: 5, messageSender: 'user3', messageReceiver: 'user', date: '1593648000', messageContent: 'Hello John' },
            { messageId: 6, messageSender: 'user', messageReceiver: 'user4', date: '1593648000', messageContent: 'Greetings Jack' },
            { messageId: 7, messageSender: 'user4', messageReceiver: 'user', date: '1593648000', messageContent: 'Greetings John' },
        ],
        selectedUser: 'user2',
    }

    handleMessageSent = (username, selectedUser, newMessageContent) => {
        if (newMessageContent != '') {
            const curr_id = this.state.messages.reduce((a, b) => a.messageId > b.messageId ? a.messageId : b.messageId);
            var newMessage = { messageId: curr_id + 1, messageSender: username, messageReceiver: selectedUser, date: Date.now(), messageContent: newMessageContent }
            var newMessages = this.state.messages.concat(newMessage)
            this.setState({ messages: newMessages })

            var conversationUser = this.state.conversations.filter(convo => convo.username == selectedUser);
            const conversations = [...this.state.conversations];
            const index = conversations.indexOf(conversationUser[0])
            conversations[index] = { ...conversationUser[0] }
            conversations[index].lastMessageTime = newMessage.date
            this.setState({ conversations })
        }
    }

    handleChangeSelectedUser = (username) => {
        this.setState({ selectedUser: username })
    };

    render() {
        const { user } = this.props

        var sorted_conversations = [...this.state.conversations]
        sorted_conversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime)

        return (
            <div className="inboxScreen">
                <div className="sideBar">
                    {sorted_conversations.map(user =>
                        <InboxSideBarItem
                            username={user.username}
                            name={user.name}
                            image={user.image}
                            handleChangeSelectedUser={this.handleChangeSelectedUser}
                        />
                    )}
                </div>
                <div className="messagesScreen">
                    <div className="messageScreenMessages">
                        <MessageList
                            messages={this.state.messages.filter(message =>
                                (message.messageSender == user.username || message.messageReceiver == user.username) && (message.messageSender == this.state.selectedUser || message.messageReceiver == this.state.selectedUser))}
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
                </div>
            </div>
        );
    }
}

export default Inbox;