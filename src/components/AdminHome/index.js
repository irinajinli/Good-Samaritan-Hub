import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import BanIcon from '@material-ui/icons/Gavel';

import './styles.css';
import Icon from './../../data/userIcon.png';
import Label from './label.js';
import Table from './table.js';
import Report from './report.js';
import BanDialog from './banDialog.js';
import { render } from '@testing-library/react';

const columns = [
    { id: 'name', label: 'Username', showHeader: false},
    { id: 'status', label: 'Status', showHeader: false}
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
        dialogOpen: false
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
        } else {
            this.setState({selectedUser: user});
        }
    }

    handleBan = (reason) => {
        const user = this.state.selectedUser;
        user.isBanned = !user.isBanned;
        if (!user.isBanned)
            user.banReason = '';
        else {
            console.log(reason)
            user.banReason = reason;}
        for (let i = 0; i < this.props.users.length; i++) {
            if (user.username === this.props.users[i].username)
                this.props.users[i] = user;
        }
        console.log(user)
        this.setState({selectedUser: user, dialogOpen: false});
    }

    handleOpenDialog = () => {
        this.setState({dialogOpen: true});
    }

    handleCloseDialog = () => {
        this.setState({dialogOpen: false});
    }

    render() {
        const {users} = this.props;
        const {selectedUser, dialogOpen} = this.state;
        return (  
            <div className="adminHome">
                <Card className="adminHome__table">
                    <h1>Username</h1>
                    <div className="adminHome__scroll">
                        <Table columns={columns}
                            rows={this.usersToRows(users)}
                            handleSelect={this.handleSelect}
                            compareFunction={reportedFirstComparator}
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
                                {selectedUser.reportedMessages.map((report) => {
                                    return (
                                        <Report type="Message" content={report}/>
                                    );
                                })}
                                {selectedUser.reportedPosts.map((report) => {
                                    return (
                                        <Report type="Post" content={report}/>
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
                {dialogOpen && <BanDialog handleBan={this.handleBan} handleClose={this.handleCloseDialog} ban={!selectedUser.isBanned}/>}
            </div>
        );
    }
}

export default AdminHome;