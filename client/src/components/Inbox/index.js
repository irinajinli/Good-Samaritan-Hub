import React, { Component } from 'react';
import './styles.css';
import InboxSideBarItem from './InboxSideBarItem/InboxSideBarItem'
import SendMessageBox from './SendMessageBox/SendMessageBox'
import MessageList from './Messages/MessageList';
import MessageTopBar from './MessageTopBar/MessageTopBar'
import Paper from '@material-ui/core/Paper'
import {getMessagesForUser, sendMessage, getConversationsForUser, createNewConversation, updateConversations, reportMessage} from '../../actions/inbox'
import { getUserByUsername } from '../../actions/user';
import { getPostsByUser } from '../../actions/post';


class Inbox extends Component {
        handleMessageSent = async (username, selectedUser, newMessageContent) => {
        try {
            if (newMessageContent !== '') {
                var newMessage = {messageSender: username, messageReceiver: selectedUser, messageContent: newMessageContent }
                await sendMessage(newMessage)

                var messages = await getMessagesForUser(this.props.user.username)
                this.setState({messages: messages})

                var curr_conv = this.state.conversations.filter(con => con.username == selectedUser)[0]
                var conversation = {messagedUser: selectedUser, messagedUserFullName: curr_conv.name, post: curr_conv.post_info}

                await updateConversations(username, conversation)

                var conversations =  await getConversationsForUser(this.props.user.username)
                this.setState({conversations: conversations});

                var conversations = [...this.state.conversations]
                for(var a of conversations) {
                    var user_info = await getUserByUsername(a.username)
                    a.user_info = user_info
                    if(a.post != null) {
                        var post_info = await getPostsByUser(a.user_info)
                        var post_info = post_info.concat(await getPostsByUser(this.props.user))
                        a.post_info = post_info.filter(post => post._id == a.post)[0]
                    }
                    a.name = a.user_info.firstName + " " + a.user_info.lastName
                }
                this.setState({conversations: conversations})
            }
        } catch (error) {
            alert("Message failed to send")
        }
    }

    handleReportMessage = (message) => {
        reportMessage(message)
    }

    handleChangeSelectedUser = (username) => {
        this.setState({ selectedUser: username })
        var user_info = this.state.conversations.filter(con => con.username == username)[0].user_info
        this.setState({selectedUserInfo: user_info})
        var user_post = this.state.conversations.filter(con => con.username == username)[0].post_info
        this.setState({selectedUserPost: user_post})
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedUser: null,
            selectedUserInfo: null,
            selectedUserPost: null,
            conversations: [],
            messages: [],
        }
    }


    handleComponentMount = async () => {     
        var conversations =  await getConversationsForUser(this.props.user.username)
        this.setState({conversations: conversations});

        if (this.props.lookingAtUser !== null) {
            const found = this.state.conversations.some(convo => convo.username === this.props.lookingAtUser.username)
            if (!found) {
                const full_name = this.props.lookingAtUser.firstName + " " + this.props.lookingAtUser.lastName
                var new_conversation = {messagedUser: this.props.lookingAtUser.username, messagedName: full_name}
                await createNewConversation(this.props.user.username, new_conversation)
                var new_conversations = await getConversationsForUser(this.props.user.username)
                this.setState({conversations: new_conversations})
            }
            this.setState({selectedUser: this.props.lookingAtUser.username})
        } 
        else {
            var sorted_conversations = [...this.state.conversations]
            sorted_conversations.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
            if (sorted_conversations[0] != null) {
                this.setState({
                    selectedUser: sorted_conversations[0].username
                })
            } else {
                this.setState({
                    selectedUser: null
                })
            }
        }

        if(this.props.lookingAtPost != null) {
            var curr_conv = this.state.conversations.filter(con => con.username == this.state.selectedUser)[0]
            var conversation = {messagedUser: curr_conv.username, messagedUserFullName: curr_conv.name, post: this.props.lookingAtPost._id}        
            await updateConversations(this.props.user.username, conversation)
            var new_conversations = await getConversationsForUser(this.props.user.username)
            this.setState({conversations: new_conversations})
        }

        var messages = await getMessagesForUser(this.props.user.username)
        this.setState({messages: messages})

        var conversations = [...this.state.conversations]
        for(var a of conversations) {
            var user_info = await getUserByUsername(a.username)
            a.user_info = user_info
            if(a.post != null) {
                var post_info = await getPostsByUser(a.user_info)
                var post_info = post_info.concat(await getPostsByUser(this.props.user))
                a.post_info = post_info.filter(post => post._id == a.post)[0]
            }
            a.name = a.user_info.firstName + " " + a.user_info.lastName
        }
        this.setState({conversations: conversations})
        var user_info = this.state.conversations.filter(con => con.username == this.state.selectedUser)[0].user_info
        this.setState({selectedUserInfo: user_info})
        var user_post = this.state.conversations.filter(con => con.username == this.state.selectedUser)[0].post_info
        this.setState({selectedUserPost: user_post})

    }

    componentDidMount() {
        try {
            this.handleComponentMount()
        } catch (error) {
            alert("Page failed to load")
            this.setState({
                selectedUser: null,
                selectedUserInfo: null,
                selectedUserPost: null,
                conversations: [],
                messages: [],
            })
        }
    }

    render() {

        const { user } = this.props
        const {messages} = this.state
        try{
            var sorted_conversations = [...this.state.conversations]
            sorted_conversations.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
        } catch(error) {
            alert("Page failed to load")
            var sorted_conversations = []
        }
        return (
            <div className="inboxScreen">
                <Paper className="sideBar">
                    {sorted_conversations[0] != null && sorted_conversations[0].user_info != null && sorted_conversations.map(user =>
                        <InboxSideBarItem
                            key={user.username}
                            username={user.username}
                            name={user.name}
                            firstName={user.user_info.firstName}
                            lastName={user.user_info.lastName}
                            // image={}
                            handleChangeSelectedUser={this.handleChangeSelectedUser}
                            activeUser={this.state.selectedUser}
                        />
                    )}
                </Paper>
                <Paper className="messagesScreen">
                    <Paper className="messageTopBar">
                        {this.state.selectedUser !== null &&
                            <MessageTopBar
                                currUser={this.state.selectedUserInfo}
                                currPost={this.state.selectedUserPost}
                                handleGoToProfile={this.props.handleGoToProfile}
                            />
                        }
                    </Paper>
                    <div className="messageScreenMessages">
                       
                        <MessageList
                            messages={messages.filter(message =>
                                (message.messageSender === user.username || message.messageReceiver === user.username) && (message.messageSender === this.state.selectedUser || message.messageReceiver === this.state.selectedUser))}
                            user={user}
                            handleReportMessage={this.handleReportMessage}
                        />
                    </div>
                    <div className="messageScreenSendMessage">
                        {this.state.selectedUser !== null &&
                            <SendMessageBox
                                onSend={this.handleMessageSent}
                                userName={user.username}
                                selectedUser={this.state.selectedUser}
                            />
                        }
                    </div>
                </Paper>
            </div>
        );
    } 
}

export default Inbox;