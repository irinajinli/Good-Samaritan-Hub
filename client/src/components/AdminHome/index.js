import React, { Component } from 'react';
import { withRouter } from 'react-router'
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import BanIcon from '@material-ui/icons/Gavel';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import './styles.css';
import Icon from './../../resources/userIcon.png';
import Label from './label.js';
import Table from './Table/index.js';
import Report from './Report/index.js';
import Post from './Post/index.js';
import BanDialog from './BanDialog/index.js';
import UndoSnackBar from './UndoSnackBar/index.js';

import { getPostsByUser, unreportPost, reportPost } from '../../actions/post';
import { updateUserStatus, getAllUsers } from '../../actions/user';

const columns = [
    { id: 'name', label: 'Username'},
    { id: 'status', label: 'Status'}
];

function generateChip(user) {
    return user.isBanned ?
        <Chip className="adminHome__chip-banned" label="Banned"/> :
        user.isReported ?
            <Chip className="adminHome__chip-reported" label="Reported"/> :
            <Chip className="adminHome__chip-active" label="Active"/>;
}

function reportedFirstComparator(a, b) {
    if ((a.status.props.label === "Reported") === (b.status.props.label === "Reported")) {
        return a.name.localeCompare(b.name);
    }
    return a.status.props.label === "Reported" ? -1 : 1;
}

class AdminHome extends Component {
    state = {
        users: [],
        posts: [],
        reportedPosts: [],
        messages: [],
        selectedUser: null,
        selectedRow: null,
        dialogOpen: false,
        oldReport: null
    }

    componentDidMount = () => {
        getAllUsers(this).then(users => {
            this.setState({
                users
            });
        })
        .catch(error => {
            console.log(error)
            alert("Could not retrieve users");
        });
    }

    getReportedPosts = (posts) => posts.filter(post => post.isReported);
    
    usersToRows = (users) => {
        if (!Array.isArray(users)) {
            return;
        }
        const row = [];
        for (let i = 0; i < users.length; i++) {
            row.push({
                id: i,
                name: users[i].username,
                status: generateChip(users[i])
            });
        }
        return row;
    }

    rowToUser = (row) => {
        const found = this.state.users.find(element => element.username === row['name']);
        return found;
    }

    handleSelect = (row) => {
        const user = this.rowToUser(row);
        if (this.state.selectedUser === user) {
            this.setState({
                selectedUser: null,
                selectedRow: null,
                posts: []
            });
        } else {
            this.setState({
                selectedUser: user,
                selectedRow: row
            });
            getPostsByUser(user).then(posts => {
                this.setState({
                    posts
                });
            });
        }
    }

    handleBan = (reason) => {
        const user = this.state.selectedUser;
        const originalUser = user;
        user.isBanned = !user.isBanned;
        if (!user.isBanned)
            user.banReason = '';
        else {
            user.banReason = reason;
        }
        updateUserStatus(originalUser, user).then(user => {
            const users = this.state.users.slice();
            const i = users.map(user => user._id).indexOf(user._id);
            users[i] = user;
            this.setState({users, selectedUser: user, dialogOpen: false});
        })
        .catch(error => {
            console.log(error)
            alert("Failed to change user's ban status");
        });
    }

    handleOpenDialog = () => {
        this.setState({dialogOpen: true});
    }

    handleCloseDialog = () => {
        this.setState({dialogOpen: false});
    }

    handleOpenSnackBar = async (originalUser, id, reportType, reportContent, i) => {
        // If report is waiting to be removed, remove first
        if (this.state.oldReport) {
            await this.handleCloseSnackBar(originalUser);
        }
        this.setState({oldReport: {id, type: reportType, content: reportContent, index: i}});
    }

    handleCloseSnackBar = (originalUser) => {
        // If report is waiting to be removed, then remove
        if (this.state.oldReport) {
            unreportPost(this.state.oldReport.content);
            this.setState({oldReport: null});
        }
        if (originalUser) {
            updateUserStatus(originalUser, this.state.selectedUser);
        }
    }

    handleDeleteReport = async (report) => {
        const user = this.state.selectedUser;
        const originalUser = JSON.parse(JSON.stringify(user));
        let type = '';
        let i = user.reportedMessages.indexOf(report.messageId);
        if (i >= 0) {
            i = user.reportedMessages.indexOf(report.messageId);
            user.reportedMessages.splice(i , 1);
            type = 'Message';
            this.handleOpenSnackBar(report._id, 'Message', report, i);
        } else {
            const posts = this.state.posts.slice();
            i = posts.map(p => p._id).indexOf(report._id);
            posts[i].isReported = false;
            this.setState({posts});
            this.handleOpenSnackBar(originalUser, report._id, 'Post', report, i);
            type = 'Post';
        }
        if (this.getReportedPosts(this.state.posts).length + user.reportedMessages.length <= 0) {
            user.isReported = false;
        }
        const users = this.state.users.slice();
        i = users.map(user => user._id).indexOf(user._id);
        users[i] = user;
        this.setState({users, selectedUser: user});
        setTimeout(() => {
            this.handleCloseSnackBar(originalUser);
        }, 5000);
    }

