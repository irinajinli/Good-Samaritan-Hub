import React, { Component } from 'react'
import './styles.css';

class InboxSideBarItem extends Component {
    state = {}
    render() {
        const { username, name, image } = this.props
        return (
            <div class='inboxSideBarItemContainer' onClick={() => this.props.handleChangeSelectedUser(username)}>
                <img src={image} className='inboxSideBarItemImage' />
                <div class='inboxSideBarItemName'>
                    <p>{name}</p>
                </div>
            </div>
        )
    }
}

export default InboxSideBarItem
