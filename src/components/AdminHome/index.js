import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';

import './styles.css';
import Table from './table.js';
import { render } from '@testing-library/react';

const columns = [
    { id: 'name', label: 'Name'},
    { id: 'status', label: 'Status' }
];

function generateChip(user) {
    return user.isBanned ?
        <div className="adminHome__chip-banned">Banned</div> :
        user.isReported ?
            <div className="adminHome__chip-reported">Reported</div> :
            <div className="adminHome__chip-active">Active</div>;
}

function usersToRows(users) {
    if (!Array.isArray(users))
        return;
    const rows = [];
    for (let i = 0; i < users.length; i++) {
        rows.push({
            name: users[i].username,
            status: generateChip(users[i])
        });
    }
    return rows;
}

class AdminHome extends Component {
    state = { }
    
    render() {
        const {users} = this.props;
        return (  
            <div className="adminHome">
                <div className="adminHome__content">
                    <Card className="adminHome__table">
                        <div className="adminHome__scroll">
                            <Table columns={columns} rows={usersToRows(users)}></Table>
                        </div>
                    </Card>
                    <Card className="adminHome__data">
                        <h1>User Details</h1>
                        <Button id='adminHome__save-user-detail'
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon/>}
                        >
                            Save
                        </Button>
                        <Button id='adminHome__discard-user-detail' variant="outlined">Reset</Button>
                    </Card>
                    <Card className="adminHome__control">
                        <h1>Report Details</h1>
                    </Card>
                </div>
            </div>
        );
    }
}

export default AdminHome;