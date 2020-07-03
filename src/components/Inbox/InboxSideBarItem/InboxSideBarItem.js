import React, { Component } from 'react'
import Card from '@material-ui/core/card'
import './styles.css';

class InboxSideBarItem extends Component {
    state = {}
    render() {
        const { username, name, image, activeUser } = this.props
        let classMessageName = "inboxSideBarItemContainer"
        if (username === activeUser) {
            classMessageName += "Selected"
        }
        return (
            <Card>
                <div className={classMessageName} onClick={() => this.props.handleChangeSelectedUser(username)}>
                    <img src={image} alt={name} className='inboxSideBarItemImage' />
                    <div className='inboxSideBarItemName'>
                        <p>{name}</p>
                    </div>
                </div>
            </Card>
        )
    }
}

export default InboxSideBarItem
