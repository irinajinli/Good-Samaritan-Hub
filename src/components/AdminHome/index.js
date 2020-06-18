import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import './styles.css';
import Icon from './../../userIcon.png';
import Table from './table.js';
import { render } from '@testing-library/react';

const columns = [
    { id: 'name', label: 'Username', showHeader: true},
    { id: 'status', label: 'Status', showHeader: false}
];

function generateChip(user) {
    return user.isBanned ?
        <div className="adminHome__chip-banned">Banned</div> :
        user.isReported ?
            <div className="adminHome__chip-reported">Reported</div> :
            <div className="adminHome__chip-active">Active</div>;
}

function reportedFirstComparator(a, b) {
    if ((a.status.props.children === "Reported") === (b.status.props.children === "Reported")) {
        return a.name.localeCompare(b.name);
    }
    return a.status.props.children === "Reported" ? -1 : 1;
}

class AdminHome extends Component {
    state = {
        selectedUser: null
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

    render() {
        const {users} = this.props;
        const {selectedUser} = this.state;
        return (  
            <div className="adminHome">
                <Card className="adminHome__table">
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
                                <img className="adminHome__icon" src={Icon}></img>
                                <div className="ok">
                                <Label primary={"Username"} secondary={selectedUser.username}/>
                                <Label primary={"Status"} secondary={generateChip(selectedUser)}/>
                                <Label primary={"First Name"} secondary={selectedUser.firstName}/>
                                <Label primary={"Last Name"} secondary={selectedUser.lastName}/>
                                <Label primary={"Biography"} secondary={<p className="adminHome__text">{selectedUser.bio}</p>}/>
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
                    </Card>
                </div>
            </div>
        );
    }
}

class Label extends Component {
    render() {
        const {primary, secondary} = this.props;
        return (
            <label className="adminHome__text">
                <label className="adminHome__label">{primary}:</label>
                    {secondary}
            </label>
        );
    }
}

export default AdminHome;