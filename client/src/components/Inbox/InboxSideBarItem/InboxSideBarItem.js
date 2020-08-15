import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import './styles.css';

class InboxSideBarItem extends Component {
    state = {}
    render() {
        const { username, name, activeUser, firstName, lastName} = this.props
        let classMessageName = "inboxSideBarItemContainer"
        if (username === activeUser) {
            classMessageName += "Selected"
        }
        return (
            <Card className='inboxSideBarItem'>
                <div className={classMessageName} onClick={() => this.props.handleChangeSelectedUser(username)}>
                {firstName != null && lastName != null &&
                    <img src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&format=svg`} alt={name} className='inboxSideBarItemImage' />
                }
                    <div className='inboxSideBarItemName'>
                        <p>{name}</p>
                    </div>
                </div>
            </Card>
        )
    }
}

export default InboxSideBarItem
