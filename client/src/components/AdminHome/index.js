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

import { getPostsByUser, getReportedPosts } from '../../actions/search';
import { updateUser } from '../../actions/user';

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
        selectedUser: null,
        selectedRow: null,
        dialogOpen: false,
        oldReport: null
    }
    
    usersToRows = (users) => {
        if (!Array.isArray(users)) {
            return;
        }
        const row = [];
        for (let i = 0; i < users.length; i++) {
            row.push({
                name: users[i].username,
                status: generateChip(users[i])
            });
        }
        return row;
    }

    rowToUser = (row) => {
        const found = this.props.users.find(element => element.username === row['name']);
        return found;
    }

    handleSelect = (row) => {
        const user = this.rowToUser(row);
        if (this.state.selectedUser === user) {
            this.setState({selectedUser: null});
            this.setState({selectedRow: null});
        } else {
            this.setState({selectedUser: user});
            this.setState({selectedRow: row});
        }
    }

    handleBan = (reason) => {
        const user = this.state.selectedUser;
        const originalUser = user;
        user.isBanned = !user.isBanned;
        if (!user.isBanned)
            user.banReason = '';
        else {
            user.banReason = reason;}
        for (let i = 0; i < this.props.users.length; i++) {
            if (user.username === this.props.users[i].username) {
                this.props.users[i] = user;
                break;
            }
        }
        // PATCH/PUT USER HERE
        updateUser(originalUser, user, this);
        this.setState({selectedUser: user, dialogOpen: false});
    }

    handleOpenDialog = () => {
        this.setState({dialogOpen: true});
    }

    handleCloseDialog = () => {
        this.setState({dialogOpen: false});
    }

    handleOpenSnackBar = (id, reportType, reportContent, i) => {
        this.setState({oldReport: {id, type: reportType, content: reportContent, index: i}});
    }

    handleCloseSnackBar = () => {
        this.setState({oldReport: null});
    }

    handleDeleteReport = (report) => {
        const user = this.state.selectedUser;
        const originalUser = user;
        let type = '';
        let i = user.reportedMessages.indexOf(report.messageId);
        if (i >= 0) {
            i = user.reportedMessages.indexOf(report.messageId);
            user.reportedMessages.splice(i , 1);
            type = 'Message';
        } else {
            i = user.reportedPosts.indexOf(report.id);
            user.reportedPosts.splice(i , 1);
            type = 'Post';
        }
        if (user.reportedPosts.length + user.reportedMessages.length <= 0) {
            user.isReported = false;
        }
        // PATCH/PUT USER HERE
        updateUser(originalUser, user, this);
        this.setState({selectedUser: user});
        this.handleOpenSnackBar(type === 'Post' ? report.id : report.messageId, type, report, i);
        setTimeout(() => this.handleCloseSnackBar(), 5000);
    }

    handleUndoDelete = () => {
        const report = this.state.oldReport;
        const user = this.state.selectedUser;
        const originalUser = user;
        if (report.type === 'Message') {
            user.reportedMessages.splice(report.index, 0, report.id);
        } else {
            user.reportedPosts.splice(report.index, 0, report.id);
        }
        user.isReported = true;
        // PATCH/PUT USER HERE
        updateUser(originalUser, user, this);
        this.setState({selectedUser: user, oldReport: null});
    }

    onLogout = () => {
        this.props.history.push("/");
        this.props.handleLogout();
    }

    render() {
        const {users, posts, messages} = this.props;
        const {selectedUser, selectedRow, dialogOpen, oldReport} = this.state;
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
                                <img className="adminHome__icon" src={Icon} alt="User Icon"></img>
                                <div className="adminHome__user-detail-text">
                                    <Label primary={"Username"} secondary={selectedUser.username}/>
                                    <Label primary={"Status"} secondary={generateChip(selectedUser)}/>
                                    <Label primary={"First Name"} secondary={selectedUser.firstName}/>
                                    <Label primary={"Last Name"} secondary={selectedUser.lastName}/>
                                    <Label primary={"Location"} secondary={selectedUser.location}/>
                                    <Label primary={"Biography"} secondary={selectedUser.bio} blockText/>
                                    <Label primary={"Posts"} secondary={selectedUser.posts.length}/>
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
                                {getReportedPosts(selectedUser, posts).map((report) => {
                                    return (
                                        <Report type="Post" content={report} handleDeleteReport={this.handleDeleteReport}/>
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
                    {selectedUser && selectedUser.posts.length > 0 && 
                        <div className="adminHome__scroll">
                            {getPostsByUser(selectedUser, posts).map((post) => {
                                return (
                                    <Post post={post}></Post>
                                );
                            })}
                        </div>
                    }
                    {selectedUser && selectedUser.posts.length <= 0 && 
                        <label className="adminHome__center">{`${selectedUser.username} has no posts`}</label>
                    }
                    {!selectedUser &&
                        <label className="adminHome__center">No User Selected</label>
                    }
                </Card>
                <Button className="adminHome__logout-button" startIcon={<LogoutIcon/>} onClick={this.onLogout}>Logout</Button>
                {oldReport && <UndoSnackBar handleClose={this.handleCloseSnackBar} handleUndo={this.handleUndoDelete}/>}
                {dialogOpen && <BanDialog handleBan={this.handleBan} handleClose={this.handleCloseDialog} ban={!selectedUser.isBanned}/>}
            </div>
        );
    }
}

export default withRouter(AdminHome);