    handleUndoDelete = async () => {
        const report = this.state.oldReport;
        const user = this.state.selectedUser;
        const originalUser = JSON.parse(JSON.stringify(user));
        if (report.type === 'Message') {
            user.reportedMessages.splice(report.index, 0, report.id);
        } else {
            const posts = this.state.posts.slice();
            report.content.date = new Date(report.content.date);
            posts[report.index].isReported = true;
            this.setState({posts});
        }
        user.isReported = true;
        const users = this.state.users.slice();
        const i = users.map(user => user._id).indexOf(user._id);
        users[i] = user;
        this.setState({
            users, selectedUser: user, oldReport: null
        });
    }

    onLogout = () => {
        this.props.history.push("/");
        this.props.handleLogout();
    }

    render() {
        const {messages} = this.props;
        const {users, posts, selectedUser, selectedRow, dialogOpen, oldReport} = this.state;
        return (  
            <div className="adminHome">
                <Card className="adminHome__table">
                    <h1>Username</h1>
                    <div className="adminHome__scroll">
                        <Table columns={columns}
                            rows={this.usersToRows(users)}
                            handleSelect={this.handleSelect}
                            compareFunction={reportedFirstComparator}
                            selectedRow={selectedRow}
                        />
                    </div>
                </Card>
                <div className="adminHome__data">
                    <Card className="adminHome__user-detail">
                        <h1>User Details</h1>
                        {selectedUser && 
                            <div className="adminHome__scroll">
                                <img
                                    className="adminHome__icon"
                                    src={`https://ui-avatars.com/api/?name=${selectedUser.firstName}+${selectedUser.lastName}&format=svg`}
                                    alt="User Icon">
                                </img>
                                <div className="adminHome__user-detail-text">
                                    <Label primary={"Username"} secondary={selectedUser.username}/>
                                    <Label primary={"Status"} secondary={generateChip(selectedUser)}/>
                                    <Label primary={"First Name"} secondary={selectedUser.firstName}/>
                                    <Label primary={"Last Name"} secondary={selectedUser.lastName}/>
                                    <Label primary={"Location"} secondary={selectedUser.location}/>
                                    <Label primary={"Biography"} secondary={selectedUser.bio} blockText/>
                                    <Label primary={"Posts"} secondary={posts.length}/>
                                    <Label primary={"Messages Sent"} secondary={selectedUser.messagesSent.length}/>
                                    <Label primary={"Messages Recieved"} secondary={selectedUser.messagesRecieved.length}/>
                                </div>
                            </div>
                        }
                        {!selectedUser &&
                            <label className="adminHome__center">No User Selected</label>
                        }
                    </Card>
                    <Card className="adminHome__reported-panel">
                        <h1>Report Details</h1>
                        {selectedUser && selectedUser.isReported &&
                            <div className="adminHome__scroll">
                                {selectedUser.reportedMessages.map((reportId) => {
                                    return (
                                        <Report type="Message" content={messages[reportId]} handleDeleteReport={this.handleDeleteReport}/>
                                    );
                                })}
                                {this.getReportedPosts(posts).map((report) => {
                                    return (
                                        <Report key={report._id} type="Post" content={report} handleDeleteReport={this.handleDeleteReport}/>
                                    );
                                })}
                            </div>
                        }
                        {selectedUser && !selectedUser.isReported &&
                            <label className="adminHome__center">{selectedUser.username} has not been reported</label>
                        }
                        {selectedUser && !selectedUser.isBanned &&
                            <Button className="adminHome__ban-button"
                                    startIcon={<BanIcon/>}
                                    onClick={this.handleOpenDialog}>
                                Ban {selectedUser.username}
                            </Button>
                        }
                        {selectedUser && selectedUser.isBanned &&
                            <Button className="adminHome__unban-button"
                                    startIcon={<BanIcon/>}
                                    onClick={this.handleOpenDialog}>
                                UnBan {selectedUser.username}
                            </Button>
                        }
                        {!selectedUser &&
                            <div>
                                <label className="adminHome__center">No User Selected</label>
                                <Button className="adminHome__unban-button"
                                        startIcon={<BanIcon/>}
                                        disabled>
                                    Ban
                                </Button>
                            </div>
                        }
                    </Card>
                </div>
                <Card className="adminHome__list">
                    <h1>User's Post History</h1>
                    {selectedUser && posts.length > 0 && 
                        <div className="adminHome__scroll">
                            {posts.map((post) => {
                                return (
                                    <Post key={post._id} post={post}></Post>
                                );
                            })}
                        </div>
                    }
                    {selectedUser && posts.length <= 0 && 
                        <label className="adminHome__center">{`${selectedUser.username} has no posts`}</label>
                    }
                    {!selectedUser &&
                        <label className="adminHome__center">No User Selected</label>
                    }
                </Card>
                <Button className="adminHome__logout-button" startIcon={<LogoutIcon/>} onClick={this.onLogout}>Logout</Button>
                {oldReport && <UndoSnackBar handleClose={() => this.handleCloseSnackBar()} handleUndo={this.handleUndoDelete}/>}
                {dialogOpen && <BanDialog handleBan={this.handleBan} handleClose={this.handleCloseDialog} ban={!selectedUser.isBanned}/>}
            </div>
        );
    }
}

export default withRouter(AdminHome);