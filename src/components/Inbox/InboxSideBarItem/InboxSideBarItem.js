import React, { Component } from 'react'
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
            <div className={classMessageName} onClick={() => this.props.handleChangeSelectedUser(username)}>
                <img src={image} alt={name} className='inboxSideBarItemImage' />
                <div className='inboxSideBarItemName'>
                    <p>{name}</p>
                </div>
            </div>
        )
    }
}

export default InboxSideBarItem
